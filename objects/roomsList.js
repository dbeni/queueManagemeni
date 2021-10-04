class RoomsList {
    constructor () {
        this.roomsList = [];
    }

    add (room) {
        this.roomsList.push(room);
    }

    getByRoomId (roomId) {
        for (let i in this.roomsList) {
            if (this.roomsList[i].roomId === roomId) {
                return this.roomsList[i];
            }
        }
        return false;
    }

    setNumberByRoomId(number, roomId) {
        for (let i in this.roomsList) {
            if (this.roomsList[i].roomId === roomId) {
                //release
                if (null === number) {
                    this.roomsList[i].lastQueueNumber = this.roomsList[i].currentQueueNumber;
                }

                //affectation
                this.roomsList[i].currentQueueNumber = number;

                return true;
            }
        }
        return false;
    }
}
exports.RoomsList = RoomsList;