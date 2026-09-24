import { useState } from "react";


interface MessageInputProps {
    onSend: (
        content: string
    ) => void;

    disabled?: boolean;
}


const MessageInput = ({
    onSend,
    disabled = false
}: MessageInputProps) => {

    const [content, setContent] =
        useState("");


    const handleSend = () => {

        const trimmedContent =
            content.trim();


        if (!trimmedContent) {
            return;
        }


        onSend(trimmedContent);

        setContent("");

    };


    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            handleSend();

        }

    };


    return (
        <div className="message-input-container">

            <input
                type="text"
                value={content}
                onChange={(event) =>
                    setContent(
                        event.target.value
                    )
                }
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={disabled}
            />


            <button
                type="button"
                onClick={handleSend}
                disabled={
                    disabled ||
                    !content.trim()
                }
            >
                Send
            </button>

        </div>
    );
};


export default MessageInput;