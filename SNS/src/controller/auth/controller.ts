import { Request, Response } from "express";
import * as userQuery from "./query";
import * as token from "./mkToken";

const mktoken = token.mktoken;
const mkRefreshtoken = token.mkRefreshtoken;

const signUpUser = async (req: Request, res: Response) => {
    const { userName, password, nickName } = req.body;
    
    if (await userQuery.findUserById(userName)) 
        throw new Error('이미 있는 아이디');

    await userQuery.userCreate(userName, password, nickName);
    res.status(200).json({ message: "회원가입 성공"}).end();
}

const signInUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const user = await userQuery.findUserById(userName);

    if (!user) throw new Error("로그인 실패"); 
        
    if(user.password === password) {
        const token: string = await mktoken(req, user);
        const refreshtoken: string = await mkRefreshtoken(req, user);
        await userQuery.tokenUpdate(user.userName, token, refreshtoken);
        res.status(200).json({ message: '로그인 성공', token, refreshtoken }).end();
    }
}

const refresh = async (req: Request, res: Response) => {
    const eccesstoken = req.header['x-eccess-token'];
    const refreshtoken = req.header['x-refresh-token'];
    const user = await userQuery.findUserByRefreshToken(refreshtoken);

    if(user.token === eccesstoken) {
        const token: string = await mktoken(req, user);
        await userQuery.tokenUpdate(user.userName, token, refreshtoken);
        res.status(200).json({ message: '토큰 재발급', token, refreshtoken }).end();
    }
} 

export {
    signUpUser,
    signInUser,
    refresh 
}

