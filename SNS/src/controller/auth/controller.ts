import { Request, Response } from "express";
import * as userQuery from "./query";
import * as token from "./mkToken";
import HTTPError from "../../exception/exception";

interface type { (req: Request, res: Response): void; }

const mktoken = token.mktoken;
const mkRefreshtoken = token.mkRefreshtoken;

const signInUser: type = async (req, res) => {
    const { email, password } = req.body;
    const user: object = await userQuery.findUserByEmail(email);
    const firstLogin: boolean = !Boolean(user['token']);

    if (!user) throw new HTTPError(404, 'Incorrect email or password');

    if (await userQuery.passwordCompare(password, user['password'])) {
        const token: string = await mktoken(req, user);
        const refreshtoken: string = await mkRefreshtoken(req, user);
        await userQuery.tokenUpdate(user['email'], token, refreshtoken);
        res.status(200).json({ message: 'signIn success', token, refreshtoken, firstLogin }).end();
    } else throw new HTTPError(404, 'Incorrect email or password');
}

const tokenValidation: type = async (req, res) => {
    res.status(200).json({ message: 'token be valid' });
}

const me: type = async (req, res) => {
    const accesstoken: any = req.headers['x-access-token'];

    const user: object = await userQuery.findUserByToken(accesstoken);
    if (!user) throw new HTTPError(404, 'not found user');
    res.status(200).json({ message: 'user return', user });
}

const refresh: type = async (req, res) => {
    const accesstoken: any = req.headers['x-access-token'];
    const refreshtoken: any = req.headers['x-refresh-token'];
    const user: object = await userQuery.findUserByRefreshToken(refreshtoken);

    if (user['token'] == accesstoken) {
        const token: string = await mktoken(req, user);
        await userQuery.tokenUpdate(user['email'], token, refreshtoken);
        res.status(200).json({ message: 'token refresh', token, refreshtoken }).end();
    } else throw new HTTPError(404, 'Another token');
}

const passport = async (req, res) => {
    const user: object = await userQuery.findUserByEmail(req.user.emails[0].value);
    const firstLogin: boolean = !Boolean(user['token']);
    const token: string = await mktoken(req, user);
    const refreshtoken: string = await mkRefreshtoken(req, user);
    console.log(firstLogin);

    await userQuery.tokenUpdate(user['email'], token, refreshtoken);
    const u: object = await userQuery.findUserByEmail(req.user.emails[0].value);
    console.log(u);

    res.status(200).json({ message: 'signIn success', token, refreshtoken, firstLogin });
}

export {
    me,
    tokenValidation,
    signInUser,
    refresh,
    passport
}

