import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general' });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setNotification({ type: 'success', message: 'Thank you for your message! We will get back to you within 24 hours.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: '📍', title: 'Address', details: ['123 Fitness Street', 'New York, NY 10001'] },
    { icon: '📞', title: 'Phone', details: ['+1 (555) 123-4567'] },
    { icon: '✉️', title: 'Email', details: ['info@originFitness.com'] },
    { icon: '⏰', title: 'Business Hours', details: ['Mon-Fri: 5:00 AM - 11:00 PM', 'Sat-Sun: 6:00 AM - 10:00 PM'] }
  ];

  const departments = [
    { name: 'Membership Services', description: 'Questions about memberships and pricing', email: 'membership@originFitness.com' },
    { name: 'Personal Training', description: 'Book sessions and trainer inquiries', email: 'trainers@originFitness.com' },
    { name: 'Class Schedules', description: 'Group classes and bookings', email: 'classes@originFitness.com' },
    { name: 'Corporate Wellness', description: 'Business partnerships and programs', email: 'corporate@originFitness.com' }
  ];

  const inputClass = "w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Us</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your fitness journey? Have questions? We are here to help.
          </p>
        </div>

        {notification && (
          <div className={`mb-8 rounded-xl p-4 ${notification.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
            <p>{notification.message}</p>
            <button onClick={() => setNotification(null)} className="mt-2 text-sm underline hover:no-underline">Dismiss</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputClass} placeholder="Your email" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="Your phone" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange} className={inputClass}>
                    <option value="general">General Inquiry</option>
                    <option value="membership">Membership</option>
                    <option value="personal-training">Personal Training</option>
                    <option value="classes">Group Classes</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className={inputClass} placeholder="Brief subject" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className={inputClass} placeholder="Your message..."></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/25">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (<p key={idx} className="text-gray-400">{detail}</p>))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
              <h3 className="text-xl font-bold text-white mb-4">Find Us</h3>
              <div className="bg-gray-700/50 h-48 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p>123 Fitness Street, New York</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Contact by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Department</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 text-center hover:border-blue-500/50 transition-all">
                <h3 className="text-lg font-semibold text-white mb-3">{dept.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{dept.description}</p>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-sm font-medium">{dept.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;