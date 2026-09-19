import "../../styles/Dashboard.css";

interface ConversationItemProps {
    name: string;
    message: string;
    time: string;
    avatar: string;
    unread?: number;
}

const ConversationItem = ({
    name,
    message,
    time,
    avatar,
    unread
}: ConversationItemProps) => {

    return (
        <div className="conversation-item">

            <div className="conversation-avatar">
                {avatar}
            </div>

            <div className="conversation-info">

                <div className="conversation-top">

                    <h3>
                        {name}
                    </h3>

                    <span>
                        {time}
                    </span>

                </div>

                <div className="conversation-bottom">

                    <p>
                        {message}
                    </p>

                    {unread && (
                        <span className="unread-count">
                            {unread}
                        </span>
                    )}

                </div>

            </div>

        </div>
    );
};

export default ConversationItem;