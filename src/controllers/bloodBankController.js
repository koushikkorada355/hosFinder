const BloodBank = require("../models/bloodBankModel");

/**
 * BLOOD_BANK_ADMIN → Create Blood Bank
 */
exports.createBloodBank = async (req, res) => {
  try {
    const { name, address, lat, lng } = req.body;

    const bloodBank = await BloodBank.create({
      name,
      address,
      adminUserId: req.user.userId,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      }
    });

    res.status(201).json({
      success: true,
      message: "Blood bank created successfully",
      data: bloodBank
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * USER → Search Nearby Blood Banks
 */
exports.searchNearbyBloodBanks = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const bloodBanks = await BloodBank.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 10000 // 10 km
        }
      }
    });

    res.json({
      success: true,
      data: bloodBanks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
