const express = require('express');
const router = express.Router();

// Mock data for admin dashboard
let adminStats = {
  totalUsers: 1247,
  activeMemberships: 892,
  totalRevenue: 45678.90,
  monthlyRevenue: 12345.67,
  totalClasses: 156,
  bookedClasses: 89,
  totalTrainers: 12,
  pendingPayments: 23
};

let users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'member',
    membershipPlan: 'Premium',
    membershipStatus: 'active',
    joinDate: '2024-01-15T00:00:00Z',
    lastLogin: '2024-02-10T14:30:00Z',
    isActive: true
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    role: 'trainer',
    specialization: 'Yoga',
    joinDate: '2024-01-20T00:00:00Z',
    lastLogin: '2024-02-12T09:15:00Z',
    isActive: true
  }
];

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

// Get admin dashboard stats
router.get('/stats', authenticateAdmin, (req, res) => {
  try {
    res.json({
      success: true,
      data: adminStats,
      message: 'Admin stats retrieved successfully'
    });
  } catch (error) {
    console.error('Admin stats fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin stats'
    });
  }
});

// Get all users (admin only)
router.get('/users', authenticateAdmin, (req, res) => {
  try {
    const { role, status, page = 1, limit = 10 } = req.query;

    let filteredUsers = users;

    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter(u => u.role === role);
    }

    // Filter by status
    if (status) {
      if (status === 'active') {
        filteredUsers = filteredUsers.filter(u => u.isActive);
      } else if (status === 'inactive') {
        filteredUsers = filteredUsers.filter(u => !u.isActive);
      }
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        users: paginatedUsers,
        total: filteredUsers.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(filteredUsers.length / limit)
      },
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Update user status
router.put('/users/:id/status', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    users[userIndex].isActive = isActive;

    res.json({
      success: true,
      data: users[userIndex],
      message: 'User status updated successfully'
    });
  } catch (error) {
    console.error('User status update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status'
    });
  }
});

// Get revenue analytics
router.get('/analytics/revenue', authenticateAdmin, (req, res) => {
  try {
    const { period = 'monthly' } = req.query;

    // Mock revenue data
    const revenueData = {
      monthly: [
        { month: '2024-01', revenue: 12500, memberships: 45 },
        { month: '2024-02', revenue: 15200, memberships: 52 },
        { month: '2024-03', revenue: 18900, memberships: 67 },
        { month: '2024-04', revenue: 21300, memberships: 71 },
        { month: '2024-05', revenue: 24100, memberships: 83 },
        { month: '2024-06', revenue: 26700, memberships: 89 }
      ],
      weekly: [
        { week: 'Week 1', revenue: 3200, memberships: 12 },
        { week: 'Week 2', revenue: 3800, memberships: 15 },
        { week: 'Week 3', revenue: 4100, memberships: 18 },
        { week: 'Week 4', revenue: 4500, memberships: 22 }
      ]
    };

    res.json({
      success: true,
      data: revenueData[period] || revenueData.monthly,
      message: 'Revenue analytics retrieved successfully'
    });
  } catch (error) {
    console.error('Revenue analytics fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch revenue analytics'
    });
  }
});

// Get class attendance analytics
router.get('/analytics/attendance', authenticateAdmin, (req, res) => {
  try {
    const attendanceData = [
      { className: 'Morning Yoga', totalBookings: 120, attendance: 95, rate: 79.2 },
      { className: 'HIIT Cardio', totalBookings: 85, attendance: 78, rate: 91.8 },
      { className: 'Strength Training', totalBookings: 65, attendance: 58, rate: 89.2 },
      { className: 'Pilates', totalBookings: 45, attendance: 40, rate: 88.9 },
      { className: 'CrossFit', totalBookings: 55, attendance: 52, rate: 94.5 }
    ];

    res.json({
      success: true,
      data: attendanceData,
      message: 'Attendance analytics retrieved successfully'
    });
  } catch (error) {
    console.error('Attendance analytics fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance analytics'
    });
  }
});

// Get recent activities
router.get('/activities', authenticateAdmin, (req, res) => {
  try {
    const activities = [
      {
        id: 1,
        type: 'user_registered',
        description: 'New user John Doe registered',
        timestamp: '2024-02-12T10:30:00Z',
        user: 'John Doe'
      },
      {
        id: 2,
        type: 'payment_received',
        description: 'Payment of $59.99 received from Jane Smith',
        timestamp: '2024-02-12T09:15:00Z',
        user: 'Jane Smith'
      },
      {
        id: 3,
        type: 'class_booked',
        description: 'Mike Chen booked CrossFit class',
        timestamp: '2024-02-11T16:45:00Z',
        user: 'Mike Chen'
      },
      {
        id: 4,
        type: 'trainer_contact',
        description: 'Sarah Johnson contacted trainer',
        timestamp: '2024-02-11T14:20:00Z',
        user: 'Sarah Johnson'
      }
    ];

    res.json({
      success: true,
      data: activities,
      message: 'Recent activities retrieved successfully'
    });
  } catch (error) {
    console.error('Activities fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities'
    });
  }
});

module.exports = router;