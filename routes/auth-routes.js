const router = require("express").Router();
const passport = require("passport");


router.get("/login", (req, res) => {
    console.log("login hit")
})

router.get("/logout", (req, res) => {
    console.log("logout hit")
})

router.get("/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/");
    });

module.exports = router;