interface ChatHeaderProps {
    name: string;
    avatar: string;
    isOnline: boolean;
}

const ChatHeader = ({
    name,
    avatar,
    isOnline
}: ChatHeaderProps) => {

    return (
        <header className="chat-header">

            <div className="chat-header-avatar">
                {avatar}
            </div>

            <div className="chat-header-info">

                <h3>
                    {name}
                </h3>

                <span
                    className={
                        isOnline
                            ? "online-status"
                            : "offline-status"
                    }
                >
                    {isOnline
                        ? "Online"
                        : "Offline"}
                </span>

            </div>

        </header>
    );
};

export default ChatHeader;