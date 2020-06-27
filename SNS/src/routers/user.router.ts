import express from "express";
import * as userController from "../controller/user/controller";
import * as middelware from "../middleware/errorHandler"

const router = express.Router();
const signUpHanddler = middelware.tryCatchMiddleware.NotFound(userController.signUpUser);
const signInHanddler = middelware.tryCatchMiddleware.NotFound(userController.signInUser);

router.post("/signUp", signUpHanddler);
router.post("/signIn", signInHanddler);

export default router;
