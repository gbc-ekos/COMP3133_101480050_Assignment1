import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  designation: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true,
    min: 1000
  },
  date_of_joining: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  employee_photo: {
    type: String  // Cloudinary image URL / path
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Employee', EmployeeSchema);
