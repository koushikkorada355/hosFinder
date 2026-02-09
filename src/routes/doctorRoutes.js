const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { createOrUpdateDoctorProfile } = require("../controllers/doctorController");

router.put(
  "/profile",
  auth,
  authorize("DOCTOR"),
  createOrUpdateDoctorProfile
);

module.exports = router;
