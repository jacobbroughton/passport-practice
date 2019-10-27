const passport = require("passport");
const express = require("express");
const FacebookStrategy = require("passport-facebook").Strategy
let User = require("../models/User");
require("dotenv").config();
const app = express();


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ userID: profile.id }, (err, user) => {
        if(user) {
            console.log("Already a user");
            return done(null, user)
        } else {
            new User ({
                userID : profile.id,
                userName : profile.displayName
            }).save()
        }
    })
    // , (err, user) => {
    //     if(!user) {
    //         console.log("No user found!")
    //     }
    // }).save();
}))