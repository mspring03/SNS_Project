import express from "express";
import * as userController from "../controller/user/controller";
import * as middelware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/jwt";

const router = express.Router();
const findAllUserHanddler = middelware.tryCatchMiddleware.NotFound(userController.findAllUser);
const showUserHanddler = middelware.tryCatchMiddleware.NotFound(userController.showUser);
const signUpUserHanddler = middelware.tryCatchMiddleware.NotFound(userController.signUpUser);
const userUpdateHanddler = middelware.tryCatchMiddleware.NotFound(userController.userUpdate);
const userDeleteHanddler = middelware.tryCatchMiddleware.NotFound(userController.userDelete);
const cheakPermission = userController.checkPermission;
const accessToken = authMiddleware.accessToken;

router.get("/", accessToken, findAllUserHanddler);
router.get("/:userName", accessToken, showUserHanddler);
router.post("/", signUpUserHanddler);
router.put("/:userName", accessToken, cheakPermission, userUpdateHanddler);
router.delete("/:userName", accessToken, cheakPermission, userDeleteHanddler);

export default router;