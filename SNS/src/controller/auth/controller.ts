import { Request, Response } from "express";
import * as userQuery from "./query";
import * as token from "./mkToken";

interface type { (req: Request, res: Response): void; }

const mktoken = token.mktoken;
const mkRefreshtoken = token.mkRefreshtoken;

const signInUser: type = async (req, res) => {
    const { email, password } = req.body;
    const user: object = await userQuery.findUserByEmail(email);
    console.log(user);

    if (!user) throw new Error('Incorrect email or password');

    if (user['password'] === password) {
        const token: string = await mktoken(req, user);
        const refreshtoken: string = await mkRefreshtoken(req, user);
        await userQuery.tokenUpdate(user['email'], token, refreshtoken);
        res.status(200).json({ message: 'signIn success', token, refreshtoken }).end();
    } else throw new Error('Incorrect email or password');
}

const me: type = async (req, res) => {
    const eccesstoken: any = req.headers['x-access-token'];

    const user: object = await userQuery.findUserByToken(eccesstoken);
    if (!user) throw new Error('not found user');
    res.status(200).json({ message: 'user return', user });
}

const refresh: type = async (req, res) => {
    const eccesstoken: any = req.headers['x-access-token'];
    const refreshtoken: any = req.headers['x-refresh-token'];
    const user: object = await userQuery.findUserByRefreshToken(refreshtoken);

    if (user['token'] == eccesstoken) {
        const token: string = await mktoken(req, user);
        await userQuery.tokenUpdate(user['email'], token, refreshtoken);
        res.status(200).json({ message: 'token refresh', token, refreshtoken }).end();
    } else throw new Error('Another token');
}

const passport = async (req, res) => {
    const user: object = await userQuery.findUserByEmail(req.user.emails[0].value);
    const token: string = await mktoken(req, user);
    const refreshtoken: string = await mkRefreshtoken(req, user);

    await userQuery.tokenUpdate(user['email'], token, refreshtoken);
    const u: object = await userQuery.findUserByEmail(req.user.emails[0].value);
    console.log(u);

    res.status(200).json({ message: 'signIn success', token, refreshtoken });
}

export {
    me,
    signInUser,
    refresh,
    passport
}

