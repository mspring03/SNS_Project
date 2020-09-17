import { sequelize } from "../config/Connection"
import Sequelize, { Model } from "sequelize"

export class Comment_like extends Model<Comment_like> {
    comment_id: number;
    user_id: number;
}

Comment_like.init(
    {
        comment_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "Commnet_like"
}
);