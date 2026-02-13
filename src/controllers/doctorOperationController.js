const DoctorOperation = require("../models/doctorOperationModel");

exports.addDoctorOperation = async (req, res) => {
  try {
    const { doctorId, hospitalId, operationId, fee } = req.body;

    const doctorOperation = await DoctorOperation.create({
      doctorId,
      hospitalId,
      operationId,
      fee
    });

    res.status(201).json({
      success: true,
      message: "Doctor operation added successfully",
      data: doctorOperation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getHospitalOperations = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const operations = await DoctorOperation.find({ hospitalId })
      .populate("doctorId", "name")
      .populate("operationId", "name description");

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
