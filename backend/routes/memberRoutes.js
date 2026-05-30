// routes/memberRoutes.js

const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const Member = require("../models/members.model.js");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

router.post(
  "/addmember",
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        age,
        gender,
        address,
        membership,
        joiningDate,
        status,
        emergencyContact,
        medicalIssues,
        height,
        weight,
        bmi,
        trainer,
      } = req.body;
      const existingMember = await Member.findOne({
        $or: [{ email }, { phone }],
      });

      if (existingMember) {
        return res.status(400).json({
          success: false,
          message: "Member already exists",
        });
      }
      const image = req.file
        ? req.file.filename
        : "";

      const newMember = new Member({
        name,
        email,
        phone,
        age,
        gender,
        address,
        membership,
        joiningDate,
        status,
        emergencyContact,
        medicalIssues,
        height,
        weight,
        bmi,
        trainer,
        image,
      });

      await newMember.save();

      res.status(201).json({
        success: true,
        message: "Member added successfully",
        member: newMember,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.get("/allmembers", async (req, res) => {
  try {
    const members = await Member.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/singlemember/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put(
  "/updatemember/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
      };

      if (req.file) {
        updateData.image = req.file.filename;
      }

      const updatedMember =
        await Member.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedMember) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Member updated successfully",
        member: updatedMember,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.delete(
  "/deletemember/:id",
  async (req, res) => {
    try {
      const deletedMember =
        await Member.findByIdAndDelete(
          req.params.id
        );

      if (!deletedMember) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Member deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;