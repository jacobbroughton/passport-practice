const express = require("express");
const exphbs = require("express-handlebars");
const passportSetup = require("./config/passport-setup")
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("home", {
        title: "Home"
    })
})

app.use("/auth/", authRoutes);
app.use("/profile/", profileRoutes);

app.listen(3000, () => {
    console.log("Server listening on port 3000")
});