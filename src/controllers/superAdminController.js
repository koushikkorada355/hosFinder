const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.createHospitalAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "HOSPITAL_ADMIN"
  });

  res.status(201).json({
    message: "Hospital admin created",
    admin: {
      id: admin._id,
      email: admin.email,
      role: admin.role
    }
  });
};
