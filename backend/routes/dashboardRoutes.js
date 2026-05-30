const express = require("express");
const router = express.Router();

const Member = require("../models/members.model");

// DASHBOARD STATS
router.get("/stats", async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      status: "Active",
    });

    const inactiveMembers = await Member.countDocuments({
      status: "Inactive",
    });

    res.json({
      totalMembers,
      activeMembers,
      inactiveMembers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MONTHLY MEMBER GROWTH (simple demo)
router.get("/monthly-members", async (req, res) => {
  try {
    const data = await Member.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/stats", async (req, res) => {
  const total = await Member.countDocuments();

  const active = await Member.countDocuments({
    status: { $regex: /^active$/i },
  });

  const inactive = await Member.countDocuments({
    status: { $regex: /^inactive$/i },
  });

  res.json({ total, active, inactive });
});

module.exports = router;