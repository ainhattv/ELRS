import { users, rooms } from '../models/mock.room';
import { Room } from '../models/room';
import { SOCKET_ACTIONS } from './action';
import { exception } from 'console';
import { json } from 'express';
import { hello_message } from './mock.message';
import { User } from '../models/user';

var _ = require('lodash');

const general_room = "general";

export const onConnect = async (socket: any) => {
    await joinRooms(socket);
}

export const onDisconnect = async (socket: any) => {

}

export const onMessage = async (socket: any, message: any) => {
    await sendToGroup(socket, message);
}

export const onJoinRoom = async (socket: any) => {

}

/**
 * Server send back to client
 * @param socket 
 * @param message 
 */
async function sendTo(socket: any, message: any) {
    socket.send(message);
}

async function sendToGroup(socket: any, message: any) {
    console.log(`send to room ${message.roomId}`)

    if (!socket || !message) {
        throw exception("Null type objects");
    }

    socket.to(message.roomId).emit(SOCKET_ACTIONS.ON_MESSAGE, JSON.stringify(message));
}

async function joinRooms(socket: any) {
    const userId = socket.handshake.query.userId;

    var user_rooms: Array<Room> = _.filter(rooms, function (room: Room) {
        return _.findIndex(room.users, function (user: User) { user.userId == userId }) > -1;
    })

    user_rooms.push(new Room(general_room, general_room, general_room));

    user_rooms.forEach(async (room: Room) => {
        socket.join(room.roomId);

        // Say Hi
        socket.to(room.roomId).emit(SOCKET_ACTIONS.ON_MESSAGE, hello_message);
    });
}