import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'trainer') return '/trainer-dashboard';
    return '/member-portal';
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-white text-xl font-bold tracking-wide">
                <span className="text-orange-500">GYM</span>FIT PRO
              </div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-1">
              <Link to="/" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
              <Link to="/memberships" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Memberships</Link>
              <Link to="/classes" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Classes</Link>
              <Link to="/trainers" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Trainers</Link>
              <Link to="/contact" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
              <Link to="/blog" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Blog</Link>
              <Link to="/gallery" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-slate-400 text-sm truncate max-w-[120px] block">Hi, {user?.firstName}</span>
                <Link to={getDashboardLink()} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex-shrink-0">Dashboard</Link>
                <button onClick={handleLogout} className="border border-slate-600 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex-shrink-0">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                <Link to="/signup" className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">Join Now</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white focus:outline-none p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-slate-800 pb-3">
            <div className="px-2 pt-2 space-y-1">
              <Link to="/" className="text-slate-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/about" className="text-slate-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/memberships" className="text-slate-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Memberships</Link>
              <Link to="/classes" className="text-slate-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Classes</Link>
              <Link to="/trainers" className="text-slate-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Trainers</Link>
              <Link to="/contact" className="text-slate-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
              <Link to="/blog" className="text-slate-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Blog</Link>
              <Link to="/gallery" className="text-slate-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Gallery</Link>
            </div>
            <div className="pt-4 px-2 border-t border-slate-800">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-slate-400 text-sm truncate">Hi, {user?.firstName}</div>
                  <Link to={getDashboardLink()} className="bg-orange-500 text-white block px-3 py-2 rounded-lg text-base font-medium text-center" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="border border-slate-600 text-slate-300 block w-full text-left px-3 py-2 rounded-lg text-base font-medium">Logout</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link to="/signup" className="bg-orange-500 text-white block px-3 py-2 rounded-lg text-base font-medium text-center" onClick={() => setIsOpen(false)}>Join Now</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;