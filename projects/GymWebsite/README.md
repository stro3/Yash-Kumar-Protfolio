# GymFit Pro - Full Stack Gym Management System

A production-grade gym management platform built with React, Node.js, Express, and Sequelize. Features member dashboards, class booking, trainer management, admin panel with real-time data, and notification system with WhatsApp integration.

## Tech Stack

### Frontend
- **React 19** with Vite 7 (SPA)
- **React Router v7** for client-side routing
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **Google OAuth** via `@react-oauth/google`

### Backend
- **Node.js** with Express.js
- **Sequelize ORM** (SQLite for development, PostgreSQL for production)
- **JWT** for authentication and session management
- **bcryptjs** for password hashing (salt factor 12)
- **express-validator** for input validation
- **helmet** for HTTP security headers
- **express-rate-limit** for API rate limiting
- **nodemailer** for transactional emails
- **google-auth-library** for Google OAuth token verification

### Database
- **SQLite** (local development)
- **PostgreSQL** (production on Render)

### Deployment
- **Vercel** for frontend hosting
- **Render** for backend hosting

---

## Features

### Member Dashboard
- Premium gradient UI with animated stat cards
- Real-time class booking display from database
- My Trainer section with WhatsApp contact link
- Full profile editor with address, city, state, emergency contact
- Notification center with read/unread tracking

### Class Booking System
- 12 fitness classes across 5 categories (Yoga, Zumba, CrossFit, Cardio, Strength)
- Real-time availability with capacity tracking
- Bookings persist to database and appear in member dashboard
- Booking confirmation modal with booking ID

### Trainer Management
- 6 trainers with profiles, ratings, certifications, achievements
- Contact form with service type selection
- Trainer contact history tracked per user
- Last contacted trainer shown on member dashboard

### Admin Dashboard
- Real data from database (not hardcoded)
- Member management: search, activate, deactivate
- New admissions view with join date, phone, city
- All bookings overview
- Individual notification sending with WhatsApp click-to-chat
- Bulk membership renewal reminders

### Authentication
- Email/password registration and login
- Google OAuth integration
- JWT token-based session management
- Role-based access control (member, trainer, admin)
- Protected routes on frontend and backend

### Notification System
- Persistent notifications stored in database
- Admin can send individual or bulk notifications
- WhatsApp click-to-chat links generated automatically
- Membership expiry reminders

---

## Project Structure

```
GymFit-Pro/
├── backend/
│   ├── config/
│   │   └── database.js          # Sequelize config (SQLite/PostgreSQL)
│   ├── models/
│   │   ├── User.js              # User model with auth methods
│   │   ├── Membership.js        # Membership plans model
│   │   ├── ClassBooking.js      # Class + trainer booking model
│   │   └── Notification.js      # Notification model
│   ├── routes/
│   │   ├── auth.js              # Register, login, Google OAuth
│   │   ├── users.js             # Profile CRUD, password change
│   │   ├── classes.js           # Class listing + booking + my-bookings
│   │   ├── trainers.js          # Trainer listing + contact + my-trainer
│   │   ├── admin.js             # Admin stats, members, notifications
│   │   ├── notifications.js     # User notification management
│   │   ├── memberships.js       # Membership plans
│   │   ├── payments.js          # Payment processing
│   │   ├── blog.js              # Blog posts
│   │   └── reports.js           # Analytics reports
│   ├── services/
│   │   └── emailService.js      # Nodemailer email templates
│   ├── api/
│   │   └── index.js             # Vercel serverless entry point
│   ├── server.js                # Express server entry point
│   └── seedAdmin.js             # Admin account seeder
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── MemberPortal.jsx     # Premium member dashboard
│   │   │   ├── AdminDashboard.jsx   # Admin management panel
│   │   │   ├── ClassesPage.jsx      # Class listing + booking
│   │   │   ├── TrainersPage.jsx     # Trainer profiles + contact
│   │   │   ├── MembershipPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── BlogPage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   └── PaymentPage.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state management
│   │   └── App.jsx              # Root component with routing
│   └── vite.config.js
├── render.yaml                  # Render deployment blueprint
├── vercel.json                  # Vercel deployment config
└── .env.example                 # Environment variables template
```

---

## Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Local Development

```bash
# Clone the repository
git clone https://github.com/stro3/GymFit-Pro.git
cd GymFit-Pro

# Backend setup
cd backend
cp .env.example .env    # Fill in your environment variables
npm install
node seedAdmin.js       # Creates admin account (admin@gymfit.com / admin123)
node server.js          # Starts backend on port 5000

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev             # Starts frontend on port 5173
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Random string for JWT signing |
| `JWT_EXPIRE` | Token expiry (e.g., `7d`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `EMAIL_USER` | Gmail address for sending emails |
| `EMAIL_PASS` | Gmail app password |
| `DATABASE_URL` | PostgreSQL URL (production only) |
| `FRONTEND_URL` | Frontend URL for CORS |

---

## Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gymfit.com | admin123 |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | User registration |
| POST | `/api/auth/login` | No | User login |
| POST | `/api/auth/google` | No | Google OAuth login |
| GET | `/api/users/profile` | Yes | Get user profile |
| PUT | `/api/users/profile` | Yes | Update profile + address |
| GET | `/api/classes` | No | List all classes |
| POST | `/api/classes/:id/book` | Yes | Book a class |
| GET | `/api/classes/my-bookings` | Yes | Get user bookings |
| GET | `/api/trainers` | No | List trainers |
| POST | `/api/trainers/:id/contact` | Yes | Contact a trainer |
| GET | `/api/trainers/my-trainer` | Yes | Get last contacted trainer |
| GET | `/api/admin/stats` | Admin | Dashboard statistics |
| GET | `/api/admin/members` | Admin | All members list |
| POST | `/api/admin/notify` | Admin | Send notification |
| GET | `/api/notifications` | Yes | User notifications |

---

## Deployment

### Frontend (Vercel)
1. Import the repository on Vercel
2. Set root directory to `frontend`
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add `VITE_API_URL` environment variable pointing to your Render backend

### Backend (Render)
1. Create a new Web Service on Render
2. Set root directory to `backend`
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add all environment variables from `.env.example`

---

## License

MIT