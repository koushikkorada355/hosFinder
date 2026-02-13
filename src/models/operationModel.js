const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String
    },
    diseaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disease",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Operation", operationSchema);
