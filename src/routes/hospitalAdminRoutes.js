const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { addDoctorToHospital } = require("../controllers/hospitalAdminController");

router.post(
  "/add-doctor",
  auth,
  authorize("HOSPITAL_ADMIN"),
  addDoctorToHospital
);

module.exports = router;
