// routes/workoutRoutes.js

const express = require("express");
const router = express.Router();

const Workout = require("../models/workout.model");

// ================= MULTER =================
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname.replace(/\s+/g, "-")
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = file.mimetype.startsWith("image/");

  if (extname && mimetype) {
    return cb(null, true);
  }

  cb(new Error("Only image files are allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ================= ADD WORKOUT =================
router.post(
  "/add",
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        category,
        duration,
        description,
        exercises,
        level,
        caloriesBurn,
        trainer,
        assignedMember,
        status,
      } = req.body;

      const parsedExercises = exercises
        ? JSON.parse(exercises)
        : [];

      const workout = await Workout.create({
        title,
        category,
        duration,
        description,
        exercises: parsedExercises,
        level,
        caloriesBurn,
        trainer,
        assignedMember,
        status,
        image: req.file ? req.file.filename : "",
      });

      res.status(201).json({
        success: true,
        message: "Workout created successfully",
        workout,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// ================= GET ALL WORKOUTS =================
router.get("/all", async (req, res) => {
  try {
    const workouts = await Workout.find()
      .populate("trainer")
      .populate("assignedMember")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= GET SINGLE WORKOUT =================
router.get("/single/:id", async (req, res) => {
  try {
    const workout = await Workout.findById(
      req.params.id
    )
      .populate("trainer")
      .populate("assignedMember");

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    res.status(200).json({
      success: true,
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= UPDATE WORKOUT =================
router.put(
  "/update/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
      };

      if (req.body.exercises) {
        updateData.exercises = JSON.parse(
          req.body.exercises
        );
      }

      if (req.file) {
        updateData.image = req.file.filename;
      }

      const updatedWorkout =
        await Workout.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedWorkout) {
        return res.status(404).json({
          success: false,
          message: "Workout not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Workout updated successfully",
        workout: updatedWorkout,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// ================= DELETE WORKOUT =================
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedWorkout =
      await Workout.findByIdAndDelete(
        req.params.id
      );

    if (!deletedWorkout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;