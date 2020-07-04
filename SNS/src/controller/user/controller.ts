import * as query from "./query";
import { Request, Response } from "express";

interface userType {
    email: string;
    password: string;
    nickName: string;
}

const findAllUser = async (req: Request, res: Response) => {
    const allUser: object = await query.findAllUser();
    res.status(200).json({ message: 'findAllUser', allUser });
}

const showUser = async (req: Request, res: Response) => {
    const user:object = await query.findOneUserById(req.params.email);
    res.status(200).json({ message: 'findOneUser', email: user['email'], nickName: user['email'] });
}

const signUpUser = async (req: Request, res: Response) => {
    const { email, password, nickName }: userType = req.body;
    
    if (await query.findOneUserById(email)) 
        throw new Error('email already exist');

    await query.userCreate(email, password, nickName);
    res.status(200).json({ message: 'signUp success' }).end();
}

const userUpdate = async (req: Request, res: Response) => {
    // const { password, nickName }: userType = req.body;

    // if (password) await query.passwordUpdate(password, req.params.email);
    // if (nickName) await query.nickNameUpdate(nickName, req.params.email);
    // res.status(200).json({ message: 'user update' }).end();
}

const userDelete = async (req: Request, res: Response) => {
    const password: string = req.body.password;
    const user: object = await query.findOneUserById(req.params.email);
    
    if(user['password'] === password)
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
    userUpdate,
    userDelete,
    checkPermission
}