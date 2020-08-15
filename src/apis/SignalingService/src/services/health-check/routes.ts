import { Request, Response } from "express";

export default [
    {
        path: "/health-check",
        method: "get",
        handler: [
            async ({ query }: Request, res: Response) => {
                res.status(200).send("I'm Ok!");
            }
        ]
    }
];