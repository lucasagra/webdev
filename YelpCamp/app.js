const express        = require("express");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const passport       = require("passport");
const expressSession = require("express-session");
const LocalStrategy  = require("passport-local");
const methodOverride = require("method-override");
const flash          = require("connect-flash");

const commentRoutes     = require("./routes/comments");
const campgroundsRoutes = require("./routes/campgrounds");
const indexRoutes       = require("./routes/index");

const app = express();

// const seedDB = require("./seeds");
// seedDB();

// MODELS
const Campground = require("./models/campground");
const Comment    = require("./models/comment");
const User       = require("./models/user");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

app.set("view engine", "ejs");
app.set("port", ( process.env.PORT || 3000 ));

let url = process.env.DATABASEURL || "mongodb://localhost:27017/yelpcamp";
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log("Connected to DB...");
}).catch(err => {
    console.log("ERROR: ", err.message);
});

// PASSPORT CONFIG
app.use(expressSession({
    secret: "I like icecream",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// fix req.user to everypage (call this middleware to every route)
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ROUTES   
app.use(indexRoutes);
app.use("/campgrounds/", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// SERVER
app.listen(app.get("port"), function() { 
    console.log("YelpCamp server started..."); 
});