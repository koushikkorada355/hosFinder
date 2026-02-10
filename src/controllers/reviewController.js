const Review = require("../models/reviewModel");
const Appointment = require("../models/appointmentModel");

exports.addReview = async (req, res) => {
  try {
    const { hospitalId, rating, description } = req.body;

    // 1 Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    // 2 Check completed appointment
    const hasVisited = await Appointment.findOne({
      patientId: req.user.userId,
      hospitalId,
      status: "COMPLETED"
    });

    if (!hasVisited) {
      return res.status(403).json({
        success: false,
        message: "You can review only after completing an appointment"
      });
    }

    // 3 Create review
    const review = await Review.create({
      userId: req.user.userId,
      hospitalId,
      rating,
      description
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this hospital"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getHospitalReviews = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const reviews = await Review.find({ hospitalId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          ).toFixed(1);

    res.json({
      success: true,
      averageRating: Number(averageRating),
      totalReviews,
      reviews: reviews.map(r => ({
        rating: r.rating,
        description: r.description,
        user: r.userId.name,
        date: r.createdAt
      }))
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

