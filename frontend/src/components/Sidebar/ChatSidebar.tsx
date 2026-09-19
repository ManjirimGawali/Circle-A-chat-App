import { Plus, Search } from "lucide-react";
import { useState } from "react";
import "../../styles/Dashboard.css";
import ConversationItem from "./ConversationItem";
import NewChatModal from "../Users/NewChatModel";

const ChatSidebar = () => {

    const [showNewChat, setShowNewChat] =
        useState(false);

    return (
        <>
            <aside className="chat-sidebar">

                {/* Logo */}
                <div className="sidebar-header">

                    <div>
                        <h1>Circle.</h1>

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

                    <ConversationItem
                        name="Tanya"
                        message="That sounds perfect! ✨"
                        time="2:30 PM"
                        avatar="T"
                        unread={2}
                    />

                    <ConversationItem
                        name="College Buddies"
                        message="Rohan: See you tomorrow!"
                        time="1:12 PM"
                        avatar="C"
                    />

                    <ConversationItem
                        name="Aarav"
                        message="Sent a photo"
                        time="11:45 AM"
                        avatar="A"
                    />

                    <ConversationItem
                        name="Neha"
                        message="Haha true 😄"
                        time="Yesterday"
                        avatar="N"
                    />

                    <ConversationItem
                        name="Travel Gang"
                        message="You: Can't wait! 🏔️"
                        time="Yesterday"
                        avatar="T"
                    />

                    <ConversationItem
                        name="Design Team"
                        message="Ishita: Updated the file"
                        time="Mon"
                        avatar="D"
                    />

                    <ConversationItem
                        name="Family Group"
                        message="Rohan: Take care! ❤️"
                        time="Mon"
                        avatar="F"
                    />

                    <ConversationItem
                        name="Mindful Talks"
                        message="You: This is so helpful"
                        time="Sun"
                        avatar="M"
                    />

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

                    <span>♡</span>

                </div>

            </aside>


            {/* New Chat Modal */}

            {showNewChat && (
                <NewChatModal
                    onClose={() =>
                        setShowNewChat(false)
                    }
                />
            )}

        </>
    );
};

export default ChatSidebar;