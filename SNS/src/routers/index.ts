import express from "express";
import userRouter from "./auth.router";

const router = express.Router();

router.use("/user", userRouter);

export default router;