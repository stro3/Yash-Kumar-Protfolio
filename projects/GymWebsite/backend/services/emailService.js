const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send welcome email after registration
const sendWelcomeEmail = async (user) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"GymFit Pro" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Welcome to GymFit Pro! 🏋️',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
              <span style="color: #fed7aa;">GYM</span>FIT PRO
            </h1>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 24px;">
              Welcome, ${user.firstName}! 🎉
            </h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Thank you for joining <strong>GymFit Pro</strong>! Your account has been successfully created and you're now part of our fitness community.
            </p>
            
            <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
              <p style="color: #9a3412; font-size: 14px; margin: 0 0 8px; font-weight: 600;">Your Account Details:</p>
              <p style="color: #c2410c; font-size: 14px; margin: 0;">
                <strong>Name:</strong> ${user.firstName} ${user.lastName}<br/>
                <strong>Email:</strong> ${user.email}<br/>
                <strong>Member Since:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 20px 0;">
              Here's what you can do next:
            </p>
            
            <ul style="color: #475569; font-size: 15px; line-height: 2; padding-left: 20px;">
              <li>Browse our <strong>membership plans</strong> and choose one that fits your goals</li>
              <li>Explore our <strong>classes</strong> and book your first session</li>
              <li>Meet our expert <strong>trainers</strong> and find your perfect match</li>
              <li>Track your <strong>fitness progress</strong> in your member portal</li>
            </ul>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/memberships" 
                 style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 600;">
                Explore Memberships
              </a>
            </div>
            
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 24px 0 0;">
              If you have any questions, feel free to contact us. We're here to help you on your fitness journey!
            </p>
          </div>
          
          <div style="background: #0a1628; padding: 24px 30px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">
              © ${new Date().getFullYear()} GymFit Pro. All rights reserved.
            </p>
            <p style="color: #64748b; font-size: 12px; margin: 8px 0 0;">
              This email was sent to ${user.email} because you created an account on GymFit Pro.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', user.email, 'MessageId:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error.message);
    return { success: false, error: error.message };
  }
};

// Send Google signup confirmation email
const sendGoogleSignupEmail = async (user) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"GymFit Pro" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Welcome to GymFit Pro - Google Account Connected! 🏋️',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
              <span style="color: #fed7aa;">GYM</span>FIT PRO
            </h1>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 24px;">
              Welcome, ${user.firstName}! 🎉
            </h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Your Google account has been successfully linked to <strong>GymFit Pro</strong>. You can now sign in anytime using your Google account — no password needed!
            </p>
            
            <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
              <p style="color: #166534; font-size: 14px; margin: 0;">
                ✅ <strong>Google Account Connected:</strong> ${user.email}
              </p>
            </div>
            
            <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
              <p style="color: #9a3412; font-size: 14px; margin: 0 0 8px; font-weight: 600;">Your Account Details:</p>
              <p style="color: #c2410c; font-size: 14px; margin: 0;">
                <strong>Name:</strong> ${user.firstName} ${user.lastName}<br/>
                <strong>Email:</strong> ${user.email}<br/>
                <strong>Sign-in Method:</strong> Google Account<br/>
                <strong>Member Since:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/memberships" 
                 style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 600;">
                Get Started
              </a>
            </div>
          </div>
          
          <div style="background: #0a1628; padding: 24px 30px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">
              © ${new Date().getFullYear()} GymFit Pro. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Google signup email sent to:', user.email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send Google signup email:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendGoogleSignupEmail
};
