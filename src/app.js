const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
module.exports = app;
