const Campground = require("../models/campground");
const Comment = require("../models/comment")

module.exports = {

    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to be logged in");
        res.redirect("/login");
    },

    checkCommentOwnership: function(req, res, next) {
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if(err || !foundComment) {
                    req.flash("error", "Comment not found")
                    res.redirect("back");
                } else {
                    if(foundComment.author.id.equals(req.user._id)) {
                        return next();
                    } else {
                        req.flash("You do not have permission");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in");
            res.redirect("back");
        }
    },

    checkCampgroundOwnership: function(req, res, next) {
        if(req.isAuthenticated()) {
            Campground.findById(req.params.id, (err, foundCampground) => {
                if(err || !foundCampground) {
                    req.flash("error", "Campground not found")
                    res.redirect("back");
                } else {
                    // does user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)) {
                        return next();
                    } else {
                        req.flash("error", "You do not have permission")
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in")
            res.redirect("back");
        }
    }

}