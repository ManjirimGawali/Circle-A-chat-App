import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import "../../styles/Dashboard.css";
interface User {
    _id: string;
    username: string;
    email: string;
    profilePicture?: string;
    status?: string;
    isOnline: boolean;
    lastSeen?: string;
}

interface NewChatModalProps {
    onClose: () => void;
}

const NewChatModal = ({
    onClose
}: NewChatModalProps) => {

    const [users, setUsers] =
        useState<User[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");
    const [searchTerm, setSearchTerm] =
    useState("");
    const fetchUsers = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await fetch(
                        "http://localhost:8000/api/users",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to fetch users"
                    );
                }

                setUsers(data.users);

            } catch (error) {

                setError(
                    "Unable to load users."
                );

            } finally {

                setLoading(false);

            }
    };

    useEffect(() => {
        fetchUsers();

    }, []);

const searchUsers = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:8000/api/users/search?q=${encodeURIComponent(searchTerm)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to search users"
            );
        }

        setUsers(data.users);

    } catch (error) {
        console.error("Search users error:", error);
    }
};

    useEffect(() => {

    if (!searchTerm.trim()) {
        fetchUsers ();
        return;
    }

    const timer = setTimeout(() => {

        searchUsers();

    }, 500);

    return () => {
        clearTimeout(timer);
    };

}, [searchTerm]);

    return (

        <div className="modal-overlay">

            <div className="new-chat-modal">

                {/* Header */}

                <div className="modal-header">

                    <h2>
                        Start a new chat
                    </h2>

                    <button
                        onClick={onClose}
                        className="close-modal"
                    >
                        <X size={22} />
                    </button>

                </div>


                {/* Search */}

                <div className="user-search">

                    <Search size={19} />

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                </div>


                {/* Users */}

                <div className="user-list">

                    {loading && (
                        <p className="modal-message">
                            Loading users...
                        </p>
                    )}

                    {error && (
                        <p className="modal-error">
                            {error}
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        users.map((user) => (

                            <div
                                className="user-item"
                                key={user._id}
                            >

                                <div className="user-avatar">
                                    {user.username
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div className="user-info">

                                    <h3>
                                        {user.username}
                                    </h3>

                                    <p>

                                        <span
                                            className={
                                                user.isOnline
                                                    ? "status-dot online"
                                                    : "status-dot"
                                            }
                                        />

                                        {user.isOnline
                                            ? "Online"
                                            : "Offline"}

                                    </p>

                                </div>

                                <button
                                    className="user-add-button"
                                >
                                    +
                                </button>

                            </div>

                        ))}

                </div>

            </div>

        </div>

    );
};

export default NewChatModal;