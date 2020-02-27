const express = require("express")
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// NEW - show form to new comment
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

// CREATE - new comment
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    req.flash("error", "Something went wrong")
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    // console.log(comment);
                    req.flash("success", "Successfully created comment")
                    res.redirect("/campgrounds/" + campground._id);
                }
            });            
        }
    })
});

// EDIT - show form to edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if(err) {
                    req.flash("error", "Something went wrong")
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
                }
            });
        }
    });
});

// UPDATE - update route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err || !updatedComment) {
            req.flash("error", "Something went wrong")
            res.redirect("back");
        } else {
            req.flash("success", "Successfully edited comment")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE - delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, deletedComment) => {
        if(err || !deletedComment) {
            req.flash("error", "Something went wrong")
            res.redirect("back");
        } else {
            req.flash("success", "Successfully deleted comment")
            res.redirect("back");
        }
    });
});


module.exports = router;