const Doctor = require("../models/doctorModel");

exports.createOrUpdateDoctorProfile = async (req, res) => {
  const { specialization, experience, licenseNumber } = req.body;

  let doctor = await Doctor.findOne({ userId: req.user.userId });

  if (!doctor) {
    doctor = await Doctor.create({
      userId: req.user.userId,
      specialization,
      experience,
      licenseNumber
    });
  } else {
    doctor.specialization = specialization;
    doctor.experience = experience;
    doctor.licenseNumber = licenseNumber;
    await doctor.save();
  }

  res.json({
    message: "Doctor profile updated",
    doctor
  });
};
