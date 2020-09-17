import { sequelize } from "../config/Connection"
import Sequelize, { Model } from "sequelize"

export class Post_like extends Model<Post_like> {
    post_id: number;
    user_id: number;
}

Post_like.init(
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
    modelName: "Post_like"
}
);