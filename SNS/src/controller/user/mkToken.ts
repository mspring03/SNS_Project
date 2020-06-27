import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const mktoken = async (req: Request, res: Response, user): Promise<string> => {
    const secret = req.app.get('jwt-secret');
    const token: any = new Promise((resolve, reject) => {
        jwt.sign({
            id: user.userName,
            nick: user.nickName,
        },
        secret,
        {
        expiresIn: '12h',
        }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
    return token;
}