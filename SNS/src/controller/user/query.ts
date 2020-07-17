import { User } from "../../models/user";
import bcrypt from "bcrypt-nodejs";

const passwordHashing = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password);
}

const passwordCompare = async (password: string, userPw: string): Promise<boolean> => {
    return await bcrypt.compareSync(password, userPw);
}

const findAllUser = async (): Promise<object> => {
    const user: any = await User.findAll({
        attributes: ["email", "nickName"]
    });

    return user;
}

const findOneUserById = async (email: string): Promise<object> => {
    const user: any = await User.findOne({
        where: { email: email }
    })
    console.log(user);


    if (user != null)
        return user.dataValues;
    return user;
}

const userCreate = async (email: string, password: string, nickName: string) => {
    await User.create({
        email: email,
        password: password,
        nickName: nickName,
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
    findOneUserById,
    userCreate,
    emailUpdate,
    passwordUpdate,
    nickNameUpdate,
    deleteUser,
    putCode,
    getCode
}