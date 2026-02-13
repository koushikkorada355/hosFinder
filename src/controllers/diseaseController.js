const Disease = require("../models/diseaseModel");

exports.createDisease = async (req, res) => {
  try {
    const { name, description } = req.body;

    const disease = await Disease.create({
      name,
      description
    });

    res.status(201).json({
      success: true,
      message: "Disease created successfully",
      data: disease
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();

    res.json({
      success: true,
      data: diseases
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
