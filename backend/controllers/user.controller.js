const User = require("../models/user.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const sendEmail = require("../gmail.js");

// ============================
// Register User
// ============================

exports.registerUser = async (
  req,
  res
) => {
  try {

    const {
      fullname,
      email,
      phone,
      password,
    } = req.body;

    // Validation
    if (
      !fullname ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    // Existing User
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists",
      });
    }

    // Generate OTP
    const otp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // Create User
    const newUser =
      await User.create({
        fullname,
        email,
        phone,

        password:
          hashedPassword,

        profile: req.file
          ? req.file.path
          : "",

        otp,

        otpExpire:
          Date.now() +
          5 * 60 * 1000,

        isVerified: false,
      });

    // Send Email
    await sendEmail(
      email,
      otp
    );

    res.status(201).json({
      success: true,

      message:
        "Registration successful. OTP sent.",

      user: {
        id: newUser._id,
        fullname:
          newUser.fullname,
        email:
          newUser.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// ============================
// Verify OTP
// ============================

exports.verifyOTP = async (
  req,
  res
) => {
  try {

    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message:
          "OTP required",
      });
    }

    const user =
      await User.findOne({
        otp,
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid OTP",
      });
    }

    // Expire Check
    if (
      user.otpExpire <
      Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "OTP expired",
      });
    }

    // Verify
    user.isVerified = true;

    user.otp = null;

    user.otpExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "OTP verified successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// ============================
// Login User
// ============================

exports.loginUser = async (
  req,
  res
) => {
  try {

    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password required",
      });
    }

    // Find User
    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    // Verification Check
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message:
          "Please verify account first",
      });
    }

    // Compare Password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    // Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        fullname:
          user.fullname,
        email:
          user.email,
        phone:
          user.phone,
        profile:
          user.profile,
        role:
          user.role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// ============================
// Get Profile
// ============================

exports.getProfile = async (
  req,
  res
) => {
  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};