import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general' });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setNotification({ type: 'success', message: 'Thank you! We will get back to you within 24 hours.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: '📍', title: 'Address', details: ['Sector 18, Noida', 'Uttar Pradesh 201301, India'] },
    { icon: '📞', title: 'Phone', details: ['+91 98765 43210', '+91 11 4567 8900'] },
    { icon: '✉️', title: 'Email', details: ['info@gymfitpro.com', 'support@gymfitpro.com'] },
    { icon: '⏰', title: 'Hours', details: ['Mon-Fri: 5 AM - 11 PM', 'Sat-Sun: 6 AM - 10 PM'] }
  ];

  const inputCls = "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Contact <span className="text-orange-500">Us</span></h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">Ready to start? Have questions? We are here to help.</p>
        </div>

        {notification && (
          <div className={`mb-8 rounded-xl p-4 ${notification.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            <p>{notification.message}</p><button onClick={() => setNotification(null)} className="mt-2 text-sm underline">Dismiss</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={inputCls} placeholder="Your name" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-2">Email</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputCls} placeholder="Your email" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-2">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputCls} placeholder="+91 98765 43210" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-2">Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange} className={inputCls}>
                    <option value="general">General Inquiry</option><option value="membership">Membership</option><option value="personal-training">Personal Training</option><option value="classes">Group Classes</option>
                  </select>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-2">Subject</label><input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className={inputCls} placeholder="Brief subject" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-2">Message</label><textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className={inputCls} placeholder="Your message..."></textarea></div>
              <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 rounded-xl text-white font-semibold bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition-all shadow-lg shadow-orange-500/20">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-xl text-white">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                      {info.details.map((d, idx) => (<p key={idx} className="text-slate-500">{d}</p>))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Find Us on <span className="text-orange-500">Google Maps</span></h2>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d77.3220!3d28.5700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sSector%2018%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GymFit Pro Location"
            ></iframe>
          </div>
          <div className="mt-4 flex justify-center">
            <a href="https://www.google.com/maps/search/gym+near+me" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;