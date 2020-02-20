const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

let catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

let Cat = mongoose.model("Cat", catSchema);

// let george = new Cat({
//     name: "Mrs. Fluffy",
//     age: 5, 
//     temperament: "Sweet"
// });

// george.save(function(error, cat) {
//     if(error) console.log("Save error");
//     else {
//         console.log("New cat added to DB");
//         console.log(cat);
//     }
// });

Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland" 
}, function(error, cat) {
    if(error) {
        console.log(error);
    } else {
        console.log(cat);
    }
});

Cat.find({}, function(error, cats) {
    if(error) {
        console.log("Something went wrong");
        console.log(error);
    } else {
        console.log("All the cats");
        console.log(cats);
    }
});