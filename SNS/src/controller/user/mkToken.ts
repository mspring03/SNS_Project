import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const mktoken = async (res: Response, req: Request, user) => {
    const secret = req.app.get('jwt-secret');
    const token = new Promise((resolve, reject) => {
        jwt.sign({
            id: user.userId,
            nick: user.nick,
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


module.exports = {
    mktoken
}