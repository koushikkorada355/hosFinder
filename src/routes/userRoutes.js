const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/endpoint", userController.getUser);

module.exports = router