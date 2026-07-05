const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
async function createPost(req, res) {
  let createdpost = await postModel.create({
    postText: "Second post",
    author: "6a49e6fae7c1b5a13b990201",
  });

  // Storing the post in user's array
  let user = await userModel.findOne({ _id: "6a49e6fae7c1b5a13b990201" });
  user.posts.push(createdpost._id);
  await user.save();
  res.status(201).json(createdpost);
}

module.exports = { createPost };
