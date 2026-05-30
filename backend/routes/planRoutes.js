const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const Plan = require("../models/plan.model");

// =====================
// MULTER CONFIG
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-")
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mime = file.mimetype.startsWith("image/");

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// =====================
// CREATE PLAN
// =====================
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      price,
      duration,
      description,
      type,
      accessLevel,
      isFreezeAllowed,
    } = req.body;

    const plan = await Plan.create({
      name,
      price,
      duration,
      description,
      type,
      accessLevel,
      isFreezeAllowed,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =====================
// GET ALL PLANS
// =====================
router.get("/all", async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: plans.length,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =====================
// GET SINGLE PLAN
// =====================
router.get("/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =====================
// UPDATE PLAN
// =====================
router.put(
  "/update/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (req.file) {
        updateData.image = req.file.filename;
      }

      const plan = await Plan.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Plan updated successfully",
        plan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// =====================
// DELETE PLAN
// =====================
router.delete("/delete/:id", async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;