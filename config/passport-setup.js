const passport = require("passport");
const express = require("express");
const FacebookStrategy = require("passport-facebook").Strategy
require("dotenv").config();
const app = express();


passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}, (accessToken, refreshToken, profile, cb) => {
    // use DB User model
}))