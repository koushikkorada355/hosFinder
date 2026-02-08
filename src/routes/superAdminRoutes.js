const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { createHospitalAdmin } = require("../controllers/superAdminController");

router.post(
  "/create-hospital-admin",
  auth,
  authorize("SUPER_ADMIN"),
  createHospitalAdmin
);

module.exports = router;
