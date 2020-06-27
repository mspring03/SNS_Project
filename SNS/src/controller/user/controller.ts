import { Request, Response } from "express";
import * as userQuery from "./query";
import * as token from "./mkToken";

const mktoken = token.mktoken;

const signUpUser = async (req: Request, res: Response) => {
    const { userName, password, nickName } = req.body;
    
    if (await userQuery.findUserById(userName)) 
        throw new Error('이미 있는 아이디');

    await userQuery.userCreate(userName, password, nickName);
    res.status(200).json({ message: "회원가입 성공"}).end();
}

const signInUser = async (req: Request, res: Response): Promise<any> => {
    const { userName, password } = req.body;
    const user = await userQuery.findUserById(userName);

    if (!user) throw new Error("로그인 실패"); 
        
    if(user.password === password) {
        const token: string = await mktoken(req, res, user);
        await userQuery.tokenUpdate(user.userName, token);
        res.status(200).json({ message: '로그인 성공', token, }).end();
    }
}

export {
    signUpUser,
    signInUser    
}

