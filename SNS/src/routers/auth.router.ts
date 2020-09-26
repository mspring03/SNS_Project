import express from "express";
import * as authController from "../controller/auth/controller";
import * as middelware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/tokenDecoder";

const passportGitHub = require('../auth/github');
const passportfacebook = require('../auth/facebook');
const passportgoogle = require('../auth/google');

const router = express.Router();
const signInHanddler = middelware.tryCatchMiddleware.Error(authController.signInUser);
const tokenValidationHanddler = middelware.tryCatchMiddleware.Error(authController.tokenValidation);
const meHanddler = middelware.tryCatchMiddleware.Error(authController.me);
const refreshHanddler = middelware.tryCatchMiddleware.Error(authController.refresh)

const accessToken = authMiddleware.accessToken;
const refreshToken = authMiddleware.refreshToken;

router.post("/signIn", signInHanddler);
router.get("/tokenValidation", accessToken, tokenValidationHanddler);
router.get("/me", accessToken, meHanddler);
router.get("/refresh", refreshToken, refreshHanddler);
router.get('/github', passportGitHub.authenticate('github'));
router.get('/github/callback', passportGitHub.authenticate('github', { failureRedirect: '/signIn' }), authController.passport);
router.get('/facebook', passportfacebook.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passportfacebook.authenticate('facebook', { failurRedirect: '/signIn' }), authController.passport);
router.get('/google', passportgoogle.authenticate('google', { scope: ['email'] }));
router.get('/google/callback', passportgoogle.authenticate('google', { failurRedirect: '/signIn' }), authController.passport);

export default router;
