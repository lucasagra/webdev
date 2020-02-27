const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/blog_demo", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// POST - title, content

let postSchema = new mongoose.Schema({
    title: String,
    content: String
});

let Post = mongoose.model("Post", postSchema);

// USER - email, name

let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

let User = mongoose.model("User", userSchema);


// let newUser = new User({
//     email: "potter@hogworts.edu",
//     name: "Harry Potter"
// });

// newUser.posts.push(new Post({
//     title: "How to bre a polyjuice potion",
//     content: "Just kidding. Go to potions class to leran it!"
// }));

// newUser.save((err, user) => {
//     if(err) console.log(err);
//     else {
//         console.log(user);
//     }
// });


// let newPost = new Post({
//     title: "Reflections of Apple",
//     content: "The're delicious"
// });

// newPost.save((err, user) => {
//     if(err) console.log(err);
//     else {
//         console.log(user);
//     }
// });

User.findOne({name: "Harry Potter"}, (err, user) => {
    if(err) console.log(err);
    else {
        user.posts.push({
            title: "3 Things I really hatee",
            content: "Voldermort. Voldermort. Voldermort"
        });
        user.save((err2, user) => {
            if(err2) console.log(err2);
            else {
                console.log(user);
            }
        });
    }
});