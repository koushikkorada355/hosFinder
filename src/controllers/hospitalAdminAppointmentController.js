const Appointment = require("../models/appointmentModel");
const Hospital = require("../models/hospitalModel");

exports.getRequestedAppointments = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({
      adminUserId: req.user.userId
    });

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found for admin"
      });
    }

    const appointments = await Appointment.find({
      hospitalId: hospital._id,
      status: "REQUESTED"
    });

    res.json({
      success: true,
      data: appointments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



exports.assignSlot = async (req, res) => {
  try {
    const { appointmentId, slotTime } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    appointment.slotTime = new Date(slotTime);
    appointment.status = "SLOT_ASSIGNED";
    await appointment.save();

    res.json({
      success: true,
      message: "Slot assigned successfully",
      data: appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
