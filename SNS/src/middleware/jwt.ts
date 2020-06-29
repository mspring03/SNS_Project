import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const accessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.json({ message: 'token is required!' });
    else {
        jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded) {
            if(err) 
                return res.json({ message: err });
            else{
                req['decoded'] = decoded;
                next();
            }
        });
    }
}

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-refresh-token'];

    if (!token) return res.json({ message: 'token is required!' });
    else {
        jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded) {
            if(err) 
                return res.json({ message: err });
            else{
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