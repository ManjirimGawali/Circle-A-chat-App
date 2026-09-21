import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

import "../../styles/Dashboard.css";

import ConversationItem from "./ConversationItem";
import NewChatModal from "../Users/NewChatModel";

import { getMyConversations } from "../../services/conversationService";


interface ConversationUser {
    _id: string;
    username: string;
    email: string;
    profilePicture?: string;
    status?: string;
    isOnline: boolean;
    lastSeen?: string;
}


interface LastMessage {
    _id: string;
    content: string;
    sender: string;
    messageType: "text" | "image" | "file";
    isRead: boolean;
    createdAt: string;
}


interface Conversation {
    _id: string;
    participants: ConversationUser[];

    isGroup: boolean;
    groupName: string;

    groupAdmin: string | null;

    lastMessage: LastMessage | null;

    createdAt: string;
    updatedAt: string;
}


const ChatSidebar = () => {

    const [showNewChat, setShowNewChat] =
        useState(false);

    const [conversations, setConversations] =
        useState<Conversation[]>([]);

    const [loadingConversations, setLoadingConversations] =
        useState(true);


    const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
    );
    console.log("Current User:", currentUser);


    const fetchConversations = async () => {

        try {

            setLoadingConversations(true);

            const data =
                await getMyConversations();

            setConversations(
                data.conversations
            );

        } catch (error) {

            console.error(
                "Fetch conversations error:",
                error
            );

        } finally {

            setLoadingConversations(false);

        }

    };


    useEffect(() => {

        fetchConversations();

    }, []);


    const getOtherParticipant = (
    conversation: Conversation
) => {

    console.log("Current User ID:", currentUser.id);

    console.log(
        "Conversation Participants:",
        conversation.participants
    );

    conversation.participants.forEach(
        (participant) => {
            console.log(
                "Participant:",
                participant.username,
                "ID:",
                participant._id,
                "Is Current User:",
                String(participant._id) ===
                    String(currentUser.id)
            );
        }
    );

    const otherParticipant =
        conversation.participants.find(
            (participant) =>
                String(participant._id) !==
                String(currentUser.id)
        );

    console.log(
        "OTHER PARTICIPANT:",
        otherParticipant
    );

    return otherParticipant;
};

    return (
        <>
            <aside className="chat-sidebar">

                {/* Logo */}

                <div className="sidebar-header">

                    <div>

                        <h1>
                            Circle.
                        </h1>

                        <span>
                            A WARMER INTERNET
                        </span>

                    </div>


                    <div className="profile-avatar">

                        N

                        <span className="online-dot" />

                    </div>

                </div>


                {/* Search + Add */}

                <div className="sidebar-actions">

                    <div className="conversation-search">

                        <Search size={19} />

                        <input
                            type="text"
                            placeholder="Search conversations..."
                        />

                    </div>


                    <button
                        className="new-chat-button"
                        onClick={() =>
                            setShowNewChat(true)
                        }
                    >

                        <Plus size={26} />

                    </button>

                </div>


                {/* Conversations */}

                <div className="conversation-list">

                    {loadingConversations && (
                        <p>
                            Loading conversations...
                        </p>
                    )}


                    {!loadingConversations &&
                        conversations.length === 0 && (
                            <p>
                                No conversations yet.
                            </p>
                        )}


                    {!loadingConversations &&
                        conversations.map(
                            (conversation) => {

                                const otherUser =
                                    getOtherParticipant(
                                        conversation
                                    );


                                if (!otherUser) {
                                    return null;
                                }


                                return (
                                    <ConversationItem
                                        key={
                                            conversation._id
                                        }

                                        name={
                                            conversation.isGroup
                                                ? conversation.groupName
                                                : otherUser.username
                                        }

                                        message={
                                            conversation.lastMessage
                                                ? conversation.lastMessage.content
                                                : "No messages yet"
                                        }

                                        time={
                                            new Date(
                                                conversation.updatedAt
                                            ).toLocaleTimeString(
                                                [],
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                }
                                            )
                                        }

                                        avatar={
                                            conversation.isGroup
                                                ? "G"
                                                : otherUser.username
                                                    .charAt(0)
                                                    .toUpperCase()
                                        }
                                    />
                                );

                            }
                        )}

                </div>


                {/* Bottom decoration */}

                <div className="sidebar-footer">

                    <div className="footer-plant">
                        🌿
                    </div>

                    <p>
                        Good
                        <br />
                        Chats
                        <br />
                        Brighter
                        <br />
                        Days
                    </p>

                    <span>
                        ♡
                    </span>

                </div>

            </aside>


            {/* New Chat Modal */}

            {showNewChat && (
                <NewChatModal
                    onClose={() =>
                        setShowNewChat(false)
                    }
                    onConversationCreated={
            fetchConversations
        }
                />
            )}

        </>
    );
};


export default ChatSidebar;