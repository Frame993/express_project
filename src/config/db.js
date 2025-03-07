import pkg from 'pg';  // Import the entire module
const { Pool } = pkg;  // Destructure the Pool class from the package

import dotenv from 'dotenv';
dotenv.config();

// Set up the connection pool to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DB_URI, // Database URI from .env
});

// Function to connect to the database
export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Export the query function for other files to use
export const query = (text, params) => pool.query(text, params);
