import express from "express";
import * as userController from "../controller/user/controller";
import * as middelware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/tokenDecoder";
import * as fileManagement from "../middleware/fileManagement";

const router = express.Router();
const findAllUserHanddler = middelware.tryCatchMiddleware.Error(userController.findAllUser);
const showUserHanddler = middelware.tryCatchMiddleware.Error(userController.showUser);
const emailSenderHanddler = middelware.tryCatchMiddleware.Error(userController.emailSender);
const signUpHanddler = middelware.tryCatchMiddleware.Error(userController.signUp);
const passwordUpdateHanddler = middelware.tryCatchMiddleware.Error(userController.passwordUpdate);
const userUpdateHanddler = middelware.tryCatchMiddleware.Error(userController.userUpdate);
const userDeleteHanddler = middelware.tryCatchMiddleware.Error(userController.userDelete);
const cheakPermission = userController.checkPermission;
const accessToken = authMiddleware.accessToken;

router.get("/", accessToken, findAllUserHanddler);
router.get("/:email", accessToken, showUserHanddler);
router.post("/", emailSenderHanddler);
router.post("/signUp", signUpHanddler);
router.patch("/passwordUpdate", passwordUpdateHanddler);
router.patch("/profileImgUpdate", accessToken, fileManagement.profileImgUpload, fileManagement.profileImgDelete, userController.userProfileUpdate);
router.put("/:email", accessToken, cheakPermission, userUpdateHanddler);
router.delete("/:email", accessToken, cheakPermission, userDeleteHanddler);

export default router;