import { User } from "../../models/user";

interface type {
    (value1: string): Promise<object>;
}

const findUserById: type = async (userName) => {
    const user: any = await User.findOne({
        where: { userName: userName }
    });

    if(user != null) 
    return user.dataValues;
    return user;
};

const findUserByToken: type = async (token) => {
    const user: any = await User.findOne({
        where: { token: token }
    });

    if(user != null) 
    return user.dataValues;
    return user;
};

const findUserByRefreshToken: type = async (refreshtoken) => {
    const user: any = await User.findOne({
        where: { refreshtoken: refreshtoken }
    });

    if(user != null) 
    return user.dataValues;
    return user;
};

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
    findUserByToken,
    findUserByRefreshToken,
    tokenUpdate
}