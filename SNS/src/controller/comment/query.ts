import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { Comment_like } from "../../models/comment_like";
import { sequelize } from "../../config/Connection";

const showMessageLog = async (postId: number) => {
    return await Post.findAll({
        where: {
            id: postId
        },
        include: [{
            model: Comment,
            required: false,
            include: [{
                model: Comment_like,
                required: false,
            }]
        }]
    })
}

const chatRecord = async (postId, userId, nickName, comment) => {
    await comment.Create({
        post_id: postId,
        user_id: userId,
        nickName: nickName,
        comment: comment,
        like: 0
    });
}

const likeUp = async (commentId, userId) => {
    await Comment.increment({
        like: 1
    }, {
        where: { comment_id: commentId }
    });

    await Comment_like.create({ comment_id: commentId, user_id: userId });
}

const likeDown = async (commentId, userId) => {
    await Comment.increment({
        like: -1
    }, {
        where: { comment_id: commentId }
    });

    await Comment_like.destroy({
        where: { comment_id: commentId, user_id: userId }
    })
}

export = {
    showMessageLog,
    chatRecord,
    likeUp,
    likeDown,

}