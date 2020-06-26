import { Request, Response } from "express";
import User from "./query";
import token from "./mkToken";

const mkToken = token.mktoken;

const signUpUser = async (req: Request, res: Response) => {
    const { userId, password, name, introduce } = req.body;
    
    if (await User.findUserById(userId)) 
        throw new Error('이미 있는 아이디');

    await User.userCreate(userId, password, name, introduce);
    res.status(200).json({ message: "회원가입 성공"}).end();
}

const signInUser = async (req: Request, res: Response): Promise<any> => {
    const { userId, password } = req.body;
    const user = await User.findUserById(userId);
    
    if (!user) throw new Error("로그인 실패"); 
        
    if(user.password === password) {
        const token = await mktoken(req, res, user);
        await User.tokenUpdate(user.userId, token);
        res.status(200).json({ message: '로그인 성공', token, }).end();
    }
}

module.exports = {
    signUpUser,
    signInUser
}