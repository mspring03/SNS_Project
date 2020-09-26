import * as query from "./query";
import { Request, Response } from "express";

interface type { (req: Request, res: Response): Promise<void> }

const registerPost: type = async (req, res) => {
    const description: string = req.body.description;
    const userId = req['decoded'].id;
    const imgArray = req['files'];
    await query.postUpload(userId, imgArray, description);

    res.status(200).json({ message: "success" })
}

const deletePost: type = async (req, res) => {
    const postId = req.body.postId;
    await query.postDelete(postId);

    res.status(200).json({ message: "success" });
}

const posting: type = async (req, res) => {
    const userId = req['decoded'].id;
    const page = req.body.page;
    const posts = await query.posting(userId, page);

    res.status(200).json({ message: "success", posts });
}

const likeUp: type = async (req, res) => {
    const { postId, userId } = req.body;

    await query.likeUp(postId, userId);

    res.status(200).json({ message: "success" });
}

const likeDown: type = async (req, res) => {
    const { postId, userId } = req.body;

    await query.likeDown(postId, userId);

    res.status(200).json({ message: "success" });
}

export {
    registerPost,
    deletePost,
    posting,
    likeUp,
    likeDown
}