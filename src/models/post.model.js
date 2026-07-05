const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postText: {
      type: String,
      required: true,
    },

    likes: {
      type: Array,
      default: [],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Post", postSchema);
