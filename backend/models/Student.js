const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentid: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  isactive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Student', studentSchema);
