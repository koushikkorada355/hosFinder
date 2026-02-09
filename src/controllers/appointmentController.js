const Appointment = require("../models/appointmentModel");
const DoctorHospital = require("../models/doctorHospitalModel");

exports.requestAppointment = async (req, res) => {
  try {
    const { doctorId, hospitalId, reason } = req.body;

    // Doctor must belong to hospital
    const validMapping = await DoctorHospital.findOne({
      doctorId,
      hospitalId
    });

    if (!validMapping) {
      return res.status(400).json({
        success: false,
        message: "Doctor does not work in this hospital"
      });
    }

    const appointment = await Appointment.create({
      patientId: req.user.userId,
      doctorId,
      hospitalId,
      reason,
      status: "REQUESTED"
    });

    res.status(201).json({
      success: true,
      message: "Appointment request submitted",
      data: appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.acceptSlot = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patientId: req.user.userId
    });

    if (!appointment || appointment.status !== "SLOT_ASSIGNED") {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment state"
      });
    }

    appointment.status = "CONFIRMED";
    await appointment.save();

    res.json({
      success: true,
      message: "Appointment confirmed",
      data: appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.rejectSlot = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patientId: req.user.userId
    });

    if (!appointment || appointment.status !== "SLOT_ASSIGNED") {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment state"
      });
    }

    appointment.status = "REJECTED";
    appointment.slotTime = null;
    await appointment.save();

    res.json({
      success: true,
      message: "Slot rejected",
      data: appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment || appointment.status !== "CONFIRMED") {
      return res.status(400).json({
        success: false,
        message: "Appointment not in confirmed state"
      });
    }

    appointment.status = "COMPLETED";
    await appointment.save();

    res.json({
      success: true,
      message: "Appointment marked as completed"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
