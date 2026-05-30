const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  sets: {
    type: Number,
    default: 0,
  },

  reps: {
    type: Number,
    default: 0,
  },

  weight: {
    type: Number,
    default: 0,
  },
});

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Chest",
        "Back",
        "Legs",
        "Shoulders",
        "Arms",
        "Abs",
        "Cardio",
        "Full Body",
      ],
      required: true,
    },

    duration: {
      type: Number,
      required: true, // in minutes
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    exercises: [exerciseSchema],

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    caloriesBurn: {
      type: Number,
      default: 0,
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      default: null,
    },

    assignedMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
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

module.exports = mongoose.model(
  "Workout",
  workoutSchema
);