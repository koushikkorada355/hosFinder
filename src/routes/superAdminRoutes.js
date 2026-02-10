const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { createHospitalAdmin,createDoctor,createBloodBankAdmin } = require("../controllers/superAdminController");

// 
// 
router.post(
  "/create-hospital-admin",
  auth,
  authorize("SUPER_ADMIN"),
  createHospitalAdmin
);
router.post(
  "/create-doctor",
  auth,
  authorize("SUPER_ADMIN"),
  createDoctor
);

// Create Blood Bank Admin
router.post(
  "/create-bloodbank-admin",
  auth,
  authorize("SUPER_ADMIN"),
  createBloodBankAdmin
);
module.exports = router;
