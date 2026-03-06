const express = require('express');
const router = express.Router();

// Mock data for trainers
const mockTrainers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Head Yoga Instructor',
    specialties: ['yoga', 'nutrition'],
    experience: '8 years',
    certifications: ['RYT 500', 'Certified Nutrition Coach', 'Prenatal Yoga'],
    bio: 'Sarah brings mindfulness and wellness to every session. With over 8 years of experience, she specializes in Hatha, Vinyasa, and therapeutic yoga.',
    achievements: ['500+ students trained', 'Featured in Yoga Journal', 'Wellness retreat leader'],
    image: '/api/placeholder/300/400',
    rating: 4.9,
    reviews: 127,
    availability: 'Mon-Fri: 6AM-2PM',
    languages: ['English', 'Spanish'],
    sessionPrice: '$75/hour'
  },
  {
    id: 2,
    name: 'Mike Chen',
    title: 'CrossFit & Strength Coach',
    specialties: ['crossfit', 'strength'],
    experience: '10 years',
    certifications: ['CrossFit Level 3', 'NASM-CPT', 'Olympic Weightlifting'],
    bio: 'Mike is a former competitive athlete who brings intensity and precision to strength training. He helps clients achieve their peak performance.',
    achievements: ['Regional CrossFit competitor', '200+ athletes coached', 'Strength training specialist'],
    image: '/api/placeholder/300/400',
    rating: 4.8,
    reviews: 89,
    availability: 'Mon-Sat: 5AM-8PM',
    languages: ['English', 'Mandarin'],
    sessionPrice: '$85/hour'
  },
  {
    id: 3,
    name: 'Maria Garcia',
    title: 'Dance & Cardio Specialist',
    specialties: ['cardio'],
    experience: '6 years',
    certifications: ['Zumba Instructor', 'ACSM Certified', 'Dance Fitness'],
    bio: 'Maria makes fitness fun through dance and high-energy cardio workouts. Her classes are known for their positive energy and results.',
    achievements: ['Zumba Master Trainer', '1000+ class hours', 'Community fitness advocate'],
    image: '/api/placeholder/300/400',
    rating: 4.9,
    reviews: 156,
    availability: 'Tue-Sun: 9AM-6PM',
    languages: ['English', 'Spanish', 'Portuguese'],
    sessionPrice: '$70/hour'
  },
  {
    id: 4,
    name: 'David Brown',
    title: 'Strength & Conditioning Coach',
    specialties: ['strength', 'cardio'],
    experience: '12 years',
    certifications: ['CSCS', 'USAW Level 2', 'FMS Certified'],
    bio: 'David specializes in functional movement and injury prevention. His scientific approach helps clients build strength safely and effectively.',
    achievements: ['Former college athlete', 'Injury prevention specialist', '300+ transformations'],
    image: '/api/placeholder/300/400',
    rating: 4.7,
    reviews: 203,
    availability: 'Mon-Fri: 6AM-7PM',
    languages: ['English'],
    sessionPrice: '$80/hour'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    title: 'HIIT & Functional Training',
    specialties: ['cardio', 'strength'],
    experience: '5 years',
    certifications: ['NASM-CPT', 'TRX Certified', 'Kettlebell Specialist'],
    bio: 'Emma creates challenging and effective HIIT workouts that maximize results in minimal time. Perfect for busy professionals.',
    achievements: ['HIIT specialist', 'Corporate wellness trainer', '150+ client success stories'],
    image: '/api/placeholder/300/400',
    rating: 4.8,
    reviews: 92,
    availability: 'Mon-Thu: 6AM-8PM, Sat: 8AM-2PM',
    languages: ['English', 'French'],
    sessionPrice: '$75/hour'
  },
  {
    id: 6,
    name: 'Dr. Lisa Anderson',
    title: 'Pilates & Rehabilitation Specialist',
    specialties: ['yoga', 'nutrition'],
    experience: '15 years',
    certifications: ['Physical Therapist', 'Pilates Instructor', 'Nutrition Counselor'],
    bio: 'Dr. Anderson combines her medical background with fitness expertise to help clients recover from injuries and improve their overall health.',
    achievements: ['Licensed Physical Therapist', 'Rehabilitation specialist', 'Published researcher'],
    image: '/api/placeholder/300/400',
    rating: 5.0,
    reviews: 68,
    availability: 'Mon-Wed-Fri: 10AM-4PM',
    languages: ['English', 'German'],
    sessionPrice: '$100/hour'
  }
];

// Get all trainers
router.get('/', (req, res) => {
  try {
    const { specialty } = req.query;
    
    let filteredTrainers = mockTrainers;
    if (specialty && specialty !== 'all') {
      filteredTrainers = mockTrainers.filter(trainer => 
        trainer.specialties.includes(specialty)
      );
    }
    
    res.json({
      success: true,
      data: filteredTrainers,
      message: 'Trainers retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching trainers'
    });
  }
});

// Get trainer by ID
router.get('/:id', (req, res) => {
  try {
    const trainerId = parseInt(req.params.id);
    const trainer = mockTrainers.find(trainer => trainer.id === trainerId);
    
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      });
    }
    
    res.json({
      success: true,
      data: trainer,
      message: 'Trainer retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching trainer:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching trainer'
    });
  }
});

// Contact trainer (placeholder)
router.post('/:id/contact', (req, res) => {
  try {
    const trainerId = parseInt(req.params.id);
    const trainer = mockTrainers.find(trainer => trainer.id === trainerId);
    
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      });
    }
    
    const { serviceType, preferredDate, message } = req.body;
    
    // In a real app, this would save to database and send email
    res.json({
      success: true,
      message: 'Message sent successfully! The trainer will contact you soon.',
      data: {
        trainerId: trainerId,
        contactRequestId: Date.now(), // Mock contact request ID
        serviceType,
        preferredDate,
        message
      }
    });
  } catch (error) {
    console.error('Error contacting trainer:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message to trainer'
    });
  }
});

// Get trainer availability
router.get('/:id/availability', (req, res) => {
  try {
    const trainerId = parseInt(req.params.id);
    const trainer = mockTrainers.find(trainer => trainer.id === trainerId);
    
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      });
    }
    
    // Mock availability data
    const availability = {
      trainerId: trainerId,
      schedule: trainer.availability,
      sessionPrice: trainer.sessionPrice,
      languages: trainer.languages,
      nextAvailable: '2024-12-10T09:00:00Z' // Mock next available slot
    };
    
    res.json({
      success: true,
      data: availability,
      message: 'Trainer availability retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching trainer availability:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching trainer availability'
    });
  }
});

module.exports = router;