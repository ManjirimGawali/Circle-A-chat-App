import { request, Request, Response } from "express";
import mongoose from "mongoose";

import Conversation from "../models/Conversations.js";
import { User } from "../models/Users.js";

export const createPrivateConversation = async (
    req: Request,
    res: Response
) => {
    try {

        // Logged-in user
        const currentUserId = req.user?.userId;

        // User we clicked on
        const { userId: selectedUserId } = req.body;

        if (!currentUserId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!selectedUserId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        // Prevent chatting with yourself
        if (currentUserId === selectedUserId) {
            return res.status(400).json({
                message: "You cannot create a conversation with yourself"
            });
        }

        // Check whether selected user actually exists
        const selectedUser = await User.findById(
            selectedUserId
        );

        if (!selectedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if conversation already exists
        const existingConversation =
            await Conversation.findOne({
                isGroup: false,
                participants: {
                    $all: [
                        new mongoose.Types.ObjectId(currentUserId),
                        new mongoose.Types.ObjectId(selectedUserId)
                    ],
                    $size: 2
                }
            });

        if (existingConversation) {

            return res.status(200).json({
                message: "Conversation already exists",
                conversation: existingConversation
            });
        }

        // Create new private conversation
        const conversation =
            await Conversation.create({
                participants: [
                    currentUserId,
                    selectedUserId
                ],
                isGroup: false
            });

        return res.status(201).json({
            message: "Private conversation created",
            conversation
        });

    } catch (error) {

        console.error(
            "Create private conversation error:",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getMyConversations = async (
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

        const conversations = await Conversation.find({
            participants: currentUserId
        })
            .populate({
                path: "participants",
                select:
                    "_id username email profilePicture status isOnline lastSeen"
            })
            // .populate({
            //     path: "lastMessage",
            //     select:
            //         "content sender messageType isRead createdAt"
            // })
            .sort({
                updatedAt: -1
            });

        return res.status(200).json({
            conversations
        });

    } catch (error) {
        console.error(
            "Get conversations error:",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};