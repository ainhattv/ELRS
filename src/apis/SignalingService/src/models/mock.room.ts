import { Room } from './room';
import { User } from './user';

export const users: Array<User> = [
    new User('1', "User 1")
]

export const rooms: Array<Room> = [
    new Room('1', 'room 1', 'my room', users)
]