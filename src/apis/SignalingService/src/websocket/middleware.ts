import { authenticateToken } from '../middleware/authHandlers';
import { exception } from 'console';

export const registerMiddlewares = async (io: any) => {
    // registers authication/authorization middle ware
    io.use(async (socket: any, next: any) => {
        let token = socket.handshake.query.token;

        let result = authenticateToken(token);

        if (!result) {
            throw exception("Authentication error!");
        } {
            console.log("Handled auth!")
            next();
        }

    });
}