const express = require("express");

const router = express.Router();

// ============================
// Multer Cloudinary
// ============================

const upload = require("../config/multer.js");

// ============================
// Controllers
// ============================

const {
  registerUser,
  verifyOTP,
  loginUser,
  getProfile,
} = require("../controllers/user.controller.js");

// ============================
// Routes
// ============================

// Register
router.post(
  "/registeruser",
  upload.single("profile"),
  registerUser
);

// Verify OTP
router.post(
  "/verifyotp",
  verifyOTP
);

// Login
router.post(
  "/loginuser",
  loginUser
);

// Profile
router.get(
  "/profile",
  getProfile
);

module.exports = router;