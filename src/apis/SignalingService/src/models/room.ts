import { User } from './user';

export class Room {
    public roomId: string;
    public roomName: string;
    public roomTitle: string;
    public users: Array<User>;

    public constructor(roomId: string,
        roomName: string,
        roomTitle: string,
        users: Array<User> = []) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomTitle = roomTitle;
        this.users = users;
    }
}