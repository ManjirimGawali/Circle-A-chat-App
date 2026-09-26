import { Request, Response } from "express";
import mongoose from "mongoose";

import Message from "../models/Message.js";
import Conversation from "../models/Conversations.js";
import  {getIO}  from "../sockets/sockets.js";


// =====================================================
// GET MESSAGES
// =====================================================

export const getMessages = async (
    req: Request,
    res: Response
) => {

    try {

        // 1. Get logged-in user from JWT
        const currentUserId =
            req.user?.userId;


        // 2. Get conversation ID from URL
        const conversationId =
            req.params.conversationId as string;


        // 3. Check authentication
        if (!currentUserId) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }


        // 4. Validate conversation ID
        if (
            !mongoose.Types.ObjectId.isValid(
                conversationId
            )
        ) {

            return res.status(400).json({
                message: "Invalid conversation ID"
            });

        }


        // 5. Check whether conversation exists
        // AND whether current user belongs to it
        const conversation =
            await Conversation.findOne({
                _id: conversationId,
                participants: currentUserId
            });


        if (!conversation) {

            return res.status(404).json({
                message: "Conversation not found"
            });

        }


        // 6. Find messages belonging
        // to this conversation
        const messages =
            await Message.find({
                conversation: conversationId
            })


            // 7. Get basic sender information
            .populate(
                "sender",
                "_id username profilePicture"
            )


            // 8. Oldest → newest
            .sort({
                createdAt: 1
            });


        // 9. Send messages to frontend
        return res.status(200).json({
            messages
        });


    } catch (error) {

        console.error(
            "Get messages error:",
            error
        );


        return res.status(500).json({
            message: "Internal server error"
        });

    }

};


// =====================================================
// SEND MESSAGE
// =====================================================

export const sendMessage = async (
    req: Request,
    res: Response
) => {

    try {

        // 1. Get logged-in user from JWT
        const currentUserId =
            req.user?.userId;


        // 2. Get data from request body
        const {
            conversationId,
            content,
            messageType
        } = req.body;


        // 3. Check authentication
        if (!currentUserId) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }


        // 4. Check conversation ID
        if (!conversationId) {

            return res.status(400).json({
                message: "Conversation ID is required"
            });

        }


        // 5. Validate conversation ID
        if (
            !mongoose.Types.ObjectId.isValid(
                conversationId
            )
        ) {

            return res.status(400).json({
                message: "Invalid conversation ID"
            });

        }


        // 6. Validate message content
        if (
            !content ||
            !content.trim()
        ) {

            return res.status(400).json({
                message: "Message content is required"
            });

        }


        // 7. Check conversation exists
        // AND current user is a participant
        const conversation =
            await Conversation.findOne({
                _id: conversationId,
                participants: currentUserId
            });


        if (!conversation) {

            return res.status(404).json({
                message: "Conversation not found"
            });

        }


        // 8. Create message
        const message =
            await Message.create({

                conversation: conversationId,

                sender: currentUserId,

                content: content.trim(),

                messageType:
                    messageType || "text"

            });


        // 9. Update last message
        conversation.lastMessage =
            message._id;


        await conversation.save();


        // 10. Populate sender information
        await message.populate(
            "sender",
            "_id username profilePicture"
        );


        // 11. Get Socket.IO instance
        const io = getIO();


        // 12. Send new message
        // to everyone inside this conversation room
        io.to(
            `conversation:${conversationId}`
        ).emit(
            "newMessage",
            message
        );


        // 13. Return created message
        return res.status(201).json({

            message

        });


    } catch (error) {

        console.error(
            "Send message error:",
            error
        );


        return res.status(500).json({
            message: "Internal server error"
        });

    }

};