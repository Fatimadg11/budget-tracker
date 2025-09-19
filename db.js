import mysql from "mysql2";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const Aport = process.env.port

// ✅ MySQL connection
const db = mysql.createConnection({
  host: Aport,
  user: "fatimadg",
  password: "0978",
  database: "budget_app",
});

const app = express();
app.use(cors()); // adjust origin to your frontend
app.use(express.json());

app.use(
  session({
    secret: "supersecret", // change this in production
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,
     maxAge: 1000 * 60 * 60,
     sameSite: "lax"

     }, // true only with HTTPS
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
      return res.status(400).json({ error: "Invalid credentials here" });
    }
    
    // ✅ Save user in session
    req.session.userId = result[0].id;
    console.log("here g ", req.session.userId )

    res.json({
      id: result[0].id,
      username: result[0].username,
      email: result[0].email,
      message: "Login successful",
    });
  });
});

// ==========================
// CHANGE PASSWORD
// ==========================

app.post("/profile/changePassword", async (req, res) => {
  console.log(req.session.userId)
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const { oldPassword, newPassword } = req.body;
  console.log(oldPassword,newPassword)

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const query = "SELECT passwords FROM users WHERE id = ?";
  db.query(query, [req.session.userId], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, results[0].passwords);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    const hashedNew = await bcrypt.hash(newPassword, 10);

    const update = "UPDATE users SET passwords = ? WHERE id = ?";
    db.query(update, [hashedNew, req.session.userId], (err) => {
      if (err) return res.status(500).json({ message: "Update error" });
      res.json({ message: "Password updated successfully" });
    });
  });
});

// ==========================
// LOGOUT
// ==========================
app.post("/logout", (req, res) => {
 req.session.userId  = null

  res.json({ message: "Logged out successfully" });
});



// app.put("")

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


// ==========================
// UPLOAD PROFILE PHOTO
// ==========================
// app.post("/profile/photo", upload.single("photo"), (req, res) => {
//   if (!req.session.userId) {
//     return res.status(401).json({ message: "Not logged in" });
//   }

//   const photoPath = `/uploads/${req.file.filename}`;

//   const updateQuery = "UPDATE users SET profile_photo = ? WHERE id = ?";
//   db.query(updateQuery, [photoPath, req.session.userId], (err) => {
//     if (err) {
//       console.error("DB error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     res.json({ message: "Profile photo updated", photo: photoPath });
//   });
// });

// // ✅ Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// (d) Change Password Endpoint

// Add this below your login/logout routes:



