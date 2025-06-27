const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  fatherName: { type: String },
  motherName: { type: String },
  dob: { type: Date },
  bloodGroup: { type: String },
  medicalDetails: { type: String },
  nationality: { type: String },
  permanentAddress: { type: String },
  currentAddress: { type: String },
  mobileNumber: { type: String, required: false },
  alternateMobileNumber: { type: String },
  email: { type: String, required: true, unique: true },
  maritalStatus: { type: String, enum: ['single', 'married', 'other'] },
  emergencyContactName: { type: String },
  emergencyContactMobileNumber: { type: String },
  aadhaarNumber: { type: String },
  panNumber: { type: String },
  passport: { type: String },
  educationQualification: { type: String },
  previousEmploymentDetails: { type: String },

  doj: { type: Date },
  designation: { type: String },
  department: { type: String },
  reportingManager: { type: String },

  bankDetails: {
    accountNumber: { type: String },
    ifsc: { type: String },
    bankName: { type: String },
    branch: { type: String },
  },

  photo: { type: String },

  role: { type: String, enum: ['admin', 'hr', 'employee'], default: 'employee' },
  password: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null },
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);