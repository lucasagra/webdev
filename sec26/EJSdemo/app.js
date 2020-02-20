let express = require("express");
let app = express();

app.use(express.static("public"));

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
});

app.get("/", function(req, res) {
    // res.send("Welcome to the homepage");
    res.render("home.ejs");
});


app.get("/cage/:adjective", function(req, res) {
    // res.send("Welcome to the homepage");
    res.render("cage.ejs", {adj: req.params.adjective});
});

app.get("/posts", function(req, res) {
    let posts = [
        {title: "Post1", author: "Susy"},
        {title: "Post2", author: "Pedro"},
        {title: "Post3", author: "Lucas"}
    ];

    res.render("posts.ejs", {posts: posts});
})
