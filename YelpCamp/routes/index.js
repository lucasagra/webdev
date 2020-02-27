const express = require("express")
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//root route
router.get("/", (req, res) => {
    res.render("landing")
});

// show register form
router.get("/register", (req, res) => {
    res.render("register");
});

// sign up logic
router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// SHOW - login form
router.get("/login", (req, res) => {
    res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successFlash: 'Welcome!',
        successRedirect: "/campgrounds",
        failureFlash: 'Invalid username or password',
        failureRedirect: "/login"
    }), (req, res) => {});

// logout logic
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/campgrounds");
});

module.exports = router;