const express = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const userModel = require("../models/user.model");
const upload = require("./multer.js");
const router = express.Router();
const postModel = require("../models/post.model.js");

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

router.post(
  "/upload",
  isLoggedIn,
  upload.single("file"),
  async function (req, res) {
    if (!req.file) {
      return res.status(404).send("No files were given");
    }
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.create({
      image: req.file.filename,
      imageText: req.body.filecaption,
      user: user._id,
    });
    user.posts.push(post._id);
    await user.save();
    res.send("done");
  },
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
