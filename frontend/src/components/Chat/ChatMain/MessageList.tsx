import MessageBubble from "./MessageBubble";


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


interface MessageListProps {
    messages: Message[];
}


const MessageList = ({
    messages
}: MessageListProps) => {

    return (
        <div className="message-list">

            {messages.map((message) => (

                <MessageBubble
                    key={message._id}
                    message={message}
                />

            ))}

        </div>
    );
};


export default MessageList;