const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    specialization: String,
    experience: String,
    rating: String,
    joiningDate: Date,
    status: {
      type: String,
      default: "Active",
    },
    image: String,

    // ⭐ NEW FIELD
    assignedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);