const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema(
  {
    bloodBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodBank",
      required: true
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true
    },
    unitsAvailable: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

// One record per blood group per blood bank
bloodInventorySchema.index(
  { bloodBankId: 1, bloodGroup: 1 },
  { unique: true }
);

module.exports = mongoose.model("BloodInventory", bloodInventorySchema);
