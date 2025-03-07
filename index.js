import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import { connectDB } from './src/config/db.js';

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
