const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

/**
 * ===============================
 * SUPER ADMIN → CREATE HOSPITAL ADMIN
 * ===============================
 */
exports.createHospitalAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1 Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    // 2 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // 3 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4 Create hospital admin
    const hospitalAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "HOSPITAL_ADMIN"
    });

    return res.status(201).json({
      success: true,
      message: "Hospital admin created successfully",
      data: {
        id: hospitalAdmin._id,
        name: hospitalAdmin.name,
        email: hospitalAdmin.email,
        role: hospitalAdmin.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

/**
 * ===============================
 * SUPER ADMIN → CREATE DOCTOR (USER ACCOUNT ONLY)
 * ===============================
 */
exports.createDoctor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1 Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    // 2 Check if doctor already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email already exists"
      });
    }

    // 3 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4 Create doctor user account
    const doctorUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "DOCTOR"
    });

    return res.status(201).json({
      success: true,
      message: "Doctor account created successfully. Doctor must complete profile.",
      data: {
        id: doctorUser._id,
        name: doctorUser.name,
        email: doctorUser.email,
        role: doctorUser.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
