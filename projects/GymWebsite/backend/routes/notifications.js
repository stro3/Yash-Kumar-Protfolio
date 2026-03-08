const express = require('express');
const router = express.Router();

// Mock notifications data
let notifications = [
  {
    id: 1,
    userId: 1,
    type: 'class_reminder',
    title: 'Class Reminder',
    message: 'Your Morning Yoga class starts in 30 minutes',
    isRead: false,
    createdAt: '2024-02-12T08:30:00Z',
    scheduledFor: '2024-02-12T09:00:00Z'
  },
  {
    id: 2,
    userId: 1,
    type: 'payment_success',
    title: 'Payment Successful',
    message: 'Your membership payment of $59.99 has been processed',
    isRead: true,
    createdAt: '2024-02-10T14:20:00Z'
  },
  {
    id: 3,
    userId: 2,
    type: 'trainer_message',
    title: 'Message from Trainer',
    message: 'Sarah Johnson: Don\'t forget to bring your yoga mat tomorrow!',
    isRead: false,
    createdAt: '2024-02-11T16:00:00Z'
  }
];

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

// Get user notifications
router.get('/', authenticateToken, (req, res) => {
  try {
    const { page = 1, limit = 10, unreadOnly = false } = req.query;
    const userId = req.user.id;

    let userNotifications = notifications.filter(n => n.userId === userId);

    // Filter unread only
    if (unreadOnly === 'true') {
      userNotifications = userNotifications.filter(n => !n.isRead);
    }

    // Sort by creation date (newest first)
    userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNotifications = userNotifications.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        notifications: paginatedNotifications,
        total: userNotifications.length,
        unreadCount: userNotifications.filter(n => !n.isRead).length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(userNotifications.length / limit)
      },
      message: 'Notifications retrieved successfully'
    });
  } catch (error) {
    console.error('Notifications fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notificationIndex = notifications.findIndex(
      n => n.id === parseInt(id) && n.userId === userId
    );

    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notifications[notificationIndex].isRead = true;

    res.json({
      success: true,
      data: notifications[notificationIndex],
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read'
    });
  }
});

// Mark all notifications as read
router.put('/read-all', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;

    notifications.forEach(notification => {
      if (notification.userId === userId && !notification.isRead) {
        notification.isRead = true;
      }
    });

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Mark all notifications read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read'
    });
  }
});

// Delete notification
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notificationIndex = notifications.findIndex(
      n => n.id === parseInt(id) && n.userId === userId
    );

    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    const deletedNotification = notifications.splice(notificationIndex, 1)[0];

    res.json({
      success: true,
      data: deletedNotification,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification'
    });
  }
});

// Create notification (for internal use - trainers/admins)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { userId, type, title, message, scheduledFor } = req.body;

    // Only trainers and admins can create notifications
    if (!['trainer', 'admin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Only trainers and admins can create notifications'
      });
    }

    const newNotification = {
      id: notifications.length + 1,
      userId: parseInt(userId),
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      scheduledFor: scheduledFor || null
    };

    notifications.push(newNotification);

    res.status(201).json({
      success: true,
      data: newNotification,
      message: 'Notification created successfully'
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification'
    });
  }
});

// Get notification settings for user
router.get('/settings', authenticateToken, (req, res) => {
  try {
    // Mock settings - in real app, this would be stored in database
    const settings = {
      emailNotifications: true,
      pushNotifications: true,
      classReminders: true,
      paymentNotifications: true,
      trainerMessages: true,
      marketingEmails: false
    };

    res.json({
      success: true,
      data: settings,
      message: 'Notification settings retrieved successfully'
    });
  } catch (error) {
    console.error('Notification settings fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification settings'
    });
  }
});

// Update notification settings
router.put('/settings', authenticateToken, (req, res) => {
  try {
    const {
      emailNotifications,
      pushNotifications,
      classReminders,
      paymentNotifications,
      trainerMessages,
      marketingEmails
    } = req.body;

    // In real app, save to database
    const updatedSettings = {
      emailNotifications: emailNotifications ?? true,
      pushNotifications: pushNotifications ?? true,
      classReminders: classReminders ?? true,
      paymentNotifications: paymentNotifications ?? true,
      trainerMessages: trainerMessages ?? true,
      marketingEmails: marketingEmails ?? false
    };

    res.json({
      success: true,
      data: updatedSettings,
      message: 'Notification settings updated successfully'
    });
  } catch (error) {
    console.error('Notification settings update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification settings'
    });
  }
});

module.exports = router;