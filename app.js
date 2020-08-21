const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
    
});

app.post("/", (req, res) => {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    console.log(firstName, lastName, email);
});





app.listen(port, () => {
    console.log("App listening");
});

