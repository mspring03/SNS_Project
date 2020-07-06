import express from "express";
import * as userController from "../controller/auth/controller";
import * as middelware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/jwt";

const passportGitHub = require('../auth/github');
const passportfacebook = require('../auth/facebook');
const passportgoogle = require('../auth/google');

const router = express.Router();
const signInHanddler = middelware.tryCatchMiddleware.NotFound(userController.signInUser);
const meHanddler = middelware.tryCatchMiddleware.NotFound(userController.me);
const refreshHanddler = middelware.tryCatchMiddleware.NotFound(userController.refresh)

const accessToken = authMiddleware.accessToken;
const refreshToken = authMiddleware.refreshToken;

router.post("/signIn", signInHanddler);
router.get("/me", accessToken, meHanddler);
router.get("/refresh", refreshToken, refreshHanddler);
router.get('/github', passportGitHub.authenticate('github'));
router.get('/github/callback', passportGitHub.authenticate('github', { failureRedirect: '/signIn' }), userController.passport);
router.get('/facebook', passportfacebook.authenticate('facebook',  { scope: ['email'] }));
router.get('/facebook/callback', passportfacebook.authenticate('facebook', { failurRedirect: '/signIn' }), userController.passport);
router.get('/google', passportgoogle.authenticate('google',  { scope: ['email'] }));
router.get('/google/callback', passportgoogle.authenticate('google', { failurRedirect: '/signIn' }), userController.passport);

export default router;
