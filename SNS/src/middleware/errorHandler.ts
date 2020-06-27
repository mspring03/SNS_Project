import { Request, Response } from "express";

type handlerFunc = (req: Request, res: Response) => void ;

export class tryCatchMiddleware {

    static NotFound = (myFunc: handlerFunc):handlerFunc => {
        return async (req: Request, res: Response) => {
            try {
                await myFunc(req, res);
            } catch (e) {
                res.status(404).json({ message: e.message }).end();
            }
        }
    }

    static ServerError = (myFunc: handlerFunc):handlerFunc => {
        return async (req: Request, res: Response) => {
            try {
                await myFunc(req, res);
            } catch (e) {
                res.status(500).json({ message: e.message }).end();
            }
        }
    }
}