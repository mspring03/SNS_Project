import { User } from "../../models/user";

const findAllUser = async (): Promise<object> => {
    const user: any = await User.findAll({
        attributes: [ "userName", "nickName" ] 
    });

    if(user != null) 
    return user.dataValues;
    return user;
}

const findOneUserById = async (userName: string): Promise<object> => {
    const user: any = await User.findOne({
        where: { userName: userName }
    })

    if(user != null) 
    return user.dataValues;
    return user;
}

const userCreate = async (userName: string, password: string, nickName: string) => {
    await User.create({
        userName: userName,
        password: password,
        nickName: nickName,
    });
}

const userNameUpdate = async (userName: string, user: string) => {
    await User.update({
        userName: userName,
    }, {
        where: { userName: user }
    });
}

const passwordUpdate = async (password: string, user: string) => {
    await User.update({
        password: password,
    }, {
        where: { userName: user }
    });
}

const nickNameUpdate = async (nickName: string, user: string) => {
    await User.update({
        nickName: nickName,
    }, {
        where: { userName: user }
    });
}

const deleteUser = async (user: string) => {
    await User.destroy({
      where: { userName: user }  
    })
}

export {
    findAllUser,
    findOneUserById,
    userCreate,
    userNameUpdate,
    passwordUpdate,
    nickNameUpdate,
    deleteUser
}