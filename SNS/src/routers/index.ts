import express from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import postRouter from "./post.router";
import friendRouter from "./friend.router"

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/friend", friendRouter)

export default router;