// src/services/userService.js
import { query } from '../config/db.js'; // Use query from db.js, not userModel.js

export const getAllUsers = async () => {
  try {
    const result = await query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};
