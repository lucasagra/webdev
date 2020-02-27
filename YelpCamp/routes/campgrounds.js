const express = require("express")
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");
const Comment = require("../models/comment");

// INDEX - show all campgrounds
router.get("/", (req, res) => {
    // Get all data from DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// NEW - show form to add new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// CREATE - add new campground to db
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and create new mongoose object
    let newCampground = new Campground ({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    });
    // save to db
    newCampground.save((err, campground) => {
        if(err) {
            req.flash("error", "Something went wrong")
        } else {
            req.flash("success", "Successfully created campground")
            res.redirect("/campgrounds");
        }
    });

});

// SHOW - show campground by id
router.get("/:id", (req, res) => {
    let id = req.params.id;

    Campground.findById(id).populate("comments").exec((err, foundCampground) => {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT - show edit campground form
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE - campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            req.flash("error", "Something went wrong")
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully edited campground")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err, deletedCampground) => {
        if(err || !deletedCampground) {
            req.flash("error", "Something went wrong")
            res.redirect("/campgrounds");
        } else {
            Comment.deleteMany({_id: {$in: deletedCampground.comments}}, (err) => {
                if(err) {
                    console.log(err);
                }
                // console.log({$in: deletedCampground.comments});
            });
            
            req.flash("success", "Successfully deleted campground")
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;