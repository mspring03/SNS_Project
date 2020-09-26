import * as postController from "../controller/post/controller";
import * as middleware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/tokenDecoder";
import router from "./auth.router";
import * as fileManagement from "../middleware/fileManagement";

const registerPostHanddler = middleware.tryCatchMiddleware.Error(postController.registerPost);
const deletePostHanddler = middleware.tryCatchMiddleware.Error(postController.deletePost);
const postingHanddler = middleware.tryCatchMiddleware.Error(postController.posting);
const likeUpHanddler = middleware.tryCatchMiddleware.Error(postController.likeUp);
const likeDownHanddler = middleware.tryCatchMiddleware.Error(postController.likeDown);

const accessToken = authMiddleware.accessToken;

router.post("/", accessToken, fileManagement.postImgUpload, registerPostHanddler);
router.delete("/", accessToken, fileManagement.postImgDelete, deletePostHanddler);
router.post("/posting", accessToken, postingHanddler);
router.post("likeUp", accessToken, likeUpHanddler);
router.post("likeDown", accessToken, likeDownHanddler);

export default router;