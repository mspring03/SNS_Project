import { Friend } from "../../models/friend";
import { Friend_request } from "../../models/friend_request";
import { User } from "../../models/user";
import { Post } from "../../models/post";
import { Post_like } from "../../models/post_like";

const sequelize = require("sequelize");
const Op = sequelize.Op;

const friendRequest = async (userId, friendId) => {
    await Friend_request.create({
        user_id: friendId,
        friend_id: userId
    })
}
const allowFriend = async (userId, friendId) => {
    await Friend_request.destroy({
        where: {
            user_id: friendId,
            friend_id: userId
        }
    })

    await Friend.create({
        user_id: userId,
        friend_id: friendId
    })
}

const findFriendRequestList = async (userId) => {
    const list = await Friend_request.findAll({
        include: [{
            model: User,
            required: false,
            attributes: ['profileImg', 'nickName']
        }],
        where: {
            user_id: {
                [Op.like]: `%${userId}%`
            }
        }
    });

    return list;
}

const deleteFriend = async (userId, friendId) => {
    await Friend.destroy({
        where: {
            user_id: userId,
            friend_id: friendId
        }
    })
}

const findFriendByNickname = async (nickName) => {
    const searchList = User.findAll({
        where: {
            nickName: nickName
        }
    });

    return searchList;
}

const findFriendProfile = async (userId, friendId) => {
    const Profile = User.findOne({
        attributes: ['nickName', 'profileImg'],
        where: {
            user_id: friendId
        },
        include: [{
            model: Friend,
            required: false,
            where: {
                friend_id: userId
            }
        }]
    })
}

const findFriendPost = async (friendId, page) => {
    let offset;
    if (page > 1) { offset = 7 * (page - 1); }
    const friendPost = await Post.findAll({
        where: {
            user_id: friendId
        },
        include: [{
            model: Post_like,
            required: false,
        }],
        offset: offset,
        limit: 7,
    });

    return friendPost;
}

export = {
    friendRequest,
    allowFriend,
    findFriendRequestList,
    deleteFriend,
    findFriendByNickname,
    findFriendProfile,
    findFriendPost
}