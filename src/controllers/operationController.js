const Operation = require("../models/operationModel");

exports.createOperation = async (req, res) => {
  try {
    const { name, description, diseaseId } = req.body;

    const operation = await Operation.create({
      name,
      description,
      diseaseId
    });

    res.status(201).json({
      success: true,
      message: "Operation created successfully",
      data: operation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getOperations = async (req, res) => {
  try {
    const { diseaseId } = req.query;

    const filter = diseaseId ? { diseaseId } : {};

    const operations = await Operation.find(filter)
      .populate("diseaseId", "name");

    res.json({
      success: true,
      data: operations
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
