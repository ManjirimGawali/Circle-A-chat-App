import { useEffect, useState } from "react";

import "../../../styles/Dashboard.css";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

import { getSocket } from "../../../services/socketService";

import {
    getMessages,
    sendMessage
} from "../../../services/messageService";

import type { SelectedConversation } from "../ChatLayout";


interface MessageSender {
    _id: string;
    username: string;
    profilePicture?: string;
}


interface Message {
    _id: string;
    conversation: string;
    sender: MessageSender;
    content: string;
    messageType: "text" | "image" | "file";
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}


interface ChatMainProps {
    conversation: SelectedConversation;
    onMessageSent: () => void;
}


const ChatMain = ({
    conversation,
    onMessageSent
}: ChatMainProps) => {

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // FETCH OLD MESSAGES
    // =====================================================

    const fetchMessages = async () => {

        try {

            setLoading(true);

            setError("");


            const data =
                await getMessages(
                    conversation.conversationId
                );


            setMessages(
                data.messages
            );


        } catch (error) {

            console.error(
                "Fetch messages error:",
                error
            );


            setError(
                "Failed to load messages"
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // FETCH MESSAGES WHEN CONVERSATION CHANGES
    // =====================================================

    useEffect(() => {

        fetchMessages();

    }, [
        conversation.conversationId
    ]);


    // =====================================================
    // JOIN / LEAVE SOCKET.IO ROOM
    // =====================================================

    useEffect(() => {

        const socket = getSocket();

        const conversationId =
            conversation.conversationId;


        console.log(
            "Joining conversation:",
            conversationId
        );


        socket.emit(
            "joinConversation",
            conversationId
        );


        return () => {

            console.log(
                "Leaving conversation:",
                conversationId
            );


            socket.emit(
                "leaveConversation",
                conversationId
            );

        };

    }, [
        conversation.conversationId
    ]);


    // =====================================================
    // LISTEN FOR REAL-TIME MESSAGES
    // =====================================================

    useEffect(() => {

        const socket = getSocket();


        const handleNewMessage = (
            newMessage: Message
        ) => {

            console.log(
                "New message received:",
                newMessage
            );


            // Make sure the message belongs
            // to the currently open conversation
            if (
                newMessage.conversation !==
                conversation.conversationId
            ) {

                return;

            }


            // Add message only if it
            // does not already exist
            setMessages(
                (previousMessages) => {

                    const alreadyExists =
                        previousMessages.some(
                            (message) =>
                                message._id ===
                                newMessage._id
                        );


                    if (alreadyExists) {

                        return previousMessages;

                    }


                    return [
                        ...previousMessages,
                        newMessage
                    ];

                }
            );

        };


        // Start listening for new messages
        socket.on(
            "newMessage",
            handleNewMessage
        );


        // Remove listener when component
        // is unmounted or conversation changes
        return () => {

            socket.off(
                "newMessage",
                handleNewMessage
            );

        };

    }, [
        conversation.conversationId
    ]);


    // =====================================================
    // SEND MESSAGE
    // =====================================================

    const handleSend = async (
        content: string
    ) => {

        try {

            const data =
                await sendMessage(
                    conversation.conversationId,
                    content
                );


            const newMessage =
                data.message;


            /*
             * Immediately add the new message
             * to the current chat.
             *
             * The duplicate check inside the
             * Socket.IO listener prevents the
             * same message from being added twice.
             */

            setMessages(
                (previousMessages) => {

                    const alreadyExists =
                        previousMessages.some(
                            (message) =>
                                message._id ===
                                newMessage._id
                        );


                    if (alreadyExists) {

                        return previousMessages;

                    }


                    return [
                        ...previousMessages,
                        newMessage
                    ];

                }
            );


            /*
             * Tell ChatLayout that a message
             * was successfully sent.
             *
             * ChatLayout can refresh the sidebar.
             */

            onMessageSent();


        } catch (error) {

            console.error(
                "Send message error:",
                error
            );

        }

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <main className="chat-main">


            {/* =====================================
                SELECTED USER HEADER
                ===================================== */}

            <ChatHeader

                name={
                    conversation.name
                }

                avatar={
                    conversation.avatar
                }

                isOnline={
                    conversation.isOnline
                }

            />


            {/* =====================================
                MESSAGE AREA
                ===================================== */}

            <div className="message-area">


                {loading && (

                    <div className="message-status">

                        Loading messages...

                    </div>

                )}


                {error && (

                    <div className="message-status error">

                        {error}

                    </div>

                )}


                {!loading &&
                    !error &&
                    messages.length === 0 && (

                        <div className="empty-chat">

                            <div className="empty-chat-icon">

                                🌿

                            </div>


                            <h2>

                                Start a conversation

                            </h2>


                            <p>

                                Send a message to{" "}

                                {conversation.name}

                            </p>

                        </div>

                    )}


                {!loading &&
                    !error &&
                    messages.length > 0 && (

                        <MessageList

                            messages={
                                messages
                            }

                        />

                    )}

            </div>


            {/* =====================================
                MESSAGE INPUT
                ===================================== */}

            <MessageInput

                onSend={
                    handleSend
                }

                disabled={
                    loading
                }

            />

        </main>

    );

};


export default ChatMain;