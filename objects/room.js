class Room {
    constructor (roomId, roomName, currentQueueNumber) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.currentQueueNumber = currentQueueNumber;
        this.lastQueueNumber = null;
    }
}
exports.Room = Room;


