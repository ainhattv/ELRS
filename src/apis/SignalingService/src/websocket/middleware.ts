export const registerMiddlewares = async (io: any) => {
    // registers authication/authorization middle ware
    io.use(async (socket: any, next: any) => {
        let token = socket.handshake.query.token;
        console.log("Middle ware has work with token: ", token);

        next();
    });
}