import { useState } from "react";

import ChatSidebar from "../Sidebar/ChatSidebar";
import ChatMain from "./ChatMain/ChatMain";

import "../../styles/Dashboard.css";


export interface SelectedConversation {
    conversationId: string;
    name: string;
    avatar: string;
    isOnline: boolean;
}


const ChatLayout = () => {

    const [
        selectedConversation,
        setSelectedConversation
    ] = useState<SelectedConversation | null>(null);


    const [
        sidebarRefresh,
        setSidebarRefresh
    ] = useState(0);


    const handleSelectConversation = (
        conversation: SelectedConversation
    ) => {

        setSelectedConversation(
            conversation
        );

    };


    const handleMessageSent = () => {

        setSidebarRefresh(
            (previous) =>
                previous + 1
        );

    };


    return (
        <div className="chat-layout">

            <ChatSidebar
                onSelectConversation={
                    handleSelectConversation
                }

                refreshTrigger={
                    sidebarRefresh
                }
            />


            {selectedConversation ? (

                <ChatMain
                    conversation={
                        selectedConversation
                    }

                    onMessageSent={
                        handleMessageSent
                    }
                />

            ) : (

                <main className="chat-main">

                    <div className="welcome-content">

                        <div className="welcome-decoration">
                            🌿
                        </div>

                        <h1>
                            Welcome to Circle.
                        </h1>

                        <p>
                            Select a conversation or start
                            a new chat to begin.
                        </p>

                        <span className="welcome-quote">
                            “Good Chats
                            <br />
                            Brighter Days”
                        </span>

                        <span className="welcome-heart">
                            ♡
                        </span>

                    </div>

                </main>

            )}

        </div>
    );
};


export default ChatLayout;