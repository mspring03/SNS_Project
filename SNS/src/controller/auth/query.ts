import { User } from "../../models/user";

const findUserById = async (userName: string): Promise<object> => {
    const user: any = await User.findOne({
        where: { userName: userName }
    });

    if(user != null) 
    return user.dataValues;
    return user;
};

const findUserByToken = async (token: string): Promise<object> => {
    const user: any = await User.findOne({
        where: { token: token }
    });

    if(user != null) 
    return user.dataValues;
    return user;
};

const findUserByRefreshToken = async (refreshtoken: string): Promise<object> => {
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