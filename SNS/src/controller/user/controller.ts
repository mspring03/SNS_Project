import * as query from "./query";
import { Request, Response } from "express";

interface userType {
    userName: string;
    password: string;
    nickName: string;
}

const findAllUser = async (req: Request, res: Response) => {
    const allUser: object = await query.findAllUser();
    res.status(200).json({ message: 'findAllUser', allUser });
}

const showUser = async (req: Request, res: Response) => {
    const user:object = await query.findOneUserById(req.params.userName);
    res.status(200).json({ message: 'findOneUser', userName: user['userName'], nickName: user['nickName'] });
}

const signUpUser = async (req: Request, res: Response) => {
    const { userName, password, nickName }: userType = req.body;
    
    if (await query.findOneUserById(userName)) 
        throw new Error('userName already exist');

    await query.userCreate(userName, password, nickName);
    res.status(200).json({ message: 'signUp success' }).end();
}

const userUpdate = async (req: Request, res: Response) => {
    const { userName, password, nickName }: userType = req.body;

    if (userName) await query.userNameUpdate(userName, req.params.userName);
    if (password) await query.passwordUpdate(password, req.params.userName);
    if (nickName) await query.nickNameUpdate(nickName, req.params.userName);
    res.status(200).json({ message: 'user update' }).end();
}

const userDelete = async (req: Request, res: Response) => {
    const password: string = req.body.password;
    const user: object = await query.findOneUserById(req.params.userName);
    
    if(user['password'] === password)
        await query.deleteUser(req.params.userName);

    res.status(200).json({ message: 'Delete Successful' });
}

const checkPermission = async (req: Request, res: Response, next): Promise<any> => {
    try {
        const user: object = await query.findOneUserById(req.params.userName);
        if (!req["decoded"] || user['id'] != req["decoded.id"])
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
    userUpdate,
    userDelete,
    checkPermission
}