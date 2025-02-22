const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters long'],
    maxlength: [50, 'Full name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: [true, 'Role is required'],
  },
  specialization: {
    type: String,
    required: function() { return this.role === 'teacher'; },
    trim: true,
    maxlength: [100, 'Specialization cannot exceed 100 characters'],
  },
  courses: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  privateKey: {
    type: String,
    select: false, // Hide this field by default when querying the database
  },
  symmetricKey: {
    type: String,
    select: false, // Hide this field by default when querying the database
  },
});

// Middleware to update the `updatedAt` field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model('User', userSchema);