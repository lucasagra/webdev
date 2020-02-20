let express = require("express");
let app = express();

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
});

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!")
});

app.get("/speak/:animal", function(req, res) {
    let animal = req.params.animal.toLowerCase();

    if(animal === "pig")
        res.send("The pig says 'Oink'");
    else if(animal === "cow")
        res.send("The cow says 'Moo'");
    else if(animal === "dog")
        res.send("The dog says 'Woof Woof'");
    else
        res.send("What does the fox say?")
});

app.get("/repeat/:word/:count", function(req, res) {
    let word = req.params.word;
    let count = Number(req.params.count);
    let str = "";
    for(let i = 0; i < count; i++) {
        str += word + " ";
    }
    res.send(str);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?")
});