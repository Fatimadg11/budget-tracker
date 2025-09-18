// import mysql from "mysql2";
// import express from "express";
// import cors from "cors";
// import bcrypt from "bcrypt";
// import {v4 as uuid } from "uuid";
// import path from "path";
// import { fileURLToPath } from "url";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "fatimadg",
//   password: "0978", // Replace with your password
//   database: "budget_app",
// });

// const app = express();
// app.use(express.urlencoded({extended:true}))
// app.use(cors())
// app.use(express.json())



// app.post("/signup",(req,res,)=>{
//     const {
//   firstname,
//   lastname,
//   email,
//   username,
//   password,
//   cpasssword
// }= req.body
//    filepath = path.join(__dirname,"signup")
//    console.log(filepath )
//     if(password !== cpasssword){
          
//           res.status(404).sendFile("")
//     }
//     const data = "insert into users (id,firstname,lastname,email,username,password1) values (?,?,?,?,?,?)"
//     db.query(data,[uuid().concat("-").substring(1,4),firstname,lastname,email,username,password1])
//     console.log(body)
//     res.json({message:"good to go"})

// })


// app.listen(3000,(e) => {
//   db.connect((e) => {
//     if (e) throw e;
//     console.log(" mysql connected successfully");
//   });

//   if (e) throw e;
//   console.log("Express connected successfully");

// });






// import mysql from "mysql2";
// import express from "express";
// import cors from "cors";
// import bcrypt from "bcrypt";
// import { v4 as uuid } from "uuid";

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "fatimadg",
//   password: "0978", 
//   database: "budget_app",
// });

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Signup route
// app.post("/signup", async (req, res) => {
//   const { email, username, password } = req.body;

//   if (!email || !username || !password) {
//     return res.status(400).json({ message: "Missing fields" });
//   }
//   //check is username and password is in the db ask chatgpt to help with the command if it exist then it should show username or password exist

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const userId = uuid();

//   const query =
//     "INSERT INTO users (id, email, username, passwords) VALUES (?, ?, ?, ?)";

//   db.query(query, [userId, email, username, hashedPassword], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "DB error" });
//     }
//     res.json({ message: "User registered successfully" });
//   });
// });

// //create a post for login route


// // Start server
// app.listen(3000, () => {
//   db.connect((e) => {
//     if (e) throw e;
//     console.log("✅ MySQL connected successfully");
//   });
//   console.log("✅ Express server running on port 3000");
// });


import mysql from "mysql2";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const db = mysql.createConnection({
  host: "localhost",
  user: "fatimadg",
  password: "0978",
  database: "budget_app",
});

const app = express();
app.use(cors());
app.use(express.json());

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

// Login route (placeholder)
app.post("/login", (req, res) => {
  res.json({ message: "Login route coming soon" });
});

// Start server
app.listen(3000, () => {
  db.connect((e) => {
    if (e) throw e;
    console.log("✅ MySQL connected successfully");
  });
  console.log("✅ Express server running on port 3000");
});
