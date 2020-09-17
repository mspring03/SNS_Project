import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";
import { Comment } from "./comment";
import { Post_like } from "./post_like";

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
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        }
    }, {
    sequelize,
    modelName: "Post"
}
);

Post.hasMany(Comment, { foreignKey: 'post_id', sourceKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' });

Comment.hasMany(Post_like, { foreignKey: 'post_id', sourceKey: 'id' });
Post_like.belongsTo(Comment, { foreignKey: 'post_id', targetKey: 'id' });