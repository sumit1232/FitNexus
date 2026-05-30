// routes/paymentRoutes.js

const express = require("express");
const router = express.Router();

const Payment = require("../models/payment.model");

// ================= ADD PAYMENT =================
router.post("/add", async (req, res) => {
  try {
    const {
      member,
      plan,
      amount,
      paymentMethod,
      paymentDate,
      startDate,
      endDate,
      transactionId,
      status,
      notes,
    } = req.body;

    // ================= VALIDATION =================
    if (
      !member ||
      !plan ||
      !amount ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const payment = await Payment.create({
      member,
      plan,
      amount,
      paymentMethod,
      paymentDate,
      startDate,
      endDate,
      transactionId,
      status,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Payment added successfully",
      payment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= GET ALL PAYMENTS =================
router.get("/all", async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("member", "name email phone")
      .populate("plan", "name price duration")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: payments.length,
      payments,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= GET SINGLE PAYMENT =================
router.get("/single/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(
      req.params.id
    )
      .populate("member", "name email phone")
      .populate("plan", "name price duration");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= UPDATE PAYMENT =================
router.put("/update/:id", async (req, res) => {
  try {
    const updatedPayment =
      await Payment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= DELETE PAYMENT =================
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPayment =
      await Payment.findByIdAndDelete(
        req.params.id
      );

    if (!deletedPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= TOTAL REVENUE =================
router.get("/total", async (req, res) => {
  try {
    const payments = await Payment.find({
      status: "Paid",
    });

    const totalRevenue = payments.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    res.status(200).json({
      success: true,
      total: totalRevenue,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;