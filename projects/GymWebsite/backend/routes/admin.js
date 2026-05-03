const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ClassBooking = require('../models/ClassBooking');
const Notification = require('../models/Notification');
const { Op } = require('sequelize');
const router = express.Router();

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token' });
    try {
      const user = await User.findByPk(decoded.userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
      }
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
};

router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalMembers = await User.count({ where: { role: 'member' } });
    const activeMembers = await User.count({ where: { role: 'member', isActive: true } });
    const totalBookings = await ClassBooking.count();
    const totalTrainers = await User.count({ where: { role: 'trainer' } });
    const recentSignups = await User.count({
      where: { createdAt: { [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }
    });

    res.json({
      success: true,
      data: {
        totalMembers,
        activeMembers,
        totalBookings,
        totalTrainers,
        recentSignups,
        monthlyRevenue: totalMembers * 2499,
        totalRevenue: totalMembers * 2499 * 6
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

router.get('/members', authenticateAdmin, async (req, res) => {
  try {
    const { search, page = 1, limit = 50 } = req.query;
    const where = { role: { [Op.ne]: 'admin' } };
    if (search) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } }
      ];
    }

    const users = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: { users: users.rows, total: users.count }
    });
  } catch (error) {
    console.error('Admin members error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch members' });
  }
});

router.get('/bookings', authenticateAdmin, async (req, res) => {
  try {
    const bookings = await ClassBooking.findAll({ order: [['createdAt', 'DESC']], limit: 100 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

router.put('/members/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;
    await User.update({ isActive }, { where: { id: req.params.id } });
    res.json({ success: true, message: 'Member status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

router.post('/notify', authenticateAdmin, async (req, res) => {
  try {
    const { userId, title, message, type } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const notification = await Notification.create({
      userId,
      type: type || 'admin_reminder',
      title,
      message,
      channel: 'app'
    });

    const whatsappLink = user.phone
      ? `https://wa.me/${user.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
      : null;

    res.json({
      success: true,
      message: 'Notification sent',
      data: { notification, whatsappLink }
    });
  } catch (error) {
    console.error('Notify error:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification' });
  }
});

router.post('/notify-expiring', authenticateAdmin, async (req, res) => {
  try {
    const members = await User.findAll({
      where: { role: 'member', isActive: true },
      attributes: { exclude: ['password'] }
    });

    let notified = 0;
    for (const member of members) {
      await Notification.create({
        userId: member.id,
        type: 'membership_expiry',
        title: 'Membership Renewal Reminder',
        message: `Hi ${member.firstName}, your GymFit Pro membership is expiring soon. Renew now to continue your fitness journey.`,
        channel: 'app'
      });
      notified++;
    }

    res.json({ success: true, message: `Sent ${notified} renewal reminders` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send reminders' });
  }
});

module.exports = router;