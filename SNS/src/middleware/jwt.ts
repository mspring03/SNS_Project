import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface type { (req: Request, res: Response, next: NextFunction): void }

const accessToken: type = (req, res, next) => {
    const token: any = req.headers['x-access-token'];

    if (!token) return res.json({ message: 'token is required!' });
    else {
        jwt.verify(token, req.app.get('jwt-secret'), function (err, decoded) {
            if (err)
                return res.status(404).json({ message: err });
            else {
                req['decoded'] = decoded;

                next();
            }
        });
    }
}

const refreshToken: type = (req, res, next) => {
    const token: any = req.headers['x-refresh-token'];

    if (!token) return res.json({ message: 'token is required!' });
    else {
        jwt.verify(token, req.app.get('jwt-secret'), function (err, decoded) {
            if (err)
                return res.status(404).json({ message: err });
            else {
                req['decoded'] = decoded;

                next();
            }
        });
    }
}

export {
    accessToken,
    refreshToken
}