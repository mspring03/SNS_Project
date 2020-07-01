import { Request, Response } from "express";
import * as userQuery from "./query";
import * as token from "./mkToken";

interface type { (req: Request, res: Response): void; }

const mktoken = token.mktoken;
const mkRefreshtoken = token.mkRefreshtoken;

const signInUser: type = async (req, res) => {
    const { userName, password } = req.body;
    const user: object = await userQuery.findUserById(userName);

    if (!user) throw new Error('signIn faild'); 

    if(user['password'] === password) {
        const token: string = await mktoken(req, user);
        const refreshtoken: string = await mkRefreshtoken(req, user);
        await userQuery.tokenUpdate(user['userName'], token, refreshtoken);
        res.status(200).json({ message: 'signIn success', token, refreshtoken }).end();
    }
}

const me: type = async (req, res) => {
    const eccesstoken: string = req.header['x-eccess-token'];
    const user: object = await userQuery.findUserByToken(eccesstoken);
    res.status(200).json({ message: 'user return', user });
}

const refresh: type = async (req, res) => {
    const eccesstoken: string = req.header['x-eccess-token'];
    const refreshtoken: string  = req.header['x-refresh-token'];
    const user: object = await userQuery.findUserByRefreshToken(refreshtoken);

    if(user['token'] === eccesstoken) {
        const token: string = await mktoken(req, user);
        await userQuery.tokenUpdate(user['userName'], token, refreshtoken);
        res.status(200).json({ message: 'token refresh', token, refreshtoken }).end();
    }
} 

export {
    me,
    signInUser,
    refresh 
}

