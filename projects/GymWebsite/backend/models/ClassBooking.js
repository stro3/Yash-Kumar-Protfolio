const mongoose = require('mongoose');

const classBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['confirmed', 'waitlist', 'cancelled', 'completed', 'no_show'],
    default: 'confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'refunded', 'free'],
    default: 'free'
  },
  paymentAmount: {
    type: Number,
    default: 0
  },
  cancellationReason: String,
  cancellationDate: Date,
  attendanceMarked: {
    type: Boolean,
    default: false
  },
  attendanceTime: Date,
  notes: String,
  reminderSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index to prevent double booking
classBookingSchema.index({ 
  user: 1, 
  class: 1, 
  bookingDate: 1, 
  'timeSlot.startTime': 1 
}, { unique: true });

// Index for efficient queries
classBookingSchema.index({ bookingDate: 1, status: 1 });
classBookingSchema.index({ user: 1, status: 1 });

// Check if booking can be cancelled (24 hours before class)
classBookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const classDateTime = new Date(this.bookingDate);
  const [hours, minutes] = this.timeSlot.startTime.split(':');
  classDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  const timeDiff = classDateTime - now;
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  
  return hoursDiff >= 24;
};

module.exports = mongoose.model('ClassBooking', classBookingSchema);