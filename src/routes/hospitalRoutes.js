const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { createHospital } = require("../controllers/hospitalController");

router.post(
  "/",
  auth,
  authorize("HOSPITAL_ADMIN"),
  createHospital
);

module.exports = router;
