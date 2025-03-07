// src/models/userModel.js
export const getUsers = async (db) => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};
