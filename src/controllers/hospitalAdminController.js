const Doctor = require("../models/doctorModel");
const Hospital = require("../models/hospitalModel");
const DoctorHospital = require("../models/doctorHospitalModel");

exports.addDoctorToHospital = async (req, res) => {
  try {
    const { doctorId, hospitalId, department, consultationHours } = req.body;

    // 1 Validate input
    if (!doctorId || !hospitalId) {
      return res.status(400).json({
        success: false,
        message: "doctorId and hospitalId are required"
      });
    }

    // 2 Check hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found"
      });
    }

    // 3 Ensure hospital belongs to this HOSPITAL_ADMIN
    if (hospital.adminId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to manage this hospital"
      });
    }

    // 4 Check doctor profile exists (created by SUPER_ADMIN + filled by DOCTOR)
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message:
          "Doctor profile not found. Ask doctor to complete profile or contact Super Admin."
      });
    }

    // 5 Prevent duplicate doctor–hospital mapping
    const alreadyAdded = await DoctorHospital.findOne({
      doctorId,
      hospitalId
    });

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Doctor is already added to this hospital"
      });
    }

    // 6 Create doctor–hospital association
    const mapping = await DoctorHospital.create({
      doctorId,
      hospitalId,
      department,
      consultationHours,
      isActive: true
    });

    // 7 Success response
    return res.status(201).json({
      success: true,
      message: "Doctor successfully added to hospital",
      data: mapping
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
