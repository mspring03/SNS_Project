import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"
import * as userQuery from "../controller/user/query"
import * as postQuery from "../controller/post/query"

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION
})

const multerProfileImg = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read-write',
        bucket: 'dsm-sns/s3'
    })
})

const multerPostImg = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read-write',
        bucket: 'dsm-sns/post'
    })
})

const profileImgUpload = multerProfileImg.single('img');

const profileImgDelete = async (req, res, next) => {
    const token: any = req.headers['x-access-token'];
    const user: any = await userQuery.findUserByToken(token);
    console.log(user);

    if (user['profileImg'] !== "https://dsm-sns.s3.ap-northeast-2.amazonaws.com/s3/2a4ce49c05c98ea7ae14936e8cf75da6") {
        const url = user['profileImg'].split('/');
        const delFileName = url[url.length - 1];
        const params = { Bucket: "dsm-sns/s3", Key: delFileName }

        s3.deleteObject(params, function (err, data) {
            if (err) {
                console.log('profile img delete error')
                console.log(err, err.stack)
            } else {
                console.log('profile img delete success' + data)
            }
        })
    }

    next();
}

const postImgUpload = multerPostImg.array('img', 5);

const postImgDelete = async (req, res, next) => {
    const postId = req.body.postId;
    const post: object = await postQuery.findOnePostById(postId);
    console.log(post['uploadImg']);

    const imgArray = post['uploadImg'].split('!@#$');
    for (let i in imgArray) {
        const params = { Bucket: "dsm-sns/post", Key: imgArray[i] }
        console.log(params);

        s3.deleteObject(params, function (err, data) {
            if (err) {
                console.log('upload img delete error')
                console.log(err, err.stack)
            } else {
                console.log('upload img delete success' + data)
            }
        });
    }

    next();
}

export {
    profileImgUpload,
    profileImgDelete,
    postImgUpload,
    postImgDelete
}