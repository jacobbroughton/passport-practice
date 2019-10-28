const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy
let User = require("../models/User");
require("dotenv").config();


passport.serializeUser((user, done) => {
    console.log(user.username)
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
});


let fbOptions = {
        clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}

let fbCallback = (accessToken, refreshToken, profile, done) => {
    User.findOne({ userID: profile.id }).then((currentUser) => {
                if(currentUser) {
            console.log("Already a user");
            done(null, currentUser)
        } else {
            new User ({
                userID : profile.id,
                username : profile.displayName
            }).save().then((newUser) => {
                console.log("New user created ===>" + newUser); 
                done(null, newUser);
            })
        }
    })
}

passport.use(new FacebookStrategy(fbOptions, fbCallback));