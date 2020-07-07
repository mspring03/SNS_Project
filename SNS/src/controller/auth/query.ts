import { User } from "../../models/user";

interface type {
    (value1: string): Promise<object>;
}

const findUserByEmail: type = async (email) => {
    const user: any = await User.findOne({
        where: { email: email }
    });

    if (user != null)
        return user.dataValues;
    return user;
};

const findUserByToken: type = async (token) => {
    const user: any = await User.findOne({
        attributes: ["id", "email", "nickName"],
        where: { token: token }
    });

    if (user != null)
        return user.dataValues;
    return user;
};

const findUserByRefreshToken: type = async (refreshtoken) => {
    const user: any = await User.findOne({
        where: { refreshtoken: refreshtoken }
    });

    if (user != null)
        return user.dataValues;
    return user;
};

const tokenUpdate = async (email: string, token: string, refreshtoken: string) => {
    await User.update({
        token: token,
        refreshtoken: refreshtoken
    }, {
        where: { email: email }
    });
}

export {
    findUserByEmail,
    findUserByToken,
    findUserByRefreshToken,
    tokenUpdate
}