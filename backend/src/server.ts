import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from "./routes/message.routes.js";
import conversationRoutes from './routes/conversation.routes.js';
dotenv.config();

// Database
connectDB();

const app = express();

// Middleware to enable CORS for requests from the frontend
app.use(
    cors({
        origin: process.env.FRONTEND_URL
    })
);


// Test route
app.get('/', (req, res) => {
    res.send('Express server is running!');
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

//to get all users
app.use('/api/users',userRoutes);

// Conversation routes
app.use("/api/conversations",conversationRoutes)

//Message routes
app.use(
    "/api/messages",
    messageRoutes
);

const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});