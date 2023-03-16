const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kumarjatin13905:bySmIGZ4DleaRB30@cluster0.tdar8p5.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Successfully created DB connection with emp");
})
.catch((e)=>{
        console.log(e);    
})