const { connectDB } = require('./config/database');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ where: { email: 'admin@gymfit.com' } });
    if (existing) {
      console.log('Admin account already exists');
      process.exit(0);
    }

    await User.create({
      firstName: 'Admin',
      lastName: 'GymFit',
      email: 'admin@gymfit.com',
      password: 'admin123',
      phone: '+919999999999',
      role: 'admin',
      isActive: true,
      authProvider: 'local'
    });

    console.log('Admin account created successfully');
    console.log('Email: admin@gymfit.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedAdmin();
