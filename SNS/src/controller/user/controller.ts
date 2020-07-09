import * as query from "./query";
import { Request, Response } from "express";
import { mailSender } from "./nodemailer";

interface type { (req: Request, res: Response): Promise<void> }
interface userType { email: string, password: string, nickName: string }

const findAllUser: type = async (req, res) => {
    const allUser: object = await query.findAllUser();
    res.status(200).json({ message: 'findAllUser', allUser });
}

const showUser: type = async (req, res) => {
    const user: object = await query.findOneUserById(req.params.email);
    res.status(200).json({ message: 'findOneUser', email: user['email'], nickName: user['email'] });
}

const signUpUser: type = async (req, res) => {
    try {
        const email: string = req.body.email;

        const jbRandom = Math.random();
        const code = Math.floor(jbRandom * 100000);

        if (await query.findOneUserById(email))
            throw new Error('email already exist');

        const emailParam = {
            toEmail: email,
            subject: 'SNS Cheak Email',
            text: `${code}`
        };

        mailSender.sendGmail(emailParam);
        res.status(200).json({ message: 'Send Email Verification Code', code: `${code}` });
    } catch (e) {
        res.status(404).json({ message: e.message }).end();
    }
}

const checkEmail: type = async (req, res) => {
    try {
        const { email, password, nickName }: userType = req.body;

        await query.userCreate(email, password, nickName);
        res.status(200).json({ message: 'signUp success' }).end();
    } catch (e) {
        res.status(404).json({ message: e.message }).end();
    }
}

const userUpdate: type = async (req, res) => {
    const { password, nickName }: userType = req.body;

    if (password) await query.passwordUpdate(password, req.params.email);
    if (nickName) await query.nickNameUpdate(nickName, req.params.email);
    res.status(200).json({ message: 'user update' }).end();
}

const userDelete: type = async (req, res) => {
    const password: string = req.body.password;
    const user: object = await query.findOneUserById(req.params.email);

    if (user['password'] === password)
        await query.deleteUser(req.params.email);

    res.status(200).json({ message: 'Delete Successful' });
}

const checkPermission = async (req: Request, res: Response, next): Promise<any> => {
    try {
        const user: object = await query.findOneUserById(req.params.email);

        if (!req['decoded'] || user['id'] != req["decoded"].id)
            res.json({ message: 'You don\'t have permission' });
        else next();
    } catch (e) {
        res.status(404).json({ message: e.message }).end();
    }
}

export {
    findAllUser,
    showUser,
    signUpUser,
    checkEmail,
    userUpdate,
    userDelete,
    checkPermission
}