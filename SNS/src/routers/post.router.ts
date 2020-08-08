import express from "express";
import * as postController from "../controller/post/controller";
import * as middelware from "../middleware/errorHandler"
import * as authMiddleware from "../middleware/jwt";
import router from "./auth.router";
import * as fileManagement from "../middleware/fileManagement";

const registerPostHanddler = middelware.tryCatchMiddleware.NotFound(postController.registerPost);
const deletePostHanddler = middelware.tryCatchMiddleware.NotFound(postController.deletePost);
const accessToken = authMiddleware.accessToken;

router.post("/", accessToken, fileManagement.postImgUpload, registerPostHanddler);
router.delete("/", accessToken, fileManagement.postImgDelete, deletePostHanddler);

export default router;