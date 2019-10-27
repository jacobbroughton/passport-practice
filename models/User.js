const mongoose = require("mongoose");
require("dotenv").config();
let MONGODB_URI = process.env.MONGODB_URI;
const Schema = mongoose.Schema;

mongoose.connect(MONGODB_URI, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true 
    }).then(console.log("MongoDB connected!"));

    let UserSchema = new Schema({
        userID: String,
        userName: String
    })

    let User = mongoose.model("user", UserSchema);

    module.exports = User;

    
