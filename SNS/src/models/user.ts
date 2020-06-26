import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";

export class user extends Model<user> {
    id: number;
    userName: string;
    password: string;
    nickName: string;
    token: string;
}

user.init(
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
        }
    }, {
        sequelize,
        modelName: "user"
    }
);