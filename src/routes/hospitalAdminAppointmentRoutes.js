const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  getRequestedAppointments,
  assignSlot
} = require("../controllers/hospitalAdminAppointmentController");

router.get(
  "/appointments",
  auth,
  authorize("HOSPITAL_ADMIN"),
  getRequestedAppointments
);

router.put(
  "/appointments/assign-slot",
  auth,
  authorize("HOSPITAL_ADMIN"),
  assignSlot
);

module.exports = router;
