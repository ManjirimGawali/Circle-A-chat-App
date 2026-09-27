
import "../../../styles/Dashboard.css";
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


// Get logged-in user's ID from JWT
const getLoggedInUserId = (): string | null => {

    const token =
        localStorage.getItem("token");


    if (!token) {
        return null;
    }


    try {

        const payload =
            token.split(".")[1];


        const decodedPayload =
            JSON.parse(
                atob(
                    payload
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );


        return decodedPayload.userId || null;

    } catch (error) {

        console.error(
            "Failed to decode token:",
            error
        );

        return null;

    }

};


const MessageBubble = ({
    message
}: MessageBubbleProps) => {

    const loggedInUserId =
        getLoggedInUserId();


    const isOwnMessage =
        message.sender._id ===
        loggedInUserId;


    return (

        <div
            className={`message-bubble ${
                isOwnMessage
                    ? "own-message"
                    : "other-message"
            }`}
        >

            <p>
                {message.content}
            </p>

        </div>

    );

};


export default MessageBubble;