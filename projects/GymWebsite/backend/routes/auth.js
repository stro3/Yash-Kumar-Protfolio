const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { sendWelcomeEmail, sendGoogleSignupEmail } = require('../services/emailService');
const router = express.Router();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Authenticate JWT token middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

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

// Register new user
router.post('/register', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('role').optional().isIn(['member', 'trainer', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    console.log('📝 Registration attempt:', { body: req.body });
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password, phone, dateOfBirth, gender, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    console.log('✅ Creating new user:', { firstName, lastName, email, phone });
    // Build user data object, only including optional fields if they exist
    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      role: role || 'member'
    };

    if (dateOfBirth) {
      userData.dateOfBirth = dateOfBirth;
    }
    if (gender) {
      userData.gender = gender;
    }

    const user = await User.create(userData);

    // Generate token
    const token = generateToken(user.id);

    // Return user data without password
    const userResponse = user.toJSON();
    
    console.log('✅ Registration successful for:', email);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user).catch(err => console.error('Email send failed:', err));

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }
    
    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user,
      message: 'Profile retrieved successfully'
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

// Login user
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    console.log('🔐 Login attempt:', { email: req.body.email });
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      console.log('❌ User account inactive:', email);
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user.id);

    // Return user data without password
    const userResponse = user.toJSON();
    
    console.log('✅ Login successful for:', email);
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return user data without password
    const userResponse = user.toJSON();

    res.json({
      success: true,
      data: { user: userResponse }
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Forgot password (placeholder for future implementation)
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email'
      });
    }

    // TODO: Implement email sending for password reset
    // For now, just return success message
    res.json({
      success: true,
      message: 'Password reset instructions sent to your email'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Google OAuth - verify Google access token and create/login user
router.post('/google', async (req, res) => {
  try {
    const { credential, userInfo } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential token is required'
      });
    }

    // Verify the access token with Google's tokeninfo endpoint
    const https = require('https');
    const tokenVerification = await new Promise((resolve, reject) => {
      https.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(credential)}`, (resp) => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse Google response'));
          }
        });
      }).on('error', reject);
    });

    if (tokenVerification.error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Google access token'
      });
    }

    // Use userInfo sent from frontend (already fetched from Google's userinfo endpoint)
    const email = userInfo?.email || tokenVerification.email;
    const googleId = userInfo?.sub || tokenVerification.sub;
    const given_name = userInfo?.given_name || 'User';
    const family_name = userInfo?.family_name || '';
    const picture = userInfo?.picture || '';

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Could not retrieve email from Google account'
      });
    }

    console.log('🔐 Google auth attempt for:', email);

    // Check if user already exists with this Google ID or email
    let user = await User.findOne({ where: { googleId } });
    let isNewUser = false;

    if (!user) {
      // Check by email
      user = await User.findOne({ where: { email } });

      if (user) {
        // Link Google account to existing user
        user.googleId = googleId;
        user.authProvider = user.authProvider === 'local' ? 'both' : 'google';
        if (picture && !user.profileImage) {
          user.profileImage = picture;
        }
        await user.save();
        console.log('✅ Linked Google account to existing user:', email);
      } else {
        // Create new user from Google data
        user = await User.create({
          firstName: given_name,
          lastName: family_name,
          email,
          googleId,
          authProvider: 'google',
          profileImage: picture,
          role: 'member',
          isActive: true
        });
        isNewUser = true;
        console.log('✅ New user created via Google:', email);

        // Send welcome email for new Google signups (non-blocking)
        sendGoogleSignupEmail(user).catch(err => console.error('Email send failed:', err));
      }
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user.id);
    const userResponse = user.toJSON();

    res.json({
      success: true,
      message: isNewUser ? 'Account created successfully with Google' : 'Google login successful',
      data: {
        user: userResponse,
        token,
        isNewUser
      }
    });

  } catch (error) {
    console.error('❌ Google auth error:', error);

    res.status(500).json({
      success: false,
      message: 'Google authentication failed. Please try again.'
    });
  }
});

module.exports = router;