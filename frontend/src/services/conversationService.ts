export const createPrivateConversation = async (
    userId: string
) => {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:8000/api/conversations/private",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                userId
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to create conversation"
        );
    }

    return data;
};




export const getMyConversations = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:8000/api/conversations",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch conversations"
        );
    }

    return data;
};