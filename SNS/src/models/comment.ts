import { sequelize } from "../config/Connection"
import Sequelize, { Model } from "sequelize"
import { Comment_like } from "./comment_like";

export class Comment extends Model<Comment> {
    post_id: number;
    user_id: number;
    nickName: string;
    comment: string;
    like: number;
}

Comment.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
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

Comment.hasMany(Comment_like, { foreignKey: 'comment_id', sourceKey: 'id' });
Comment_like.belongsTo(Comment, { foreignKey: 'comment_id', targetKey: 'id' });