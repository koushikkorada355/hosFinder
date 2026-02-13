const mongoose = require("mongoose");

const emergencyBookingSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    patientName: {
      type: String,
      required: true
    },
    patientPhone: {
      type: String,
      required: true
    },
    accidentType: {
      type: String,
      enum: [
        "ROAD_ACCIDENT",
        "FALL",
        "BURN",
        "POISONING",
        "DROWNING",
        "ELECTROCUTION",
        "HEART_ATTACK",
        "STROKE",
        "SEVERE_INJURY",
        "OTHER"
      ],
      required: true
    },
    severity: {
      type: String,
      enum: ["CRITICAL", "SEVERE", "MODERATE"],
      default: "SEVERE",
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true
      },
      address: String
    },
    nearbyHospitals: [
      {
        hospitalId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hospital"
        },
        hospitalName: String,
        distance: Number, // in km
        estimatedTime: Number // in minutes
      }
    ],
    selectedHospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital"
    },
    assignedDoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    status: {
      type: String,
      enum: [
        "INITIATED",
        "REQUEST_SENT",
        "ACCEPTED",
        "REJECTED",
        "AMBULANCE_SENT",
        "IN_TRANSIT",
        "ARRIVED",
        "ADMITTED",
        "COMPLETED",
        "CANCELLED"
      ],
      default: "INITIATED"
    },
    medicalHistory: {
      allergies: [String],
      bloodType: String,
      chronicDiseases: [String],
      currentMedications: [String]
    },
    emergencyContacts: [
      {
        name: String,
        phone: String,
        relationship: String
      }
    ],
    ambulanceInfo: {
      ambulanceId: String,
      driverName: String,
      driverPhone: String,
      estimatedArrival: Date,
      gpsTracking: {
        latitude: Number,
        longitude: Number,
        lastUpdated: Date
      }
    },
    hospitalNotes: {
      type: String,
      default: null
    },
    rejectionReason: {
      type: String,
      default: null
    },
    priority: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

emergencyBookingSchema.index({ location: "2dsphere" });
emergencyBookingSchema.index({ status: 1 });
emergencyBookingSchema.index({ patientId: 1 });
emergencyBookingSchema.index({ selectedHospitalId: 1 });

module.exports = mongoose.model("EmergencyBooking", emergencyBookingSchema);
