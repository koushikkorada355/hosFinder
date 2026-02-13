const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  addDoctorOperation,
  getHospitalOperations
} = require("../controllers/doctorOperationController");

// HOSPITAL_ADMIN
router.post(
  "/",
  auth,
  authorize("HOSPITAL_ADMIN"),
  addDoctorOperation
);

// Public
router.get(
  "/hospital/:hospitalId",
  getHospitalOperations
);

module.exports = router;
