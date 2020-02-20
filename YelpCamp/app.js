const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/yelpcamp", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.listen(3000, function() { 
    console.log('YelpCamp server started...'); 
});


// Schema setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Routes
app.get("/", (req, res) => {
    res.render("landing")
});

app.get("/campgrounds", (req, res) => {
    // Get all data from DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.post("/campgrounds", (req, res) => {
    // get data from form and create new mongoose object
    let newCampground = new Campground ({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    });
    // save to db
    newCampground.save((err, campground) => {
        if(err) {
            console.log(err);
        } else {
            console.log("NEW CAMPGROUND ADDED TO DB");
            console.log(campground);
            // redirect back to campground page
            res.redirect("/campgrounds");
        }
    });

});

app.get("/campgrounds/:id", (req, res) => {
    let id = req.params.id;

    Campground.findById(id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});