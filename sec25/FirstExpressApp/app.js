let express = require("express");
let app = express();

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
  });

app.get("/", function(req, res) {
    res.send("Hi there!");
});

app.get("/bye", function(req, res) {
    res.send("Goodbye");
});

app.get("/r/:subredditName", function(req, res) {
    let subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
})

app.get("*", function(req, res) {
    res.send("Anything");
});

