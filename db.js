import mysql from "mysql2";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "192.168.137.1",
  user: "fatimadg",
  password: "0978",
  database: "budget_app",
});

const app = express();
app.use(cors({})); // adjust origin to your frontend
app.use(express.json());

app.use(
  session({
    secret: "supersecret", // change this in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // true only with HTTPS
  })
);

// ==========================
// SIGNUP
// ==========================
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // ✅ Check if user already exists
  const checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(checkQuery, [username, email], async (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // ✅ Hash password and insert
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuid();

    const insertQuery =
      "INSERT INTO users (id, email, username, passwords) VALUES (?, ?, ?, ?)";
    db.query(insertQuery, [userId, email, username, hashedPassword], (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ message: "DB insert error" });
      }
      res.json({ message: "User registered successfully" });
    });
  });
});

// ==========================
// LOGIN
// ==========================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const command = "SELECT * FROM users WHERE username = ?";
  db.query(command, [username], async (error, result) => {
    if (error) {
      console.error("DB error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, result[0].passwords);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Save user in session
    req.session.userId = result[0].id;

    res.json({
      id: result[0].id,
      username: result[0].username,
      email: result[0].email,
      message: "Login successful",
    });
  });
});

// ==========================
// LOGOUT
// ==========================
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// ==========================
// SERVER START
// ==========================
app.listen(3000, () => {
  db.connect((e) => {
    if (e) throw e;
    console.log("✅ MySQL connected successfully");
  });
  console.log("✅ Express server running on port 3000");
});
