import { User } from "../../models/user";

const findAllUser = async (): Promise<object> => {
    const user: any = await User.findAll({
        attributes: [ "email", "nickName" ] 
    });

    return user;
}

const findOneUserById = async (email: string): Promise<object> => {
    const user: any = await User.findOne({
        where: { email: email }
    })

    if(user != null) 
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

export {
    findAllUser,
    findOneUserById,
    userCreate,
    emailUpdate,
    passwordUpdate,
    nickNameUpdate,
    deleteUser
}