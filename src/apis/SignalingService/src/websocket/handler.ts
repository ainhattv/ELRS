import { users, rooms } from '../models/mock.room';
import { Room } from '../models/room';
var _ = require('lodash');

const general_room = "general";

export const onConnect = async (socket: any) => {
    let userId = socket.handshake.query.userId;
    await sendTo(socket, `Hi ${userId}`);

    await joinRooms(socket);
}

export const onDisconnect = async (socket: any) => {

}

export const onMessage = async (socket: any) => {

}

export const onJoinRoom = async (socket: any) => {

}

/**
 * Server send back to client
 * @param socket 
 * @param message 
 */
async function sendTo(socket: any, message: any) {
    socket.send(JSON.stringify(message));
}

async function joinRooms(socket: any) {
    const userId = socket.handshake.query.userId;

    var user_rooms: Array<Room> = _.filter(rooms, async (room: Room) => {
        return room.users.map(x => x.userId == userId).length > 0;
    })

    user_rooms.push(new Room(general_room, general_room, general_room));

    user_rooms.forEach(async (room: Room) => {
        socket.join(room.roomId);

        // Say Hi
        socket.to(room.roomId).emit('message', `Hi I am ${userId}`);
    });
}