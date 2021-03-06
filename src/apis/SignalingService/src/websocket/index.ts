import { registerMiddlewares } from './middleware';
import { SOCKET_ACTIONS } from './action';
import * as Hanlders from './handler';

var socketIO = require('socket.io');


export async function register(server: any) {

    var wss = new socketIO(server);

    await registerMiddlewares(wss);

    wss.on(SOCKET_ACTIONS.ON_CONNECT, async (socket: any) => {
        console.debug(`New connection: ${socket.id}`);
        await Hanlders.onConnect(socket);

        socket.on(SOCKET_ACTIONS.ON_MESSAGE, async (msg: any) => {
            Hanlders.onMessage(socket, msg);
        });

        socket.on(SOCKET_ACTIONS.ON_DISCONNECT, async () => {
            console.log('user disconnected');
        });
    });
}