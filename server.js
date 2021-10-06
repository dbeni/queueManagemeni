var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const GLOBAL_STATE_STOPPED = 0;
const GLOBAL_STATE_STARTED = 1;

//for the moment, number of "tor" buttons are hard coded here
const TOR_COUNT = 4;

//rooms count limit
const ROOMS_COUNT_LIMIT = 4;

//Out action types
const OUT_ACTION_TYPE_RELEASE = "R";
const OUT_ACTION_TYPE_SKIP = "S";

const {RoomsList} = require('./objects/roomsList');
const {LogItem} = require('./objects/LogItem');
const {Room} = require('./objects/room');

let globalState = GLOBAL_STATE_STOPPED;
let queue = [];
let rooms = new RoomsList();
let logsList = [];
let nextQueueNumber = 0;
let lastReleasedQueueNumber = 0;

function isQueueManagementStarted () {
    return globalState === GLOBAL_STATE_STARTED;
}

//get session status
app.get('/sessionState', function (req, res) {
    return res.send({ 
        error: false, 
        data: {
            "globalState" : globalState,
            "nextQueueNumber" : nextQueueNumber,
            "torCount" : TOR_COUNT,
            "roomsCount" : rooms.roomsList.length
        }, 
        message: 'Application global state.' 
    });
});

//init the whole global objects
app.post('/start', function (req, res) {
    if (isQueueManagementStarted()) {
        return res.status(500).send({ error: true, message: 'The application is already started.' });
    }

    //for the moment
    let roomsCount = req.body.roomsCount;

    if (isNaN(roomsCount)) {
        return res.status(500).send({ error: true, message: 'Rooms count is not a number.'+roomsCount});
    }
    else {
        if (roomsCount > ROOMS_COUNT_LIMIT) {
            return res.status(500).send({ error: true, message: 'Rooms count is limited to '+ROOMS_COUNT_LIMIT+'.' });
        }
    }
    
    //start the app
    globalState = GLOBAL_STATE_STARTED;
    logsList.push(new LogItem("Init new queue management session"));

    //create default room
    for (let i = 1; i <= roomsCount; i++) {
        rooms.add(new Room(i, "Room "+i, null));
        logsList.push(new LogItem("Created Room "+i));
    }
    
    nextQueueNumber = 1;

    result = {
        "globalState" : globalState,
        "nextQueueNumber" : nextQueueNumber,
        "torCount" : TOR_COUNT,
        "roomsCount" : roomsCount
    };

    return res.send({ 
        error: false, 
        data: result, 
        message: 'Init OK.' 
    });
});

app.post('/stop', function (req, res) {
    if (!isQueueManagementStarted()) {
        return res.status(500).send({ error: true, message: 'The application is not started.' });
    }

    globalState = GLOBAL_STATE_STOPPED;
    queue = [];
    rooms = new RoomsList();
    logsList = [];
    nextQueueNumber = 0;
    lastReleasedQueueNumber = 0;

    return res.send({ 
        error: false, 
        data: {"globalState" : globalState}, 
        message: 'Stopped OK.' 
    });
});

//add a new queue number to the queue
app.post('/takeNumber', function (req, res) {
    if (!isQueueManagementStarted()) {
        return res.status(500).send({ error: true, message: 'The application is not started.' });
    }

    let torId = req.body.torId;

    queue.push(nextQueueNumber);
    
    let message = "Tor " + (torId+1) + " took the number " + nextQueueNumber;
    logsList.push(new LogItem(message));

    nextQueueNumber++;

    return res.send({ 
        error: false, 
        data: queue, 
        message: message 
    });
});

//Get all rooms list
app.get('/rooms', function (req, res) {
    if (!isQueueManagementStarted()) {
        return res.status(500).send({ error: true, message: 'The application is not started.' });
    }
    
    return res.send({ 
        error: false, 
        data: {
            rooms, 
            queue, 
            lastReleasedQueueNumber
        }, 
        message: 'Rooms list.' 
    });
});

//accept someone into a room
app.post('/rooms/:roomId/accept', function (req, res) {
    if (!isQueueManagementStarted()) {
        return res.status(500).send({ error: true, message: 'The application is not started.' });
    }

    let roomId = parseInt(req.params.roomId);
    //check if room exists
    let room = rooms.getByRoomId(roomId);
    if (false === room) {
        let errMessage = "Room " + roomId + " does not exist";
        logsList.push(new LogItem(errMessage));

        return res.status(500).send({ error: true, message: errMessage });
    }

    //can't take someone in is the room is still occupied
    if (null !== room.currentQueueNumber) {
        let errMessage = "Room " + roomId + " can't accept new number when occupied";
            logsList.push(new LogItem(errMessage));
    
            return res.status(500).send({ error: true, message: errMessage });
    }

    //check if there are still entries in queue
    if (0 === queue.length) {
        let errMessage = "Queue is empty";
        logsList.push(new LogItem(errMessage));

        return res.status(500).send({ error: true, message: errMessage });
    }

    let numberTaken = queue.shift();
    
    let message = "Room " + roomId + " took in the number " + numberTaken;
    logsList.push(new LogItem(message));

    if (false === rooms.setNumberByRoomId(numberTaken, roomId)) {
        let errMessage = "Room " + roomId + " could not take in the number " + numberTaken;
        logsList.push(new LogItem(errMessage));

        return res.status(500).send({ error: true, message: errMessage });
    }

    return res.send({ 
        error: false, 
        data: {room , queue}, 
        message: message });
});

//Out block, release or skip number
app.post('/rooms/:roomId/out', function (req, res) {
    if (!isQueueManagementStarted()) {
        return res.status(500).send({ error: true, message: 'The application is not started.' });
    }

    let actionType = req.body.actionType;
    if (actionType !== OUT_ACTION_TYPE_RELEASE && actionType !== OUT_ACTION_TYPE_SKIP) {
        let errMessage = "Invalid out action type: " + actionType;
        logsList.push(new LogItem(errMessage));

        return res.status(500).send({ error: true, message: errMessage });
    }

    let roomId = parseInt(req.params.roomId);
    //check if room exists
    let room = rooms.getByRoomId(roomId);
    if (false === room) {
        let errMessage = "Room " + roomId + " does not exist";
        logsList.push(new LogItem(errMessage));

        return res.status(500).send({ error: true, message: errMessage });
    }

    if (OUT_ACTION_TYPE_SKIP == actionType) {
        //cannot skip if someone is already in
        if (null !== room.currentQueueNumber) {
            let errMessage = "Room " + roomId + " can't skip number when occupied";
            logsList.push(new LogItem(errMessage));
    
            return res.status(500).send({ error: true, message: errMessage });
        }
    
        let numberSkipped = queue.shift();
    
        let message = "Room " + roomId + " skipped the number " + numberSkipped;
        logsList.push(new LogItem(message));

        return res.send({ 
            error: false, 
            data: queue, 
            message: message 
        });
    }
    else {
        let releasedNumber = room.currentQueueNumber;
        //is there something to release?
        if (null === releasedNumber) {
            let errMessage = "Room " + roomId + " has no current number ";
            logsList.push(new LogItem(errMessage));
    
            return res.status(500).send({ error: true, message: errMessage });
        }
        
        if (false === rooms.setNumberByRoomId(null, roomId)) {
            let errMessage = "Room " + roomId + " could not release the number " + releasedNumber;
            logsList.push(new LogItem(errMessage));
    
            return res.status(500).send({ error: true, message: errMessage });
        }
    
        lastReleasedQueueNumber = releasedNumber;
    
        let message = "Room " + roomId + " released the number " + releasedNumber;
        logsList.push(new LogItem(message));
    
        return res.send({ 
            error: false, 
            data: {room, queue, releasedNumber} , 
            message: message 
        });
    }
});

//Get logs list
app.get('/logs', function (req, res) {
    if (!isQueueManagementStarted()) {
        return res.status(500).send({ error: true, message: 'The application is not started.' });
    }
    
    return res.send({ 
        error: false, 
        data: {logsList} , 
        message: 'Logs list.' 
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;
