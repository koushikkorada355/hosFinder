const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  requestAppointment,
  acceptSlot,
  rejectSlot,
  completeAppointment
} = require("../controllers/appointmentController");

router.post(
  "/",
  auth,
  authorize("USER"),
  requestAppointment
);

router.put(
  "/:appointmentId/accept",
  auth,
  authorize("USER"),
  acceptSlot
);

router.put(
  "/:appointmentId/reject",
  auth,
  authorize("USER"),
  rejectSlot
);

router.put(
  "/:appointmentId/complete",
  auth,
  authorize("HOSPITAL_ADMIN"),
  completeAppointment
);

module.exports = router;
