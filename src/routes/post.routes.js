const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/createpost", postController.createPost);

module.exports = router;
