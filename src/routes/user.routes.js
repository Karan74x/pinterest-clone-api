const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/createuser", userController.createUser);

module.exports = router;
