const express = require('express');
const router = express.Router();

// Authenticate user middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    req.user = decoded;
    next();
  });
};

// Authenticate admin middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    req.user = decoded;
    next();
  });
};

// Get user activity report
router.get('/user-activity', authenticateToken, (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    // Mock user activity data
    const activityData = {
      totalClassesBooked: 24,
      totalClassesAttended: 22,
      totalPayments: 3,
      totalSpent: 179.97,
      favoriteClassType: 'Yoga',
      membershipStatus: 'Active',
      joinDate: '2024-01-15T00:00:00Z',
      lastActivity: '2024-02-12T09:00:00Z',
      streakDays: 15,
      achievements: [
        { name: 'First Class', description: 'Completed your first class', date: '2024-01-16' },
        { name: 'Week Warrior', description: 'Attended classes 7 days in a row', date: '2024-01-25' },
        { name: 'Consistency King', description: '15 day attendance streak', date: '2024-02-01' }
      ],
      monthlyStats: [
        { month: '2024-01', classesBooked: 8, classesAttended: 7, spent: 59.99 },
        { month: '2024-02', classesBooked: 16, classesAttended: 15, spent: 119.98 }
      ]
    };

    res.json({
      success: true,
      data: activityData,
      message: 'User activity report retrieved successfully'
    });
  } catch (error) {
    console.error('User activity report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate user activity report'
    });
  }
});

// Get class popularity report
router.get('/class-popularity', authenticateAdmin, (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;

    const popularityData = [
      { className: 'Morning Yoga', totalBookings: 245, attendanceRate: 89.2, revenue: 7350 },
      { className: 'HIIT Cardio', totalBookings: 198, attendanceRate: 91.8, revenue: 5920 },
      { className: 'Strength Training', totalBookings: 167, attendanceRate: 87.5, revenue: 5010 },
      { className: 'Pilates', totalBookings: 134, attendanceRate: 85.1, revenue: 4020 },
      { className: 'CrossFit', totalBookings: 123, attendanceRate: 94.3, revenue: 3690 },
      { className: 'Spin Class', totalBookings: 98, attendanceRate: 88.7, revenue: 2940 },
      { className: 'Boxing', totalBookings: 87, attendanceRate: 92.0, revenue: 2610 },
      { className: 'Zumba', totalBookings: 76, attendanceRate: 86.8, revenue: 2280 }
    ];

    // Sort by bookings and limit results
    const sortedData = popularityData
      .sort((a, b) => b.totalBookings - a.totalBookings)
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: sortedData,
      message: 'Class popularity report retrieved successfully'
    });
  } catch (error) {
    console.error('Class popularity report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate class popularity report'
    });
  }
});

// Get revenue report
router.get('/revenue', authenticateAdmin, (req, res) => {
  try {
    const { period = 'monthly', startDate, endDate } = req.query;

    let revenueData;

    if (period === 'monthly') {
      revenueData = [
        { period: '2024-01', revenue: 12500.50, memberships: 45, classes: 3200, personalTraining: 1800 },
        { period: '2024-02', revenue: 15200.75, memberships: 52, classes: 3800, personalTraining: 2100 },
        { period: '2024-03', revenue: 18900.25, memberships: 67, classes: 4200, personalTraining: 2400 },
        { period: '2024-04', revenue: 21300.00, memberships: 71, classes: 4600, personalTraining: 2600 },
        { period: '2024-05', revenue: 24100.50, memberships: 83, classes: 5100, personalTraining: 2900 },
        { period: '2024-06', revenue: 26700.75, memberships: 89, classes: 5500, personalTraining: 3100 }
      ];
    } else if (period === 'weekly') {
      revenueData = [
        { period: 'Week 1', revenue: 3200.25, memberships: 12, classes: 1200, personalTraining: 400 },
        { period: 'Week 2', revenue: 3800.50, memberships: 15, classes: 1400, personalTraining: 450 },
        { period: 'Week 3', revenue: 4100.75, memberships: 18, classes: 1500, personalTraining: 500 },
        { period: 'Week 4', revenue: 4500.00, memberships: 22, classes: 1600, personalTraining: 550 }
      ];
    }

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const totalMemberships = revenueData.reduce((sum, item) => sum + item.memberships, 0);

    res.json({
      success: true,
      data: {
        report: revenueData,
        summary: {
          totalRevenue,
          totalMemberships,
          averageRevenue: totalRevenue / revenueData.length,
          period
        }
      },
      message: 'Revenue report retrieved successfully'
    });
  } catch (error) {
    console.error('Revenue report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate revenue report'
    });
  }
});

// Get trainer performance report
router.get('/trainer-performance', authenticateAdmin, (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const trainerData = [
      {
        trainerId: 1,
        trainerName: 'Sarah Johnson',
        specialization: 'Yoga',
        totalClasses: 45,
        totalBookings: 380,
        averageRating: 4.8,
        attendanceRate: 92.1,
        revenue: 11400,
        studentRetention: 85.2
      },
      {
        trainerId: 2,
        trainerName: 'Mike Chen',
        specialization: 'HIIT',
        totalClasses: 38,
        totalBookings: 320,
        averageRating: 4.9,
        attendanceRate: 94.3,
        revenue: 9600,
        studentRetention: 88.7
      },
      {
        trainerId: 3,
        trainerName: 'Emma Davis',
        specialization: 'Pilates',
        totalClasses: 32,
        totalBookings: 280,
        averageRating: 4.7,
        attendanceRate: 89.8,
        revenue: 8400,
        studentRetention: 82.1
      },
      {
        trainerId: 4,
        trainerName: 'Alex Rodriguez',
        specialization: 'Strength Training',
        totalClasses: 41,
        totalBookings: 350,
        averageRating: 4.6,
        attendanceRate: 87.4,
        revenue: 10500,
        studentRetention: 79.5
      }
    ];

    res.json({
      success: true,
      data: trainerData,
      message: 'Trainer performance report retrieved successfully'
    });
  } catch (error) {
    console.error('Trainer performance report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate trainer performance report'
    });
  }
});

// Get membership analytics
router.get('/membership-analytics', authenticateAdmin, (req, res) => {
  try {
    const analyticsData = {
      totalMembers: 892,
      activeMembers: 756,
      inactiveMembers: 136,
      churnRate: 8.5,
      averageLifetime: 18.5, // months
      planDistribution: [
        { plan: 'Basic', count: 234, percentage: 26.2 },
        { plan: 'Premium', count: 345, percentage: 38.7 },
        { plan: 'VIP', count: 189, percentage: 21.2 },
        { plan: 'Student', count: 124, percentage: 13.9 }
      ],
      monthlyGrowth: [
        { month: '2024-01', newMembers: 45, churnedMembers: 8 },
        { month: '2024-02', newMembers: 52, churnedMembers: 12 },
        { month: '2024-03', newMembers: 67, churnedMembers: 15 },
        { month: '2024-04', newMembers: 71, churnedMembers: 18 },
        { month: '2024-05', newMembers: 83, churnedMembers: 22 },
        { month: '2024-06', newMembers: 89, churnedMembers: 25 }
      ],
      retentionByCohort: [
        { cohort: 'Jan 2024', month1: 100, month3: 92, month6: 85 },
        { cohort: 'Feb 2024', month1: 100, month3: 94, month6: null },
        { cohort: 'Mar 2024', month1: 100, month3: null, month6: null }
      ]
    };

    res.json({
      success: true,
      data: analyticsData,
      message: 'Membership analytics retrieved successfully'
    });
  } catch (error) {
    console.error('Membership analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate membership analytics'
    });
  }
});

// Export report as CSV/Excel (mock implementation)
router.get('/export/:type', authenticateAdmin, (req, res) => {
  try {
    const { type } = req.params;
    const { reportType, format = 'csv' } = req.query;

    // In a real implementation, this would generate and return actual CSV/Excel files
    const exportData = {
      reportType,
      format,
      generatedAt: new Date().toISOString(),
      status: 'success',
      downloadUrl: `/api/reports/exports/${reportType}_${Date.now()}.${format}`
    };

    res.json({
      success: true,
      data: exportData,
      message: `Report exported successfully as ${format.toUpperCase()}`
    });
  } catch (error) {
    console.error('Report export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export report'
    });
  }
});

module.exports = router;