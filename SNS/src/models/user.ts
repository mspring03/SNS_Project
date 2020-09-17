import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";
import { Post } from "./post";
import { Friend } from "./friend";
import { Friend_request } from "./friend_request";

export class User extends Model<User> {
    id: number;
    email: string;
    password: string;
    nickName: string;
    profileImg: string;
    token: string;
    refreshtoken: string;
}

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nickName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profileImg: {
            type: Sequelize.STRING,

        },
        token: {
            type: Sequelize.STRING
        },
        refreshtoken: {
            type: Sequelize.STRING
        }
    }, {
    sequelize,
    modelName: "User"
}
);

User.hasMany(Post, { foreignKey: 'user_id', sourceKey: 'id' });
Post.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

User.hasMany(Friend, { foreignKey: 'user_id', sourceKey: 'id' });
Friend.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

User.hasMany(Friend_request, { foreignKey: 'user_id', sourceKey: 'id' });
Friend_request.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });