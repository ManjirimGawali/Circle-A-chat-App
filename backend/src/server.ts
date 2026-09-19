import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';

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

// Middleware to parse JSON request bodies
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Express server is running!');
});

// Example API route
app.get('/api/users', (req, res) => {
    res.json({
        users: [
            { id: 1, name: 'John' },
            { id: 2, name: 'Alice' },
            { id: 3, name: 'Bob' }
        ]
    });
});

const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});