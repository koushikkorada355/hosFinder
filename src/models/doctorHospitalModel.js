const mongoose = require("mongoose");

const doctorHospitalSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
  department: String,
  consultationHours: String
});

module.exports = mongoose.model("DoctorHospital", doctorHospitalSchema);
