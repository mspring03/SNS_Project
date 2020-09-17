import { sequelize } from "../config/Connection"
import Sequelize, { Model } from "sequelize"
import { Post } from "./post";
import { User } from "./user";

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
        friend_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "Friend"
}
);

Friend.hasMany(Post, { foreignKey: 'id', sourceKey: 'friend_id' });
Post.belongsTo(Friend, { foreignKey: 'id', targetKey: 'friend_id' });

Friend.hasMany(User, { foreignKey: 'id', sourceKey: 'friend_id' });
User.belongsTo(Friend, { foreignKey: 'id', targetKey: 'friend_id' });