const express = require("express");
const {
  getNearbyHospitals,
  createEmergencyBooking,
  sendEmergencyRequest,
  getEmergencyBooking,
  getPatientEmergencies,
  acceptEmergencyRequest,
  rejectEmergencyRequest,
  getHospitalPendingRequests,
  updateAmbulanceLocation,
  updateEmergencyStatus,
  cancelEmergency
} = require("../controllers/emergencyBookingController");
const protect = require("../middleware/auth");

const router = express.Router();

// Public route to get nearby hospitals
router.get("/nearby-hospitals", getNearbyHospitals);

// Patient routes
router.post("/create", protect, createEmergencyBooking);
router.post("/send-request", protect, sendEmergencyRequest);
router.get("/my-emergencies", protect, getPatientEmergencies);
router.get("/:emergencyId", protect, getEmergencyBooking);
router.put("/:emergencyId/cancel", protect, cancelEmergency);

// Hospital routes (admin)
router.get("/hospital/pending-requests", protect, getHospitalPendingRequests);
router.put("/:emergencyId/accept", protect, acceptEmergencyRequest);
router.put("/:emergencyId/reject", protect, rejectEmergencyRequest);

// Ambulance/Hospital routes for live tracking and status updates
router.put("/:emergencyId/ambulance-location", protect, updateAmbulanceLocation);
router.put("/:emergencyId/status", protect, updateEmergencyStatus);

module.exports = router;
