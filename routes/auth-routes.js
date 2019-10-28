const router = require("express").Router();
const passport = require("passport");


router.get("/login", (req, res) => {
    res.render("login", {
        user: req.user
    })
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback",  
    passport.authenticate("facebook", { successRedirect: "/profile/", failureRedirect: "/login" })
);

module.exports = router;