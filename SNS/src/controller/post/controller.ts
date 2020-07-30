import * as query from "./query";
import { Request, Response } from "express";
import { User } from "../../models/user";
import { Post } from "../../models/post"

interface type { (req: Request, res: Response): Promise<void> }

const registerPost: type = async (req, res) => {
    const description = req.body;
    const userId = req['decoded'].id;
    const imgArray = req['files'];
    await query.postUpload(userId, imgArray, description);

    res.status(200).json({ message: "success" })
}

const deletePost: type = async (req, res) => {

}

//오늘 1커밋 하세영


























const test: type = async (req, res) => {
    try {
        // const user: any = await User.findOne({
        //     include: [
        //         {
        //             model: Post,
        //             required: false,
        //             attributes: ['id', 'description', 'like']
        //         }],
        //     where: {
        //         id: "3"
        //     },
        //     raw: true,
        // })
        console.log(req["decoded"].id);

        // const user: any = await User.findAll({
        //     where: ({ id: 3 }),
        //     include: [
        //         {
        //             model: Post,
        //             required: false,
        //             attributes: ['id', 'description', 'like']
        //         }
        //     ],
        //     raw: true
        // })

        await query.postUpload(3, req['files'], "1");
        //console.log(req['files']);
        res.json({ a: "success" }).end();
        // console.log(user);


    } catch (err) {
        console.log(err);

    }
}

export {
    registerPost,
    test
}