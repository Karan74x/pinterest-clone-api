const passport = require("passport");
const User = require("../models/user.model");

async function register(req, res) {
  try {
    const { username, fullname, email, password } = req.body;

    const user = new User({
      username,
      fullname,
      email,
    });

    await User.register(user, password);

    passport.authenticate("local")(req, res, function () {
      res.redirect("/users/profile");
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { register };
