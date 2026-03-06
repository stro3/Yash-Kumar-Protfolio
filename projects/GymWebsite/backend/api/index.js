const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('../config/database');
require('dotenv').config();

const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/users');
const membershipRoutes = require('../routes/memberships');
const classRoutes = require('../routes/classes');
const trainerRoutes = require('../routes/trainers');
const paymentRoutes = require('../routes/payments');
const blogRoutes = require('../routes/blog');

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/blog', blogRoutes);

app.get('/api/health', async (req, res) => {
    res.status(200).json({
        message: 'Server is running!',
        database: 'SQLite (Embedded)',
        timestamp: new Date().toISOString()
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

let dbInitialized = false;

const initializeDB = async () => {
    if (!dbInitialized) {
        try {
            const dbConnected = await connectDB();
            if (dbConnected) {
                console.log('Database setup completed');
                dbInitialized = true;
            } else {
                console.error('Database setup failed');
            }
        } catch (error) {
            console.error('Failed to initialize database:', error);
        }
    }
};

module.exports = async (req, res) => {
    await initializeDB();
    return app(req, res);
};
