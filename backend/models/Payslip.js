const mongoose = require("mongoose");
const { Schema } = mongoose;

const payslipSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  salaryConfig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalaryConfig",
    required: true,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
    required: true,
  },
  baseSalary: {
    type: Number,
    required: true,
  },
  hra: {
    type: Number,
    default: 0,
  },
  bonus: {
    type: Number,
    default: 0,
  },
  pf: {
    type: Number,
    default: 0,
  },
  otherAllowances: {
    type: Number,
    default: 0,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  netPay: {
    type: Number,
    required: true,
  },
  generatedDate: {
    type: Date,
    default: Date.now,
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // HR/Admin who generated this
  },
  downloadLink: {
    type: String, // If you're storing generated PDF
    default: "",
  },
}, { timestamps: true });

payslipSchema.index({ employee: 1, month: 1, year: 1 }, { unique: true }); // Only one payslip per month per employee

module.exports = mongoose.model("Payslip", payslipSchema);
