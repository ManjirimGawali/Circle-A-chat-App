export const getMessages = async (
    conversationId: string
) => {

    const token =
        localStorage.getItem("token");


    const response = await fetch(
        `http://localhost:8000/api/messages/${conversationId}`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to fetch messages"
        );

    }


    return data;
};


export const sendMessage = async (
    conversationId: string,
    content: string
) => {

    const token =
        localStorage.getItem("token");


    const response = await fetch(
        "http://localhost:8000/api/messages",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                conversationId,
                content,
                messageType: "text"
            })
        }
    );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to send message"
        );

    }


    return data;
};