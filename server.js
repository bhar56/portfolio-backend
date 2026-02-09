const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.post("/contact", (req, res) => {

    console.log("Contact route hit");   // Debug

    let username = req.body.name;
    let email    = req.body.email;
    let message  = req.body.message;

    console.log("username:", username);
    console.log("email:", email);
    console.log("message:", message);

    let formData =
        "Name: " + username + "\n" +
        "Email: " + email + "\n" +
        "Message: " + message + "\n" +
        "-----------------------\n";

    fs.appendFile("contacts.txt", formData, function(err) {

        if (err) {
            console.log(err);
            res.send("Error saving data");
        } 
        else {
            res.send("Form submitted & saved successfully!");
        }

    });

});

// Server
app.listen(PORT, () => {
    console.log("Server listening on " + PORT);
});


