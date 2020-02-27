const mongoose = require("mongoose");

const Post = require("./models/post");
const User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/blog_demo_ref", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});


// // Find all posts for 1 user
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });


Post.create({
    title: "How to cook the best burger PART 4",
    content: "BURGUER BUGGUER BURGUER"
}, (err, post) => {
    User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
        if(err) console.log(err);
        else {
            foundUser.posts.push(post);
            foundUser.save((err2, data) => {
                if(err2) console.log(err2);
                else {
                    console.log(data);
                }
            });
        }
    });
});


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

