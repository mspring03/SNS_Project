import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface type { (req: Request, user: object): Promise<string> }

const mktoken: type = async (req, user) => {
    const secret = req.app.get('jwt-secret');
    const token: any = await ((resolve, reject) => {
        jwt.sign({
            id: user['id'],
            userName: user['userName'],
            nickName: user['nickName'],
        },
        secret,
        {
        expiresIn: 7200,
        }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });

    return token;
}

const mkRefreshtoken: type = async (req, user) => {
    const secret = req.app.get('jwt-secret');
    const refreshtoken: any = await ((resolve, reject) => {
        jwt.sign({
            nickName: user['nickName']
        },
        secret,
        {
        expiresIn: 60*60*24*7,
        }, (err, refreshtoken) => {
            if (err) reject(err);
            resolve(refreshtoken);
        });
    });

    return refreshtoken;
}

export {
    mktoken,
    mkRefreshtoken
}