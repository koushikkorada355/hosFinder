const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
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
    slotTime: {
      type: Date,
      default: null
    },
    reason: {
      type: String
    },
    status: {
      type: String,
      enum: [
        "REQUESTED",
        "SLOT_ASSIGNED",
        "CONFIRMED",
        "REJECTED",
        "CANCELLED",
        "COMPLETED"
      ],
      default: "REQUESTED"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
