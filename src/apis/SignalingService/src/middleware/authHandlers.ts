import { Request, Response, NextFunction, Router } from "express";

const jwt = require("jsonwebtoken");

const authencationHandler = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        let result = authenticateToken(token);

        if (result == null) return res.sendStatus(401);
    });
};

export function authenticateToken(token: string): any {

    let result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    return result;
}

export default [authencationHandler];