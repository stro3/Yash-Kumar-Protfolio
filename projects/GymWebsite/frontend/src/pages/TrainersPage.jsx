import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainersPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({ serviceType: 'personal-training', preferredDate: '', message: '' });
  const [sending, setSending] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const trainerImages = ['/images/trainer-profile.png', '/images/personal-trainer.png', '/images/hero-main.png'];

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/trainers`, { params: { specialty: selectedSpecialty } });
        if (response.data.success) setTrainers(response.data.data);
        else setError('Failed to load trainers');
      } catch (err) {
        setError('Failed to load trainers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [selectedSpecialty, API_URL]);

  const specialties = [
    { id: 'all', name: 'All Trainers' },
    { id: 'strength', name: 'Strength Training' },
    { id: 'cardio', name: 'Cardio & Fitness' },
    { id: 'yoga', name: 'Yoga & Flexibility' },
    { id: 'crossfit', name: 'CrossFit' },
    { id: 'nutrition', name: 'Nutrition' }
  ];

  const handleContactTrainer = (trainer) => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setSelectedTrainer(trainer);
    setShowContactModal(true);
  };

  const inputClass = "w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const ContactModal = () => {
    if (!showContactModal || !selectedTrainer) return null;
    const handleSubmit = async () => {
      if (!formData.message.trim()) { setNotification({ type: 'error', message: 'Please enter a message' }); return; }
      try {
        setSending(true);
        const response = await axios.post(`${API_URL}/trainers/${selectedTrainer.id}/contact`, formData);
        if (response.data.success) {
          setNotification({ type: 'success', message: 'Message sent! The trainer will contact you soon.' });
          setFormData({ serviceType: 'personal-training', preferredDate: '', message: '' });
          setShowContactModal(false);
        } else {
          setNotification({ type: 'error', message: response.data.message || 'Failed to send message' });
        }
      } catch (error) {
        setNotification({ type: 'error', message: error.response?.data?.message || 'Failed to send message.' });
      } finally {
        setSending(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Contact {selectedTrainer.name}</h3>
            <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
            <select className={inputClass} value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}>
              <option value="personal-training">Personal Training Session</option>
              <option value="consultation">Fitness Consultation</option>
              <option value="nutrition">Nutrition Guidance</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
            <input type="date" className={inputClass} value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea className={`${inputClass} h-24`} placeholder="Tell us about your fitness goals..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setShowContactModal(false)} disabled={sending} className="flex-1 px-4 py-3 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-700 disabled:opacity-50">Cancel</button>
            <button onClick={handleSubmit} disabled={sending} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50">{sending ? 'Sending...' : 'Send Message'}</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Meet Our Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Trainers</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our certified fitness professionals are here to guide you on your fitness journey.
          </p>
        </div>

        {notification && (
          <div className={`mb-8 rounded-xl p-4 ${notification.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
            <p>{notification.message}</p>
            <button onClick={() => setNotification(null)} className="mt-2 text-sm underline">Dismiss</button>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {specialties.map((specialty) => (
            <button key={specialty.id} onClick={() => setSelectedSpecialty(specialty.id)} disabled={loading}
              className={`px-5 py-3 rounded-xl transition-all ${selectedSpecialty === specialty.id ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'} ${loading ? 'opacity-50' : ''}`}>
              {specialty.name}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Loading trainers...</span>
          </div>
        )}

        {!loading && !error && trainers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <div key={trainer.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all">
                <div className="h-56 overflow-hidden">
                  <img src={trainerImages[index % trainerImages.length]} alt={trainer.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-medium">{trainer.title}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="ml-1 text-sm text-gray-400">{trainer.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">{trainer.bio}</p>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-300"><span className="text-gray-400">Experience:</span><span className="ml-2">{trainer.experience}</span></div>
                    <div className="flex items-center text-gray-300"><span className="text-gray-400">Rate:</span><span className="ml-2">{trainer.sessionPrice}</span></div>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {trainer.certifications?.slice(0, 2).map((cert, idx) => (
                        <span key={idx} className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded border border-green-500/30">{cert}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => handleContactTrainer(trainer)} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all font-medium shadow-lg shadow-blue-500/25">
                    Contact Trainer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isAuthenticated && (
          <div className="mt-16 text-center bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Work with Our Trainers?</h2>
            <p className="text-gray-400 mb-6">Join our gym to book personal training sessions!</p>
            <Link to="/signup" className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25">Join Now</Link>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Trainers?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden"><img src="/images/personal-trainer.png" alt="Certified" className="w-full h-full object-cover" /></div>
              <h3 className="text-xl font-semibold text-white mb-2">Certified Professionals</h3>
              <p className="text-gray-400">All trainers hold recognized certifications.</p>
            </div>
            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden"><img src="/images/weight-training.png" alt="Results" className="w-full h-full object-cover" /></div>
              <h3 className="text-xl font-semibold text-white mb-2">Proven Results</h3>
              <p className="text-gray-400">Hundreds of clients have achieved their goals.</p>
            </div>
            <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden"><img src="/images/group-class.png" alt="Care" className="w-full h-full object-cover" /></div>
              <h3 className="text-xl font-semibold text-white mb-2">Personalized Care</h3>
              <p className="text-gray-400">Custom programs for your specific needs.</p>
            </div>
          </div>
        </div>
      </div>
      <ContactModal />
    </div>
  );
};

export default TrainersPage;