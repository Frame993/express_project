require("dotenv").config();
const { Pool } = require("pg");

import { app } from "../../index.js";
import { bcrypt } from "bcryptjs";

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Get all users (for testing)
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username, role FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Database error");
  }
});

// Register a new user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to DB
    const result = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id",
      [username, hashedPassword, "user"]
    );

    res
      .status(201)
      .json({ message: "User registered", userId: result.rows[0].id });
  } catch (error) {
    res.status(500).send("Database error");
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0)
      return res.status(400).send("Invalid credentials");

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(400).send("Invalid credentials");

    // const token = user.password;
    // console.log(token);

    res.send("Login successful");
    // res.json({token});
  } catch (error) {
    res.status(500).send("Database error");
  }
});

// Delete existing user
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [
      userId,
    ]);
    if (result.rowCount === 0) return res.status(404).send("User not found");
    res.send("User deleted");
  } catch (error) {
    res.status(500).send("Database error");
  }
});
