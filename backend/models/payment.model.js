const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
        invoiceNo: {
      type: String,
      unique: true,
      default: () =>
        "INV-" + Date.now(),
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Card",
        "Net Banking",
        "Razorpay",
      ],
      default: "Cash",
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    transactionId: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Paid",
    },

    notes: {
      type: String,
      default: "",
    },

    receiptNumber: {
      type: String,
      default: () =>
        "REC-" + Math.floor(Math.random() * 1000000),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);