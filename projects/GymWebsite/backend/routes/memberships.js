const express = require('express');
const router = express.Router();

// Mock membership plans data
const membershipPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 29.99,
    period: 'month',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      'Access to gym equipment',
      'Locker room access',
      'Basic fitness assessment',
      'Group fitness classes',
      'Mobile app access',
      'Free Wi-Fi'
    ],
    popular: false,
    maxGuests: 0,
    personalTrainingSessions: 0
  },
  {
    name: 'Premium',
    price: 59.99,
    period: 'month',
    description: 'Most popular choice for serious fitness enthusiasts',
    features: [
      'Everything in Basic',
      'Personal training sessions (2/month)',
      'Nutrition consultation',
      'Advanced fitness assessment',
      'Priority class booking',
      'Guest passes (2/month)',
      'Towel service'
    ],
    popular: true,
    maxGuests: 2,
    personalTrainingSessions: 2
  },
  {
    name: 'VIP',
    price: 99.99,
    period: 'month',
    description: 'Ultimate fitness experience with premium amenities',
    features: [
      'Everything in Premium',
      'Unlimited personal training',
      'Custom meal planning',
      'Body composition analysis',
      'Unlimited guest passes',
      'Exclusive VIP area access',
      '24/7 gym access',
      'Massage therapy (1/month)'
    ],
    popular: false,
    maxGuests: -1, // unlimited
    personalTrainingSessions: -1 // unlimited
  }
];

// Get all membership plans
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: membershipPlans,
      message: 'Membership plans retrieved successfully'
    });
  } catch (error) {
    console.error('Memberships fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch membership plans'
    });
  }
});

// Get specific membership plan
router.get('/:id', (req, res) => {
  try {
    const planId = parseInt(req.params.id);
    const plan = membershipPlans.find(p => p.id === planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Membership plan not found'
      });
    }

    res.json({
      success: true,
      data: plan,
      message: 'Membership plan retrieved successfully'
    });
  } catch (error) {
    console.error('Membership fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch membership plan'
    });
  }
});

module.exports = router;