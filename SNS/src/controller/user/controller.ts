import * as query from "./query";
import { Request, Response } from "express";
import { mailSender } from "../../middleware/nodemailer";

interface type { (req: Request, res: Response): Promise<void> }
interface userType { email: string, password: string, nickName: string, inputCode: string }

const findAllUser: type = async (req, res) => {
    const allUser: object = await query.findAllUser();
    res.status(200).json({ message: 'findAllUser', allUser });
}

const showUser: type = async (req, res) => {
    const user: object = await query.findOneUserById(req.params.email);
    res.status(200).json({ message: 'findOneUser', email: user['email'], nickName: user['email'] });
}

const emailSender: type = async (req, res) => {
    const { email } = req.body.email;
    const code = `${Math.floor(Math.random() * 100000)}`;
    await query.putCode(code);

    if (await query.findOneUserById(email))
        throw new Error('email already exist');

    const emailParam = {
        toEmail: email,
        subject: 'SNS Cheak Email',
        text: `${code}`
    };

    mailSender.sendGmail(emailParam);
    res.status(200).json({ message: 'Send Email Verification Code' });
}

const signUp: type = async (req, res) => {
    const { email, password, nickName, inputCode }: userType = req.body;
    const hashingPW = await query.passwordHashing(password);
    const code: string = await query.getCode();

    if (code === inputCode) {
        await query.userCreate(email, hashingPW, nickName);
        res.status(200).json({ message: 'signUp success' }).end();
    } else throw Error('incorrect code');
}

const userUpdate: type = async (req, res) => {
    const { password, nickName }: userType = req.body;
    const hashingPW = await query.passwordHashing(password);

    if (password) await query.passwordUpdate(hashingPW, req.params.email);
    if (nickName) await query.nickNameUpdate(nickName, req.params.email);

    res.status(200).json({ message: 'user update' }).end();
}

const userDelete: type = async (req, res) => {
    const password: string = req.body.password;
    const user: object = await query.findOneUserById(req.params.email);

    if (await query.passwordCompare(password, user['password']))
        await query.deleteUser(req.params.email);
    else throw new Error('wrong password');

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
    emailSender,
    signUp,
    userUpdate,
    userDelete,
    checkPermission
}