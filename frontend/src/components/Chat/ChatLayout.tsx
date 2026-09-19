import ChatSidebar from "../Sidebar/ChatSidebar";
import "../../styles/Dashboard.css";
const ChatLayout = () => {
    return (
        <div className="chat-layout">

            <ChatSidebar />

            <main className="chat-main">

                <div className="welcome-content">

                    <div className="welcome-decoration">
                        🌿
                    </div>

                    <h1>
                        Welcome to Circle.
                    </h1>

                    <p>
                        Select a conversation or start a new
                        chat to begin.
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

        </div>
    );
};

export default ChatLayout;