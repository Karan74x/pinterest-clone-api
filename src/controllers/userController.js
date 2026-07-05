const userModel = require("../models/user.model");

async function createUser(req, res) {
  let createdUser = await userModel.create({
    username: "James",

    fullName: "JamesBond007",

    email: "Bond@74.com",

    password: "007",
    posts: [],
  });

  res.status(201).json(createdUser);
}

module.exports = { createUser };
