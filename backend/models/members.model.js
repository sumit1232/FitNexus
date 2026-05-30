const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    address: {
      type: String,
      trim: true,
    },

    // Membership
    membership: {
      type: String,
      enum: ["Basic", "Premium", "Gold"],
      default: "Basic",
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    // Emergency & Medical
    emergencyContact: {
      type: String,
      trim: true,
    },

    medicalIssues: {
      type: String,
      trim: true,
    },

    // Fitness Details
    height: {
      type: String,
    },

    weight: {
      type: String,
    },

    bmi: {
      type: String,
    },

    trainer: {
      type: String,
    },

    // Profile Image
    image: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);