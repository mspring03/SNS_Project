import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";
import { Comment } from "./comment";

export class Post extends Model<Post> {
    id: number;
    user_id: number;
    description: string;
    uploadImg: string;
    like: number;
}

Post.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        uploadImg: {
            type: Sequelize.STRING
        },
        like: {
            type: Sequelize.INTEGER
        }
    }, {
    sequelize,
    modelName: "Post"
}
);

Post.hasMany(Comment, { foreignKey: 'post_id', sourceKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' });