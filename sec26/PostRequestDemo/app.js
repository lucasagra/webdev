let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

let friends = ["Lucas", "Pedro", "Bernardo", "Paulo"];

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
});

app.get("/", function(req, res) {
    // res.send("Welcome to the homepage");
    res.render("home.ejs");
});

app.post("/addfriend", function(req, res) {
    friends.push(req.body.newfriend);
    res.redirect("/friends");
})

app.get("/friends", function(req, res) {
    res.render("friends.ejs", {friends: friends});
});