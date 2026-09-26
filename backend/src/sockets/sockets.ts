//STEP 4 — Create the initial Socket.IO server

import {Server} from "socket.io"
import type {Server as HttpServer} from "http";
export const initializeSocket=(
    httpServer:HttpServer
)=>{
    const io=new Server(httpServer,
        {
            cors:{
                origin:process.env.FRONTEND_URL
            }
        }
    );
    io.on("connection",(socket)=>{
        console.log("Socket Connected : ",
        socket.id);

        socket.on("disconnect",()=>{
            console.log("Socket disconnected :",
                socket.id
            )
        })
    })
    return io;
}