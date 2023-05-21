const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

const conn = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "bbaf9c4c2b360a",
    port: "3306",
    password: "7aa1cbe0",
    database: "heroku_0a1e2996cbe47c5",
});
// mysql://bbaf9c4c2b360a:7aa1cbe0@us-cdbr-east-06.cleardb.net/heroku_0a1e2996cbe47c5?reconnect=true
// console.log(conn)

app.post("/add", (req, res) => {
    const sql = "INSERT INTO `users`(`Name`, `Email`, `Password`) VALUES (?)";

    let values = [req.body[0], req.body[1], req.body[2]]

    conn.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.post("/login", (req, res) => {
    const sql = "SELECT `Email`, `Password` FROM `users` WHERE `Email` = ? AND `Password` = ?";

    conn.query(sql, [req.body[0], req.body[1]], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.listen(port, () => {
    console.log("Listening")
})