import { User } from "../../models/user";
import { Op } from "sequelize";
import bcrypt from "bcrypt-nodejs";

const passwordHashing = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password);
}

const passwordCompare = async (password: string, userPw: string): Promise<boolean> => {
    return await bcrypt.compareSync(password, userPw);
}

const findAllUser = async (): Promise<object> => {
    const user: any = await User.findAll({
        attributes: ["id", "email", "nickName", "profileImg"],
        where: {
            [Op.gt]: [{ id: 1 }]
        }
    });

    return user;
}

const findUserByToken = async (token: string): Promise<object> => {
    const user: any = await User.findOne({
        attributes: ["id", "email", "nickName", "profileImg"],
        where: { token: token }
    });

    if (user != null)
        return user.dataValues;
    return user;
};

const findOneUserById = async (email: string): Promise<object> => {
    const user: any = await User.findOne({
        where: { email: email }
    })

    if (user != null)
        return user.dataValues;
    return user;
}

const userCreate = async (email: string, password: string, nickName: string) => {
    await User.create({
        email: email,
        password: password,
        nickName: nickName,
        profileImg: "https://dsm-sns.s3.ap-northeast-2.amazonaws.com/s3/2a4ce49c05c98ea7ae14936e8cf75da6"
    });
}

const emailUpdate = async (email: string, user: string) => {
    await User.update({
        email: email,
    }, {
        where: { email: user }
    });
}

const passwordUpdate = async (password: string, user: string) => {
    await User.update({
        password: password,
    }, {
        where: { email: user }
    });
}

const nickNameUpdate = async (nickName: string, user: string) => {
    await User.update({
        nickName: nickName,
    }, {
        where: { email: user }
    });
}

const profileImgUpdate = async (file: string, token: string) => {
    await User.update({
        profileImg: file,
    }, {
        where: { token: token }
    });
}

const deleteUser = async (user: string) => {
    await User.destroy({
        where: { email: user }
    })
}

const putCode = async (code: string): Promise<void> => {
    await User.update({
        nickName: code,
    }, {
        where: { email: "admin" }
    });
}

const getCode = async (): Promise<string> => {
    const user: any = await User.findOne({
        attributes: ["nickName"],
        where: { email: "admin" }
    });

    putCode(`${Math.floor(Math.random() * 100000)}`);

    if (user != null)
        return user.dataValues['nickName'];
    return user;
}

export {
    passwordHashing,
    passwordCompare,
    findAllUser,
    findUserByToken,
    findOneUserById,
    userCreate,
    emailUpdate,
    passwordUpdate,
    nickNameUpdate,
    profileImgUpdate,
    deleteUser,
    putCode,
    getCode
}