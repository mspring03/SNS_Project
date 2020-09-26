import { Request, Response } from "express";

interface handlerFunc {
    (req: Request, res: Response): void;
}

export class tryCatchMiddleware {
    static Error = (myFunc: handlerFunc): handlerFunc => {
        return async (req: Request, res: Response) => {
            try {
                await myFunc(req, res);
            } catch (e) {
                res.status(e.statusCode || 500).json({ message: e.message });
            }
        }
    }
}