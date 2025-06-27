const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Half Day"],
    default: "Present",
    required: true,
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Usually HR or Admin
    required: true,
  },
  remarks: {
    type: String,
    default: "",
  },
}, { timestamps: true });

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true }); // Ensure no duplicate attendance per day

module.exports = mongoose.model("Attendance", attendanceSchema);
