import { sequelize } from "../config/Connection"
import Sequelize, { Model } from "sequelize"

export class Comment extends Model<Comment> {

}

Comment.init(
    {
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nickName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING
        },
        like: {
            type: Sequelize.INTEGER
        }
    }, {
    sequelize,
    modelName: "Comment"
}
);