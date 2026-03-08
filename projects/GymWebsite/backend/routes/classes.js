const express = require('express');
const router = express.Router();

const mockClasses = [
  { id: 1, name: 'Morning Yoga Flow', category: 'yoga', instructor: 'Sarah Johnson', duration: '60 min', difficulty: 'Beginner', description: 'Start your day with gentle stretches and mindful breathing', schedule: [{ day: 'Monday', time: '7:00 AM' }, { day: 'Wednesday', time: '7:00 AM' }, { day: 'Friday', time: '7:00 AM' }], maxCapacity: 25, currentBookings: 15, price: 'Free with membership' },
  { id: 2, name: 'High Energy Zumba', category: 'zumba', instructor: 'Maria Garcia', duration: '45 min', difficulty: 'All Levels', description: 'Dance your way to fitness with energetic Latin music', schedule: [{ day: 'Tuesday', time: '6:00 PM' }, { day: 'Thursday', time: '6:00 PM' }, { day: 'Saturday', time: '10:00 AM' }], maxCapacity: 30, currentBookings: 22, price: 'Free with membership' },
  { id: 3, name: 'CrossFit Bootcamp', category: 'crossfit', instructor: 'Mike Chen', duration: '60 min', difficulty: 'Advanced', description: 'Intense functional fitness workout combining strength and cardio', schedule: [{ day: 'Monday', time: '6:00 PM' }, { day: 'Wednesday', time: '6:00 PM' }, { day: 'Friday', time: '6:00 PM' }], maxCapacity: 20, currentBookings: 12, price: 'Free with membership' },
  { id: 4, name: 'HIIT Cardio Blast', category: 'cardio', instructor: 'Emma Wilson', duration: '30 min', difficulty: 'Intermediate', description: 'High-intensity interval training for maximum calorie burn', schedule: [{ day: 'Tuesday', time: '7:00 AM' }, { day: 'Thursday', time: '7:00 AM' }, { day: 'Saturday', time: '9:00 AM' }], maxCapacity: 25, currentBookings: 18, price: 'Free with membership' },
  { id: 5, name: 'Strength & Conditioning', category: 'strength', instructor: 'David Brown', duration: '75 min', difficulty: 'Intermediate', description: 'Build lean muscle and improve overall strength', schedule: [{ day: 'Monday', time: '5:00 PM' }, { day: 'Wednesday', time: '5:00 PM' }, { day: 'Friday', time: '5:00 PM' }], maxCapacity: 15, currentBookings: 8, price: 'Free with membership' },
  { id: 6, name: 'Pilates Core Focus', category: 'yoga', instructor: 'Dr. Lisa Anderson', duration: '50 min', difficulty: 'All Levels', description: 'Strengthen your core and improve posture with controlled movements', schedule: [{ day: 'Wednesday', time: '12:00 PM' }, { day: 'Friday', time: '12:00 PM' }, { day: 'Sunday', time: '10:00 AM' }], maxCapacity: 20, currentBookings: 14, price: 'Free with membership' },
  { id: 7, name: 'Power Cycling', category: 'cardio', instructor: 'Emma Wilson', duration: '45 min', difficulty: 'Intermediate', description: 'Indoor cycling with interval-based rides to build endurance', schedule: [{ day: 'Monday', time: '7:00 AM' }, { day: 'Wednesday', time: '7:00 AM' }, { day: 'Friday', time: '7:00 AM' }], maxCapacity: 30, currentBookings: 20, price: 'Free with membership' },
  { id: 8, name: 'Olympic Weightlifting', category: 'strength', instructor: 'Mike Chen', duration: '90 min', difficulty: 'Advanced', description: 'Learn proper Olympic lifts: snatch, clean and jerk', schedule: [{ day: 'Tuesday', time: '5:00 PM' }, { day: 'Thursday', time: '5:00 PM' }, { day: 'Saturday', time: '11:00 AM' }], maxCapacity: 12, currentBookings: 7, price: 'Free with membership' },
  { id: 9, name: 'Meditation & Breathwork', category: 'yoga', instructor: 'Sarah Johnson', duration: '30 min', difficulty: 'Beginner', description: 'Guided meditation and breathing exercises for stress relief', schedule: [{ day: 'Monday', time: '8:00 AM' }, { day: 'Wednesday', time: '8:00 AM' }, { day: 'Friday', time: '8:00 AM' }, { day: 'Sunday', time: '9:00 AM' }], maxCapacity: 30, currentBookings: 12, price: 'Free with membership' },
  { id: 10, name: 'Latin Cardio Dance', category: 'zumba', instructor: 'Maria Garcia', duration: '50 min', difficulty: 'Beginner', description: 'Fun and energetic dance workout with salsa and reggaeton beats', schedule: [{ day: 'Monday', time: '6:00 PM' }, { day: 'Wednesday', time: '6:00 PM' }, { day: 'Saturday', time: '11:00 AM' }], maxCapacity: 35, currentBookings: 25, price: 'Free with membership' },
  { id: 11, name: 'Functional Movement', category: 'crossfit', instructor: 'David Brown', duration: '60 min', difficulty: 'Intermediate', description: 'Movement patterns that improve daily life activities and athletic performance', schedule: [{ day: 'Tuesday', time: '6:00 AM' }, { day: 'Thursday', time: '6:00 AM' }, { day: 'Saturday', time: '8:00 AM' }], maxCapacity: 18, currentBookings: 10, price: 'Free with membership' },
  { id: 12, name: 'Evening Stretch & Recovery', category: 'yoga', instructor: 'Dr. Lisa Anderson', duration: '40 min', difficulty: 'Beginner', description: 'Gentle stretching and foam rolling for muscle recovery', schedule: [{ day: 'Monday', time: '8:00 PM' }, { day: 'Tuesday', time: '8:00 PM' }, { day: 'Thursday', time: '8:00 PM' }], maxCapacity: 25, currentBookings: 9, price: 'Free with membership' }
];

router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let filteredClasses = mockClasses;
    if (category && category !== 'all') {
      filteredClasses = mockClasses.filter(cls => cls.category === category);
    }
    res.json({ success: true, data: filteredClasses, message: 'Classes retrieved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching classes' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const classId = parseInt(req.params.id);
    const classItem = mockClasses.find(cls => cls.id === classId);
    if (!classItem) return res.status(404).json({ success: false, message: 'Class not found' });
    res.json({ success: true, data: classItem, message: 'Class retrieved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching class' });
  }
});

router.post('/:id/book', (req, res) => {
  try {
    const classId = parseInt(req.params.id);
    const classItem = mockClasses.find(cls => cls.id === classId);
    if (!classItem) return res.status(404).json({ success: false, message: 'Class not found' });
    if (classItem.currentBookings >= classItem.maxCapacity) {
      return res.status(400).json({ success: false, message: 'Class is full. No spots available.' });
    }
    classItem.currentBookings += 1;
    res.json({
      success: true,
      message: 'Class booked successfully!',
      data: { classId, bookingId: Date.now(), availableSpots: classItem.maxCapacity - classItem.currentBookings }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error booking class' });
  }
});

module.exports = router;