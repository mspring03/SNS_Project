import { sequelize } from "../config/Connection"
import Sequelize, { Model } from "sequelize"
import { User } from "./user";

export class Friend_request extends Model<Friend_request> {
    user_id: number;
    friend_post_id: number;
}

Friend_request.init(
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
    modelName: "Friend_request"
}
);

Friend_request.hasMany(User, { foreignKey: 'id', sourceKey: 'friend_id' });
User.belongsTo(Friend_request, { foreignKey: 'id', targetKey: 'friend_id' });