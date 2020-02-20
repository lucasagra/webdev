const express        = require("express");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

const app = express();

// APP CONFIG

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE / Model config

mongoose.connect("mongodb://localhost:27017/restful_blog", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);

// ROUTES

app.get("/", (req, res) => {
    res.redirect("/blogs");
});


app.get("/blogs", (req, res) => {
    Blog.find({}, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.render("index", {blogs: data});
        }
    })
});


app.get("/blogs/new", (req, res) => {
    res.render("new");
});

app.post("/blogs", (req, res) => {

    // Remove malicious html code
    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.create(req.body.blog, (err, blog) => {
        if(err) {
            console.log(err);
        } else {
            console.log("NEW BLOG ADDED");
            console.log(blog);
            res.redirect("/blogs");
        }
    })
})

app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            console.log(err); 
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});

app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            console.log(err); 
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    })
});

app.put("/blogs/:id", (req, res) => {
    // Remove malicious html code
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            console.log("error updating");
            res.redirect("/blogs");
        } else {
            console.log("Post updated");
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log("error deleting");
            res.redirect("/blogs/" + req.params.id);
        } else {
            console.log("Post deleted");
            res.redirect("/blogs");
        }
    });
});

app.listen(3000, function() { 
    console.log('Blog server started...'); 
});