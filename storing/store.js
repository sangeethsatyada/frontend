const connection = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 8089;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const form = fs.readFileSync("sign.html", "utf-8");

app.get("/", (req, res) => {
    res.send(form); // Use res.send instead of res.end
});

app.get("/login", (req, res) => {
    let form2 = fs.readFileSync("log1.html", "utf-8");
    res.send(form2); // Use res.send instead of res.end
});

app.post("/signup", (req, res) => {
    let fname = req.body.fname;
    let sname = req.body.sname;
    let phone = req.body.ph;
    let email = req.body.email;
    let pass = req.body.pass;

    console.log(fname);
    console.log(sname);
    console.log(phone);
    console.log(email);
    console.log(pass);

    let sql = "INSERT INTO REGISTER(FIRST_NAME, SECOND_NAME, PHONE, EMAIL, PASSWORD) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [fname, sname, phone, email, pass], (err) => {
        if (err) {
            console.error(err); // Log the error for debugging
            res.send("FAILED TO REGISTER");
        } else {
            res.send("SUCCESSFULLY REGISTERED ... NOW YOU CAN LOGIN");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`); // Corrected IP address
});
