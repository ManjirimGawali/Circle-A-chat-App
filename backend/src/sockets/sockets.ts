import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";

import Conversation from "../models/Conversations.js";

let io: Server;
export const initializeSocket = (
    httpServer: HttpServer
) => {

     io = new Server(
        httpServer,
        {
            cors: {
                origin:
                    process.env.FRONTEND_URL
            }
        }
    );


    // Socket authentication
    io.use((socket, next) => {

        try {

            const token =
                socket.handshake.auth.token;


            if (!token) {

                return next(
                    new Error(
                        "Authentication token required"
                    )
                );

            }


            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_SECRET as string
                ) as {
                    userId: string;
                };


            socket.data.userId =
                decoded.userId;


            next();

        } catch (error) {

            console.error(
                "Socket authentication failed:",
                error
            );

            next(
                new Error(
                    "Invalid or expired token"
                )
            );

        }

    });


    // Socket connection
    io.on("connection", (socket) => {

        console.log(
            "Socket Connected:",
            socket.id
        );

        console.log(
            "Authenticated User:",
            socket.data.userId
        );


        // Join conversation
        socket.on(
            "joinConversation",
            async (conversationId: string) => {

                try {

                    const userId =
                        socket.data.userId;


                    const conversation =
                        await Conversation.findOne({
                            _id: conversationId,
                            participants: userId
                        });


                    if (!conversation) {

                        console.log(
                            "Unauthorized conversation access:",
                            conversationId
                        );

                        socket.emit(
                            "socketError",
                            {
                                message:
                                    "You are not a participant in this conversation"
                            }
                        );

                        return;
                    }


                    const roomName =
                        `conversation:${conversationId}`;


                    socket.join(roomName);


                    console.log(
                        `User ${userId} joined room ${roomName}`
                    );

                } catch (error) {

                    console.error(
                        "Join conversation error:",
                        error
                    );

                    socket.emit(
                        "socketError",
                        {
                            message:
                                "Failed to join conversation"
                        }
                    );

                }

            }
        );


        // Leave conversation
        socket.on(
            "leaveConversation",
            (conversationId: string) => {

                const roomName =
                    `conversation:${conversationId}`;


                socket.leave(roomName);


                console.log(
                    `Socket ${socket.id} left room ${roomName}`
                );

            }
        );


        // Disconnect
        socket.on(
            "disconnect",
            () => {

                console.log(
                    "Socket disconnected:",
                    socket.id
                );

            }
        );

    });


    return io;
};



// Get Socket.IO instance
export const getIO = () => {

    if (!io) {

        throw new Error(
            "Socket.IO has not been initialized"
        );

    }

    return io;
};