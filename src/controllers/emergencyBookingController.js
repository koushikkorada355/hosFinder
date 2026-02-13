const EmergencyBooking = require("../models/emergencyBookingModel");
const Hospital = require("../models/hospitalModel");
const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");

// Helper function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (coord1, coord2) => {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get nearby hospitals
exports.getNearbyHospitals = async (req, res) => {
  try {
    const { latitude, longitude, radius = 50 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required"
      });
    }

    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    }).select("_id name address phone location");

    // Calculate distance and estimated time for each hospital
    const hospitalsWithDistance = hospitals.map((hospital) => {
      const distance = calculateDistance(
        [parseFloat(longitude), parseFloat(latitude)],
        hospital.location.coordinates
      );
      const estimatedTime = Math.ceil((distance / 40) * 60); // Assuming 40 km/h average speed

      return {
        hospitalId: hospital._id,
        hospitalName: hospital.name,
        address: hospital.address,
        phone: hospital.phone,
        distance: parseFloat(distance.toFixed(2)),
        estimatedTime
      };
    });

    // Sort by distance
    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: hospitalsWithDistance.length,
      data: hospitalsWithDistance
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Create emergency booking
exports.createEmergencyBooking = async (req, res) => {
  try {
    const {
      patientName,
      patientPhone,
      accidentType,
      severity,
      description,
      location, // { latitude, longitude, address }
      medicalHistory,
      emergencyContacts
    } = req.body;

    const patientId = req.user._id;

    // Validate required fields
    if (
      !patientName ||
      !patientPhone ||
      !accidentType ||
      !severity ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Create emergency booking
    const emergencyBooking = new EmergencyBooking({
      patientId,
      patientName,
      patientPhone,
      accidentType,
      severity,
      description,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
        address: location.address || "Emergency Location"
      },
      medicalHistory: medicalHistory || {},
      emergencyContacts: emergencyContacts || [],
      priority: severity === "CRITICAL" ? 10 : severity === "SEVERE" ? 5 : 1
    });

    await emergencyBooking.save();

    // Find nearby hospitals within 50km
    const nearbyHospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: emergencyBooking.location,
          $maxDistance: 50000 // 50km in meters
        }
      }
    })
      .select("_id name address phone location")
      .limit(5);

    // Calculate distance and estimated time for each hospital
    const hospitalsWithDistance = nearbyHospitals.map((hospital) => {
      const distance = calculateDistance(
        emergencyBooking.location.coordinates,
        hospital.location.coordinates
      );
      const estimatedTime = Math.ceil((distance / 40) * 60);

      return {
        hospitalId: hospital._id,
        hospitalName: hospital.name,
        address: hospital.address,
        phone: hospital.phone,
        distance: parseFloat(distance.toFixed(2)),
        estimatedTime
      };
    });

    // Sort by distance
    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    // Update emergency booking with nearby hospitals
    emergencyBooking.nearbyHospitals = hospitalsWithDistance;
    emergencyBooking.status = "INITIATED";
    await emergencyBooking.save();

    res.status(201).json({
      success: true,
      message: "Emergency booking created. Please select a hospital.",
      data: emergencyBooking
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Send emergency request to selected hospital
exports.sendEmergencyRequest = async (req, res) => {
  try {
    const { emergencyId, hospitalId } = req.body;

    if (!emergencyId || !hospitalId) {
      return res.status(400).json({
        success: false,
        message: "Emergency ID and Hospital ID are required"
      });
    }

    const emergencyBooking = await EmergencyBooking.findById(emergencyId);
    if (!emergencyBooking) {
      return res.status(404).json({
        success: false,
        message: "Emergency booking not found"
      });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found"
      });
    }

    // Update emergency with selected hospital
    emergencyBooking.selectedHospitalId = hospitalId;
    emergencyBooking.status = "REQUEST_SENT";
    await emergencyBooking.save();

    res.status(200).json({
      success: true,
      message: "Emergency request sent to hospital. Waiting for response...",
      data: emergencyBooking
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Get emergency details
exports.getEmergencyBooking = async (req, res) => {
  try {
    const { emergencyId } = req.params;

    const emergencyBooking = await EmergencyBooking.findById(emergencyId)
      .populate("patientId", "name email phone")
      .populate("selectedHospitalId", "name address phone")
      .populate("assignedDoctorId", "name specialization phone");

    if (!emergencyBooking) {
      return res.status(404).json({
        success: false,
        message: "Emergency booking not found"
      });
    }

    res.status(200).json({
      success: true,
      data: emergencyBooking
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Get all emergency bookings for patient
exports.getPatientEmergencies = async (req, res) => {
  try {
    const patientId = req.user._id;

    const emergencies = await EmergencyBooking.find({ patientId })
      .populate("selectedHospitalId", "name address")
      .populate("assignedDoctorId", "name specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emergencies.length,
      data: emergencies
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Hospital accepts emergency request
exports.acceptEmergencyRequest = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    const { ambulanceInfo } = req.body; // Optional: ambulance details

    const emergencyBooking = await EmergencyBooking.findById(emergencyId);
    if (!emergencyBooking) {
      return res.status(404).json({
        success: false,
        message: "Emergency booking not found"
      });
    }

    // Update status to ACCEPTED
    emergencyBooking.status = "ACCEPTED";
    if (ambulanceInfo) {
      emergencyBooking.ambulanceInfo = ambulanceInfo;
      emergencyBooking.status = "AMBULANCE_SENT";
    }

    await emergencyBooking.save();

    res.status(200).json({
      success: true,
      message: "Emergency request accepted",
      data: emergencyBooking
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Hospital rejects emergency request
exports.rejectEmergencyRequest = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    const { rejectionReason } = req.body;

    const emergencyBooking = await EmergencyBooking.findById(emergencyId);
    if (!emergencyBooking) {
      return res.status(404).json({
        success: false,
        message: "Emergency booking not found"
      });
    }

    emergencyBooking.status = "REJECTED";
    emergencyBooking.rejectionReason = rejectionReason || "Hospital unable to accept";
    await emergencyBooking.save();

    res.status(200).json({
      success: true,
      message: "Emergency request rejected. Patient can choose another hospital.",
      data: emergencyBooking
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Get pending emergency requests for hospital
exports.getHospitalPendingRequests = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId; // Get logged-in user's ID

    // Find hospital where this user is the admin
    const hospital = await Hospital.findOne({ adminUserId: userId });

    if (!hospital) {
      return res.status(400).json({
        success: false,
        message: "You are not assigned as a hospital admin"
      });
    }

    const hospitalId = hospital._id;

    const emergencies = await EmergencyBooking.find({
      selectedHospitalId: hospitalId,
      status: "REQUEST_SENT"
    })
      .populate("patientId", "name email phone")
      .sort({ priority: -1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: emergencies.length,
      data: emergencies
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Update ambulance location (real-time tracking)
exports.updateAmbulanceLocation = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required"
      });
    }

    const emergencyBooking = await EmergencyBooking.findByIdAndUpdate(
      emergencyId,
      {
        "ambulanceInfo.gpsTracking": {
          latitude,
          longitude,
          lastUpdated: new Date()
        },
        status: "IN_TRANSIT"
      },
      { new: true }
    );

    if (!emergencyBooking) {
      return res.status(404).json({
        success: false,
        message: "Emergency booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Ambulance location updated",
      data: emergencyBooking
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Update emergency status
exports.updateEmergencyStatus = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    const { status, hospitalNotes } = req.body;

    const validStatuses = [
      "ACCEPTED",
      "AMBULANCE_SENT",
      "IN_TRANSIT",
      "ARRIVED",
      "ADMITTED",
      "COMPLETED",
      "CANCELLED"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const emergencyBooking = await EmergencyBooking.findByIdAndUpdate(
      emergencyId,
      {
        status,
        hospitalNotes: hospitalNotes || emergencyBooking?.hospitalNotes
      },
      { new: true }
    );

    if (!emergencyBooking) {
      return res.status(404).json({
        success: false,
        message: "Emergency booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency status updated",
      data: emergencyBooking
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

// Cancel emergency
exports.cancelEmergency = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    const { reason } = req.body;

    const emergencyBooking = await EmergencyBooking.findByIdAndUpdate(
      emergencyId,
      {
        status: "CANCELLED",
        hospitalNotes: reason || "Cancelled by user"
      },
      { new: true }
    );

    if (!emergencyBooking) {
      return res.status(404).json({
        success: false,
        message: "Emergency booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency cancelled",
      data: emergencyBooking
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};
