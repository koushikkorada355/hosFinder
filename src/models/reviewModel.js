const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// One review per user per hospital
reviewSchema.index({ userId: 1, hospitalId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
