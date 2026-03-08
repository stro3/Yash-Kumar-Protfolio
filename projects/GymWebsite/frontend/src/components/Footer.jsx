import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] border-t border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-white text-xl font-bold tracking-wide mb-4">
              <span className="text-orange-500">GYM</span>FIT PRO
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transform your body and mind with our state-of-the-art facilities and expert trainers.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/classes" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">Classes</Link></li>
              <li><Link to="/memberships" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">Memberships</Link></li>
              <li><Link to="/trainers" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">Trainers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">Blog</Link></li>
              <li><Link to="/gallery" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">Gallery</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>123 Fitness Street</li>
              <li>New York, NY 10001</li>
              <li>+1 (555) 123-4567</li>
              <li>info@gymfitpro.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900/30 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">2024 GymFit Pro. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-500 hover:text-orange-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-orange-400 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;