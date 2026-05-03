const express = require('express');
const jwt = require('jsonwebtoken');
const Notification = require('../models/Notification');
const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access token required' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

router.get('/', authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.userId },
      order: [['createdAt', 'DESC']],
      limit: 50
    });
    const unreadCount = notifications.filter(n => !n.isRead).length;
    res.json({
      success: true,
      data: { notifications, total: notifications.length, unreadCount }
    });
  } catch (error) {
    console.error('Notifications fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
});

router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    await Notification.update({ isRead: true }, {
      where: { id: req.params.id, userId: req.user.userId }
    });
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notification' });
  }
});

router.put('/read-all', authenticateToken, async (req, res) => {
  try {
    await Notification.update({ isRead: true }, {
      where: { userId: req.user.userId, isRead: false }
    });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notifications' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Notification.destroy({
      where: { id: req.params.id, userId: req.user.userId }
    });
    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete notification' });
  }
});

router.get('/settings', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      emailNotifications: true,
      pushNotifications: true,
      classReminders: true,
      paymentNotifications: true,
      trainerMessages: true,
      marketingEmails: false
    }
  });
});

router.put('/settings', authenticateToken, (req, res) => {
  res.json({ success: true, data: req.body, message: 'Settings updated' });
});

module.exports = router;