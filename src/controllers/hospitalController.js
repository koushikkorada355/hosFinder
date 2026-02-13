const Hospital = require("../models/hospitalModel");

exports.createHospital = async (req, res) => {
  try {
    const { name, address, type, lat, lng, specializations } = req.body;

    const hospital = await Hospital.create({
      name,
      address,
      type,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      },
      specializations,
      adminUserId: req.user.userId
    });

    res.status(201).json({
      success: true,
      message: "Hospital created successfully",
      data: hospital
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getHospitalsByDisease = async (req, res) => {
  try {
    const { diseaseId } = req.query;

    const hospitals = await Hospital.find({
      specializations: diseaseId
    }).populate("specializations", "name");

    res.json({
      success: true,
      data: hospitals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

