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
