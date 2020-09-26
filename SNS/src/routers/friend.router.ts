import express from "express";
import * as friendController from "../controller/friend/controller";
import * as middleware from "../middleware/errorHandler"
import * as tokenDecoder from "../middleware/tokenDecoder";

const router = express.Router();
const accessToken = tokenDecoder.accessToken;

const friendRequestHanddler = middleware.tryCatchMiddleware.Error(friendController.FriendRequest);
const allowFriendHanddler = middleware.tryCatchMiddleware.Error(friendController.allowFriend);
const friendRequestListHanddler = middleware.tryCatchMiddleware.Error(friendController.friendRequestList);
const deleteFriendHanddler = middleware.tryCatchMiddleware.Error(friendController.deleteFriend);
const findFriendHanddler = middleware.tryCatchMiddleware.Error(friendController.findFriend);
const friendProfileHanddler = middleware.tryCatchMiddleware.Error(friendController.friendProfile);
const findFriendPostHanddler = middleware.tryCatchMiddleware.Error(friendController.findFriendPost);

router.post("/request", accessToken, friendRequestHanddler);
router.post("/allow", accessToken, allowFriendHanddler);
router.get("/requestList", accessToken, friendRequestListHanddler);
router.delete("/", accessToken, deleteFriendHanddler);
router.get("/find", accessToken, findFriendHanddler);
router.post("/profile", accessToken, friendProfileHanddler);
router.post("/post", accessToken, findFriendPostHanddler)

export default router;