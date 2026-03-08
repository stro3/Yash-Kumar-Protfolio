import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import MembershipPage from './pages/MembershipPage';
import ClassesPage from './pages/ClassesPage';
import TrainersPage from './pages/TrainersPage';
import ContactPage from './pages/ContactPage';
import MemberPortal from './pages/MemberPortal';
import AdminDashboard from './pages/AdminDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import ProgressTracking from './pages/ProgressTracking';
import BlogPage from './pages/BlogPage';
import GalleryPage from './pages/GalleryPage';
import PaymentPage from './pages/PaymentPage';
import ReportsAnalytics from './pages/ReportsAnalytics';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import DebugRouter from './components/DebugRouter';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1">
              <DebugRouter />
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/memberships" element={<MembershipPage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/trainers" element={<TrainersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              
              <Route 
                path="/member-portal" 
                element={
                  <ProtectedRoute allowedRoles={['member', 'trainer', 'admin']}>
                    <MemberPortal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/progress" 
                element={
                  <ProtectedRoute allowedRoles={['member', 'trainer', 'admin']}>
                    <ProgressTracking />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trainer-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['trainer', 'admin']}>
                    <TrainerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ReportsAnalytics />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
                      <p className="text-slate-500 mb-6 text-lg">Page not found</p>
                      <Link to="/" className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold">
                        Go Home
                      </Link>
                    </div>
                  </div>
                } 
              />
              </Routes>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
