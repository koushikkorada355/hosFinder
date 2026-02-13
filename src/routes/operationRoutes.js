const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  createOperation,
  getOperations
} = require("../controllers/operationController");

// SUPER_ADMIN
router.post(
  "/",
  auth,
  authorize("SUPER_ADMIN"),
  createOperation
);

// Public
router.get("/", getOperations);

module.exports = router;
