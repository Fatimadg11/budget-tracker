import express from "express"
import mysql from "mysql2"

const app = express()


mysql.createConnection({
    database:"budget_app",
    password: "1234"
})
