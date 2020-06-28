import { User } from "../../models/user";

const findUserById = async (userName: string): Promise<any> => {
    const user: any = await User.findOne({
        where: { userName: userName }
    });

    if(user != null) 
    return user.dataValues;
    return user;
};

const findUserByRefreshToken = async (refreshtoken: string): Promise<any> => {
    const user: any = await User.findOne({
        where: { refreshtoken: refreshtoken }
    });

    if(user != null) 
    return user.dataValues;
    return user;
};

const userCreate = async (userName: string, password: string, nickName: string) => {
    await User.create({
        userName: userName,
        password: password,
        nickName: nickName,
    });
}

const tokenUpdate = async (userName: string, token: string, refreshtoken: string) => {
    await User.update({
        token: token,
        refreshtoken: refreshtoken
    },{ 
        where: { userName: userName } 
    });
}

export {
    findUserById,
    userCreate,
    findUserByRefreshToken,
    tokenUpdate
}