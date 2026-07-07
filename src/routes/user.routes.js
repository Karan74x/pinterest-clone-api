const express = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const userModel = require("../models/user.model");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});

router.get("/feed", function (req, res) {
  res.render("feed");
});
router.post("/register", userController.register);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  function (req, res) {},
);

router.get("/profile", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("profile", { user });
});

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
}
module.exports = router;
