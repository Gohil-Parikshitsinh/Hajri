const mongoose = require("mongoose");
const { Schema } = mongoose;

const salaryConfigSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // One salary config per employee
  },
  baseSalary: {
    type: Number,
    required: true,
  },
  hra: {
    type: Number,
    default: 0, // House Rent Allowance
  },
  bonus: {
    type: Number,
    default: 0,
  },
  pf: {
    type: Number,
    default: 0, // Provident Fund
  },
  otherAllowances: {
    type: Number,
    default: 0,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  effectiveFrom: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // HR/Admin who configured it
  },
}, { timestamps: true });

module.exports = mongoose.model("SalaryConfig", salaryConfigSchema);
