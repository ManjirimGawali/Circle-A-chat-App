
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

let socket: Socket | null = null;

export const getSocket = (): Socket => {

    if (!socket) {

        const token =
            localStorage.getItem("token");

        socket = io(
            SOCKET_URL,
            {
                auth: {
                    token
                }
            }
        );

    }

    return socket;
};

export const disconnectSocket = () => {

    if (socket) {

        socket.disconnect();

        socket = null;

    }

};