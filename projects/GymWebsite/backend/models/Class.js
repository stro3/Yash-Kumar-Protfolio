const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Class description is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['yoga', 'zumba', 'crossfit', 'weight_training', 'cardio', 'pilates', 'martial_arts', 'swimming', 'spinning']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  schedule: [{
    dayOfWeek: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true // Format: "HH:MM"
    },
    endTime: {
      type: String,
      required: true // Format: "HH:MM"
    }
  }],
  duration: {
    type: Number, // in minutes
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  equipment: [{
    type: String
  }],
  price: {
    type: Number,
    default: 0 // 0 for included in membership
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  prerequisites: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  location: {
    room: String,
    floor: String,
    building: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
classSchema.index({ category: 1, isActive: 1 });
classSchema.index({ instructor: 1 });

module.exports = mongoose.model('Class', classSchema);