import { sequelize } from "../config/Connection"
import Sequelize, { Model } from "sequelize"

export class post_like extends Model<post_like> {
    post_id: number;
    user_id: number;
}

post_like.init(
    {
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "post_like"
}
);