import { sequelize } from "../config/Connection"
import Sequelize, { Model } from "sequelize"
import { Post } from "./post";

export class Friend extends Model<Friend> {
    user_id: number;
    friend_post_id: number;
}

Friend.init(
    {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    }, {
    sequelize,
    modelName: "Friend"
}
);

Friend.hasMany(Post, { foreignKey: 'id', sourceKey: 'post_id' });
Post.belongsTo(Friend, { foreignKey: 'id', targetKey: 'post_id' });  