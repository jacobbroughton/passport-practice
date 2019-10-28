const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userID: String,
    username: String
})

let User = mongoose.model("user", UserSchema);

module.exports = User;


