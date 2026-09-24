import { useEffect, useState } from "react";

import "../../../styles/Dashboard.css";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

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


    /*
     * Fetch messages whenever
     * the selected conversation changes.
     */
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


    useEffect(() => {

        fetchMessages();

    }, [
        conversation.conversationId
    ]);


    /*
     * Send a new message.
     */
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
             */
            setMessages(
                (previousMessages) => [
                    ...previousMessages,
                    newMessage
                ]
            );


            /*
             * Tell ChatLayout that a message
             * was successfully sent.
             *
             * ChatLayout will then refresh
             * the sidebar.
             */
            onMessageSent();


        } catch (error) {

            console.error(
                "Send message error:",
                error
            );

        }

    };


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