const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.model");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "7474",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

module.exports = app;
