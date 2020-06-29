import express from "express";
import * as userController from "../controller/auth/controller";
import * as middelware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/jwt";

const router = express.Router();
const signInHanddler = middelware.tryCatchMiddleware.NotFound(userController.signInUser);
const meHanddler = middelware.tryCatchMiddleware.NotFound(userController.me);
const refreshHanddler = middelware.tryCatchMiddleware.NotFound(userController.refresh)

const accessToken = authMiddleware.accessToken;
const refreshToken = authMiddleware.refreshToken;

router.post("/signIn", signInHanddler);
router.get("/me", accessToken, meHanddler);
router.get("/refresh", refreshToken, refreshHanddler);

export default router;
