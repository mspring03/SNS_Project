import express from "express";
import * as userController from "../controller/user/controller";
import * as middelware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/jwt";
import * as fileManagement from "../middleware/fileManagement";

const router = express.Router();
const findAllUserHanddler = middelware.tryCatchMiddleware.NotFound(userController.findAllUser);
const showUserHanddler = middelware.tryCatchMiddleware.NotFound(userController.showUser);
const emailSenderHanddler = middelware.tryCatchMiddleware.NotFound(userController.emailSender);
const signUpHanddler = middelware.tryCatchMiddleware.NotFound(userController.signUp);
const userUpdateHanddler = middelware.tryCatchMiddleware.NotFound(userController.userUpdate);
const userDeleteHanddler = middelware.tryCatchMiddleware.NotFound(userController.userDelete);
const cheakPermission = userController.checkPermission;
const accessToken = authMiddleware.accessToken;

router.get("/", accessToken, findAllUserHanddler);
router.get("/:email", accessToken, showUserHanddler);
router.post("/", emailSenderHanddler);
router.post("/signUp", signUpHanddler);
router.post("/profileImgUpdate", accessToken, fileManagement.profileImgUpload, fileManagement.profileImgDelete, userController.userProfileUpdate);
router.put("/:email", accessToken, cheakPermission, userUpdateHanddler);
router.delete("/:email", accessToken, cheakPermission, userDeleteHanddler);

export default router;