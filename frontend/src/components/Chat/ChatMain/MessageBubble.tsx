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

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble = ({
    message
}: MessageBubbleProps) => {

    return (
        <div className="message-bubble">

            <p>
                {message.content}
            </p>

        </div>
    );
};

export default MessageBubble;