const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["Sick", "Casual", "Paid", "Unpaid", "Maternity", "Other"],
    default: "Paid",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // HR/Admin
    default: null,
  },
  reviewedAt: {
    type: Date,
    default: null,
  },
  remarks: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);
