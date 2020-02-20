const request = require("request");
const express = require("express");
const app = express();

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
});

app.get("/", function (req, res) {
    res.render("search.ejs");
});

app.get("/results", function(req, res) {
    let query = req.query.search;
    let url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    
    request(url, function(error, response, body) {
        if(error) {
            console.log("Something went Wrong.");
            console.log(error);
        }
        else if(response.statusCode == 200) {
            res.render("results.ejs", {body: JSON.parse(body)})
        }
    });
});
