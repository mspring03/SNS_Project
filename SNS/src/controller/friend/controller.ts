import query from "./query";
import { Request, Response } from "express";

interface type { (req: Request, res: Response): Promise<void> }

const FriendRequest: type = async (req, res) => {
    const { userId, friendId } = req.body;
    await query.friendRequest(userId, friendId);

    res.status(200).json({ message: "success" });
}

const allowFriend: type = async (req, res) => {
    const { userId, friendId } = req.body;
    await query.allowFriend(userId, friendId);

    res.status(200).json({ message: "success" });
}

const friendRequestList: type = async (req, res) => {
    const userId = req.body.userId;
    const list = await query.findFriendRequestList(userId);

    res.status(200).json({ message: "success", list });
}

const deleteFriend: type = async (req, res) => {
    const { userId, friendId } = req.body;
    await query.deleteFriend(userId, friendId);

    res.status(200).json({ message: "success" });
}

const findFriend: type = async (req, res) => {
    const { nickName } = req.body;
    const searchList = await query.findFriendByNickname(nickName);

    res.status(200).json({ message: "success", searchList });
}

const friendProfile: type = async (req, res) => {
    const { userId, friendId } = req.body;
    const profile = await query.findFriendProfile(userId, friendId);

    res.status(200).json({ message: "success", profile });
}

const findFriendPost: type = async (req, res) => {
    const { friendId, page } = req.body;
    const searchList = await query.findFriendPost(friendId, page);

    res.status(200).json({ message: "success", searchList });
}

export {
    FriendRequest,
    allowFriend,
    friendRequestList,
    deleteFriend,
    findFriend,
    friendProfile,
    findFriendPost
}