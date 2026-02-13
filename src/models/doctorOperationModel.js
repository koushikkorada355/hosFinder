const mongoose = require("mongoose");

const doctorOperationSchema = new mongoose.Schema(
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
    operationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operation",
      required: true
    },
    fee: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

// Prevent duplicate operation for same doctor in same hospital
doctorOperationSchema.index(
  { doctorId: 1, hospitalId: 1, operationId: 1 },
  { unique: true }
);

module.exports = mongoose.model("DoctorOperation", doctorOperationSchema);
