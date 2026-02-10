const BloodInventory = require("../models/bloodInventoryModel");
const BloodBank = require("../models/bloodBankModel");

/**
 * BLOOD_BANK_ADMIN → Add / Update Blood Inventory
 */
exports.updateInventory = async (req, res) => {
  try {
    const { bloodGroup, unitsAvailable } = req.body;

    const bloodBank = await BloodBank.findOne({
      adminUserId: req.user.userId
    });

    if (!bloodBank) {
      return res.status(404).json({
        success: false,
        message: "Blood bank not found"
      });
    }

    const inventory = await BloodInventory.findOneAndUpdate(
      { bloodBankId: bloodBank._id, bloodGroup },
      { unitsAvailable },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Blood inventory updated",
      data: inventory
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * PUBLIC → View Blood Availability
 */
exports.getBloodInventory = async (req, res) => {
  try {
    const { bloodBankId } = req.params;

    const inventory = await BloodInventory.find({ bloodBankId });

    res.json({
      success: true,
      data: inventory
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
