import mysql from "mysql2";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import session from "express-session"
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const db = mysql.createConnection({
  host: "localhost",
  user: "fatimadg",
  password: "0978",
  database: "budget_app",
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
  secret: "supersecret",       // change in real app
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }    // true only if HTTPS
}));

// Signup route
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // ✅ Check if username or password already exists
  const checkQuery =
    "SELECT * FROM users WHERE username = ? OR passwords = ?";
  db.query(checkQuery, [username, password], async (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or password already exists" });
    }

    // ✅ If not exist, hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuid();

    const insertQuery =
      "INSERT INTO users (id, email, username, passwords) VALUES (?, ?, ?, ?)";

    db.query(
      insertQuery,
      [userId, email, username, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ message: "DB insert error" });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  });
});



app.post("/login", async (req,res)=>{
const user = req.body
console.log(user)
const command = "select * from users where username = ?"
 
 db.query(command, [user.username],(error,result)=>{
   if (error) throw error
   if(result[0]?.id){
       const comparepass = bcrypt.compareSync(user.password,result[0].passwords)
       if(comparepass){
        const user = result[0]?.id
          req.session.userid = user
          res.json(result[0])
       }else{
          res.json({error:"authentication failed"})
       }
   }

   
  
})

})

// Start server
app.listen(3000, () => {
  db.connect((e) => {
    if (e) throw e;
    console.log("✅ MySQL connected successfully");
  });
  console.log("✅ Express server running on port 3000");
});
