const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  createDisease,
  getDiseases
} = require("../controllers/diseaseController");

// SUPER_ADMIN
router.post(
  "/",
  auth,
  authorize("SUPER_ADMIN"),
  createDisease
);

// Public
router.get("/", getDiseases);

module.exports = router;
