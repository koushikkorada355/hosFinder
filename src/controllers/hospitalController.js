const Hospital = require("../models/hospitalModel");

exports.createHospital = async (req, res) => {
  const { name, address, lat, lng } = req.body;

  const hospital = await Hospital.create({
    name,
    address,
    adminId: req.user.userId,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    }   
  });

  res.status(201).json({
    message: "Hospital created",
    hospital
  });
};
