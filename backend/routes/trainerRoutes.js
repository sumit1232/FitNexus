const express = require("express");
const router = express.Router();

const Trainer = require("../models/trainer.model");

const multer = require("multer");
const path = require("path");

// =====================
// Multer Config
// =====================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-")
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
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/addtrainer", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      specialization,
      experience,
      rating,
      joiningDate,
      status,
    } = req.body;

    const trainer = await Trainer.create({
      name,
      email,
      phone,
      specialization,
      experience,
      rating,
      joiningDate,
      status,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      trainer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/alltrainers", async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      trainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/singletrainer/:id", async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      trainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/updatetrainer/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      trainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/deletetrainer/:id", async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;