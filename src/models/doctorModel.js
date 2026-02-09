const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  specialization: String,
  experience: Number,
  licenseNumber: String
});

module.exports = mongoose.model("Doctor", doctorSchema);
