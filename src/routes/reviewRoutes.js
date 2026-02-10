const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  addReview,
  getHospitalReviews
} = require("../controllers/reviewController");

// USER → Add review
router.post(
  "/",
  auth,
  authorize("USER"),
  addReview
);

// PUBLIC → Get hospital reviews
router.get(
  "/hospital/:hospitalId",
  getHospitalReviews
);

module.exports = router;
