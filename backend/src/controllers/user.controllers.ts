import { Request, Response } from "express";
import { User } from "../models/Users.js";

export const getAllUsers = async (
    req: Request,
    res: Response
) => {
    try {

        const currentUserId = req.user?.userId;

        if (!currentUserId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const users = await User.find({
            _id: {
                $ne: currentUserId
            }
        }).select(
            "_id username email profilePicture status isOnline lastSeen"
        );

        return res.status(200).json({
            users
        });

    } catch (error) {

        console.error(
            "Get users error:",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};