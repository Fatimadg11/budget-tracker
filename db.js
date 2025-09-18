import mysql from "mysql2";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "fatimadg",
  password: "0978",
  database: "budget_app",
});

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Multer setup for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // save to /uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 🔹 Serve uploads as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================
// SIGNUP
// ============================
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuid();

  const query =
    "INSERT INTO users (id, email, username, passwords) VALUES (?, ?, ?, ?)";

  db.query(query, [userId, email, username, hashedPassword], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error" });
    }
    res.json({ message: "User registered successfully", userId });
  });
});

// ============================
// LOGIN
// ============================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];

    // ✅ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.passwords);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "✅ Login successful",
      userId: user.id,
      username: user.username,
      photo: user.photo || null,
    });
  });
});
// ============================
// UPDATE PASSWORD
// ============================
app.post("/update-password", async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // 1. Find user
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    // 2. Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.passwords);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Old password is incorrect" });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Save to DB
    const updateQuery = "UPDATE users SET passwords = ? WHERE id = ?";
    db.query(updateQuery, [hashedPassword, userId], (err, result) => {
      if (err) {
        console.error("DB update error:", err);
        return res.status(500).json({ message: "DB update failed" });
      }
      res.json({ message: "✅ Password updated successfully" });
    });
  });
});



// ============================
// PHOTO UPLOAD
// ============================
app.post("/upload-photo/:userId", upload.single("photo"), (req, res) => {
  const { userId } = req.params;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const photoUrl = `/uploads/${req.file.filename}`;

  // ✅ Save photo path to DB
  const query = "UPDATE users SET photo = ? WHERE id = ?";
  db.query(query, [photoUrl, userId], (err) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ success: false, message: "DB update error" });
    }
    res.json({ success: true, url: photoUrl });
  });
});

// ============================
// SERVER START
// ============================
app.listen(3000, () => {
  db.connect((e) => {
    if (e) throw e;
    console.log("✅ MySQL connected successfully");
  });
  console.log("✅ Express server running on port 3000");
});
