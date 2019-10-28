const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport")
const passportSetup = require("./config/passport-setup")
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const cookieSession = require("cookie-session");
var session = require('express-session')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
let MONGODB_URI = process.env.MONGODB_URI;


// Initialize express
const app = express();



// Set up handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");



// Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);



// Connect to MongoDB
mongoose.connect(MONGODB_URI,
    {  useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(console.log("MongoDB connected!"));



// Home route
app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    })
})



// Start server
app.listen(3000, () => {
    console.log("Server listening on port 3000")
});