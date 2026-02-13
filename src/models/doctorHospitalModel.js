const mongoose = require("mongoose");

const doctorHospitalSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },
    department: {
      type: String,
      required: true
    },
    consultationHours: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Ensure unique doctor-hospital mapping
doctorHospitalSchema.index({ doctorId: 1, hospitalId: 1 }, { unique: true });

module.exports = mongoose.model("DoctorHospital", doctorHospitalSchema);
