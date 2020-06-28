import express from "express";
import * as userController from "../controller/auth/controller";
import * as middelware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/jwt";

const router = express.Router();
const signUpHanddler = middelware.tryCatchMiddleware.NotFound(userController.signUpUser);
const signInHanddler = middelware.tryCatchMiddleware.NotFound(userController.signInUser);
const refreshHanddler = middelware.tryCatchMiddleware.NotFound(userController.refresh)
const eccessToken = authMiddleware.eccessToken;
const refreshToken = authMiddleware.refreshToken;

router.post("/signUp", signUpHanddler);
router.post("/signIn", signInHanddler);
router.get("/refresh", refreshToken, refreshHanddler);

export default router;
