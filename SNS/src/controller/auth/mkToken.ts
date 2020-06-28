import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const mktoken = async (req: Request, user): Promise<string> => {
    const secret = req.app.get('jwt-secret');
    const token: any = await ((resolve, reject) => {
        jwt.sign({
            id: user.id,
            userName: user.userName,
            nickName: user.nickName,
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

const mkRefreshtoken = async (req: Request, user): Promise<string> => {
    const secret = req.app.get('jwt-secret');
    const refreshtoken: any = await ((resolve, reject) => {
        jwt.sign({
            nickName: user.nickName
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