import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";

export class User extends Model<User> {
    id: number;
    userName: string;
    password: string;
    nickName: string;
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
        userName: {
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