const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
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
    }
  },
  adminUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

bloodBankSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("BloodBank", bloodBankSchema);
