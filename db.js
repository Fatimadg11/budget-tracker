import mysql from "mysql2";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import {v4 as uuid } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer"
import bodyParser from "body-parser"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = mysql.createConnection({
  host: "localhost",
  user: "fatimadg",
  password: "0978", // Replace with your password
  database: "budget_app",
});

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
//dont forget app.use


app.post("/signup",(req,res,)=>{
    const {
  firstname,
  lastname,
  email,
  username,
  password,
  cpasssword
}= req.body
   filepath = path.join(__dirname,"signup")
   console.log(filepath )
    if(password !== cpasssword){
          
          res.status(404).sendFile("")
    }
    const data = "insert into users (id,firstname,lastname,email,username,password1) values (?,?,?,?,?,?)"
    db.query(data,[uuid().concat("-").substring(1,4),firstname,lastname,email,username,password1])
    console.log(body)
    res.json({message:"good to go"})

})


app.listen(3000,(e) => {
  db.connect((e) => {
    if (e) throw e;
    console.log(" mysql connected successfully");
  });

  if (e) throw e;
  console.log("Express connected successfully");

});


//endpoint for email




let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com",
    pass: "YOUR_APP_PASSWORD", // use Gmail App Password, not your real password
  },
});

app.post("/send-otp", (req, res) => {
  const { email, otp } = req.body;

  let mailOptions = {
    from: "YOUR_EMAIL@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email: " + error.toString());
    }
    res.status(200).send("OTP sent: " + info.response);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});