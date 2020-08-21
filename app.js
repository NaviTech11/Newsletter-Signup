const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
 
require("dotenv").config(); 

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
    
});

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const apiKey = process.env.API_KEY;
    const audienceId = process.env.AUDIENCE_ID;
    const server = process.env.SERVER;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}`

    const options = {
        method: "POST",
        auth: `ivan1:${apiKey}`
    }

    const request = https.request(url, options, (response) => {
        response.on("data", (data) =>{
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});




app.listen(port, () => {
    console.log("App listening");
});



