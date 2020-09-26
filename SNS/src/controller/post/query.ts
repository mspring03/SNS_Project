import { User } from "../../models/user";
import { Post } from "../../models/post";
import { Friend } from "../../models/friend"
import { Post_like } from "../../models/post_like";

const imgArrayToString = (imgArray: object) => {
    let imgString: string = "";
    for (let i in imgArray) {
        const url = imgArray[i].location.split('/');
        const delFileName = url[url.length - 1];

        imgString = imgString.concat(`${delFileName}!@#$`);
    }

    return imgString;
}

const findOnePostById = async (postId: number) => {
    const post: any = await Post.findOne({
        where: { id: postId }
    });

    if (post != null)
        return post.dataValues;
    return post;
}

const postUpload = async (userId: number, imgArray: object, description: string) => {
    const imgString = await imgArrayToString(imgArray);

    await Post.create({
        user_id: userId,
        description: description,
        uploadImg: imgString,
        like: 0
    });
}

const postDelete = async (postId: number) => {
    await Post.destroy({
        where: { id: postId }
    });
}

const posting = async (userId: number, page: number) => {
    let offset;
    if (page > 1) { offset = 7 * (page - 1); }

    const posts = await User.findAll({
        include: [{
            model: Friend,
            required: false,
            include: [{ model: Friend, required: false }]
        }],
        where: { id: userId },
        offset: offset,
        limit: 7,
    })

    return posts;
}

const likeUp = async (postId, userId) => {
    await Post.increment({
        like: 1
    }, {
        where: { post_id: postId }
    });

    await Post_like.create({ post_id: postId, user_id: userId });
}

const likeDown = async (postId, userId) => {
    await Post.increment({
        like: -1
    }, {
        where: { post_id: postId }
    });

    await Post_like.destroy({
        where: { post_id: postId, user_id: userId }
    })
}

export {
    findOnePostById,
    postUpload,
    postDelete,
    posting,
    likeUp,
    likeDown
}