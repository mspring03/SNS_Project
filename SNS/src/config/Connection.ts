import { Sequelize } from "sequelize";
import config from './database.config';

export const sequelize = new Sequelize(
    config.database.name,
    "mspring03",
    config.database.password,
    {
        host: config.database.host,
        port: 3306,
        dialect: "mysql",
        define: {
            timestamps: false
        },
        timezone: "+09:00",
        pool: {
            max: 30,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);