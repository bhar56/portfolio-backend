const express =require("express"); //requiring express and storing in express variable of const type
const app = express(); // express is a function storing in app variable of const type
const path = require("path");
const PORT = process.env.PORT || 3000;
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.static("public"));//using public folder
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
const fs=require("fs");



app.listen(PORT,()=>{  //to listen request using listen function of app(express)
     console.log("Server listening on "+PORT);
});


app.get("/",(req,res)=>{
    res.render("home.ejs")
})
app.post("/contact",(req,res)=>{
    let username= req.body.name
    let message= req.body.message
    let email=req.body.email
    console.log("username",username)
    console.log("email",email)
    console.log("message",message)
    res.send("form submitted successfully")
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
    
})
