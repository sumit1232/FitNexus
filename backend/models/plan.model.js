const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true, // in days
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["Basic", "Premium", "Gold"],
      default: "Basic",
    },

    accessLevel: {
      type: String,
      default: "Gym Access",
    },

    isFreezeAllowed: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String, // store filename from multer
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);