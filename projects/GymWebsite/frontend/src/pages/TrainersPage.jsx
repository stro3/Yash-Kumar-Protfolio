import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainersPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({ serviceType: 'personal-training', preferredDate: '', message: '' });
  const [sending, setSending] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const trainerImages = [
    'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80'
  ];

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/trainers`, { params: { specialty: selectedSpecialty } });
        if (response.data.success) setTrainers(response.data.data);
        else setError('Failed to load trainers');
      } catch (err) {
        setError('Failed to load trainers.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [selectedSpecialty, API_URL]);

  const specialties = [
    { id: 'all', name: 'All Trainers' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'crossfit', name: 'CrossFit' },
    { id: 'nutrition', name: 'Nutrition' }
  ];

  const getStatusColor = (status) => {
    if (status === 'Available') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Busy') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const getStatusDot = (status) => {
    if (status === 'Available') return 'bg-green-500';
    if (status === 'Busy') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < full ? 'text-yellow-400' : 'text-slate-300'}>&#9733;</span>
      );
    }
    return stars;
  };

  const handleContactTrainer = (trainer) => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setSelectedTrainer(trainer);
    setFormData({ serviceType: 'personal-training', preferredDate: '', message: '' });
    setShowContactModal(true);
  };

  const handleViewProfile = (trainer) => {
    setSelectedTrainer(trainer);
    setShowProfileModal(true);
  };

  const handleSendMessage = async () => {
    if (!formData.message.trim()) { setNotification({ type: 'error', message: 'Please enter a message' }); return; }
    try {
      setSending(true);
      const response = await axios.post(`${API_URL}/trainers/${selectedTrainer.id}/contact`, formData);
      if (response.data.success) {
        setNotification({ type: 'success', message: 'Message Sent Successfully! The trainer will contact you soon.' });
        setShowContactModal(false);
        setFormData({ serviceType: 'personal-training', preferredDate: '', message: '' });
      } else {
        setNotification({ type: 'error', message: 'Failed to send message' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const inputCls = "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Expert <span className="text-orange-500">Trainers</span></h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">Certified fitness professionals dedicated to your transformation.</p>
        </div>

        {notification && (
          <div className={`fixed top-20 right-6 z-50 max-w-sm rounded-xl p-4 shadow-2xl border transition-all ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
            <div className="flex items-start">
              <span className="text-xl mr-3">{notification.type === 'success' ? '✅' : '❌'}</span>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <button onClick={() => setNotification(null)} className="mt-1 text-sm underline opacity-70">Dismiss</button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {specialties.map((s) => (
            <button key={s.id} onClick={() => setSelectedSpecialty(s.id)} disabled={loading}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all ${selectedSpecialty === s.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} ${loading ? 'opacity-50' : ''}`}>
              {s.name}
            </button>
          ))}
        </div>

        {loading && <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>}

        {error && <div className="text-center py-16"><p className="text-red-500">{error}</p><button onClick={() => window.location.reload()} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg">Retry</button></div>}

        {!loading && !error && trainers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((t, i) => (
              <div key={t.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-56 overflow-hidden relative">
                  <img src={trainerImages[i % trainerImages.length]} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(t.availabilityStatus)}`}>
                    <span className={`w-2 h-2 rounded-full ${getStatusDot(t.availabilityStatus)}`}></span>
                    {t.availabilityStatus}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{t.name}</h3>
                      <p className="text-orange-500 font-medium text-sm">{t.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{renderStars(t.rating)}</div>
                    <span className="text-sm font-medium text-slate-700">{t.rating}</span>
                    <span className="text-sm text-slate-400">({t.reviews} reviews)</span>
                  </div>
                  <p className="text-slate-500 mb-4 text-sm line-clamp-2">{t.bio}</p>
                  <div className="space-y-1 mb-4 text-sm">
                    <div className="flex text-slate-600"><span className="text-slate-400 w-24">Experience:</span>{t.experience}</div>
                    <div className="flex text-slate-600"><span className="text-slate-400 w-24">Rate:</span>{t.sessionPrice}</div>
                    <div className="flex text-slate-600"><span className="text-slate-400 w-24">Hours:</span><span className="truncate">{t.availability}</span></div>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-1">
                    {t.certifications?.slice(0, 2).map((cert, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{cert}</span>
                    ))}
                    {t.certifications?.length > 2 && <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded">+{t.certifications.length - 2}</span>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleViewProfile(t)} className="flex-1 border border-slate-300 text-slate-700 py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-all font-medium text-sm">View Profile</button>
                    <button onClick={() => handleContactTrainer(t)} disabled={t.availabilityStatus === 'On Leave'}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${t.availabilityStatus === 'On Leave' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
                      {t.availabilityStatus === 'On Leave' ? 'Unavailable' : 'Contact'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isAuthenticated && (
          <div className="mt-16 text-center bg-slate-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Work With Our Expert Trainers</h2>
            <p className="text-slate-400 mb-6">Join GymFit Pro to book personal training sessions.</p>
            <Link to="/signup" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all">Join Now</Link>
          </div>
        )}
      </div>

      {showContactModal && selectedTrainer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Contact {selectedTrainer.name}</h3>
                  <p className="text-sm text-slate-500">{selectedTrainer.title}</p>
                </div>
                <button onClick={() => setShowContactModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xl">&#10005;</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Type</label>
                <select className={inputCls} value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}>
                  <option value="personal-training">Personal Training</option>
                  <option value="consultation">Fitness Consultation</option>
                  <option value="nutrition">Nutrition Guidance</option>
                  <option value="group-training">Group Training</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Date</label>
                <input type="date" className={inputCls} value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea className={`${inputCls} h-28 resize-none`} placeholder="Describe your fitness goals and what you are looking for..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button onClick={() => setShowContactModal(false)} className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-medium">Cancel</button>
              <button onClick={handleSendMessage} disabled={sending} className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 font-medium transition-all">
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && selectedTrainer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img src={trainerImages[trainers.indexOf(selectedTrainer) % trainerImages.length]} alt={selectedTrainer.name} className="w-full h-48 object-cover rounded-t-2xl" />
              <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 text-lg">&#10005;</button>
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(selectedTrainer.availabilityStatus)}`}>
                <span className={`w-2 h-2 rounded-full ${getStatusDot(selectedTrainer.availabilityStatus)}`}></span>
                {selectedTrainer.availabilityStatus}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-slate-900">{selectedTrainer.name}</h3>
              <p className="text-orange-500 font-medium mb-3">{selectedTrainer.title}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(selectedTrainer.rating)}</div>
                <span className="font-medium text-slate-700">{selectedTrainer.rating}</span>
                <span className="text-slate-400">({selectedTrainer.reviews} reviews)</span>
              </div>
              <p className="text-slate-600 mb-6">{selectedTrainer.bio}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl"><div className="text-xs text-slate-400 mb-1">Experience</div><div className="font-semibold text-slate-900">{selectedTrainer.experience}</div></div>
                <div className="bg-slate-50 p-3 rounded-xl"><div className="text-xs text-slate-400 mb-1">Session Rate</div><div className="font-semibold text-slate-900">{selectedTrainer.sessionPrice}</div></div>
                <div className="bg-slate-50 p-3 rounded-xl"><div className="text-xs text-slate-400 mb-1">Hours</div><div className="font-semibold text-slate-900 text-sm">{selectedTrainer.availability}</div></div>
                <div className="bg-slate-50 p-3 rounded-xl"><div className="text-xs text-slate-400 mb-1">Languages</div><div className="font-semibold text-slate-900 text-sm">{selectedTrainer.languages?.join(', ')}</div></div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrainer.certifications?.map((c, i) => (<span key={i} className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full border border-green-200">{c}</span>))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Achievements</h4>
                <ul className="space-y-1">
                  {selectedTrainer.achievements?.map((a, i) => (<li key={i} className="flex items-center text-sm text-slate-600"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>{a}</li>))}
                </ul>
              </div>
              <button onClick={() => { setShowProfileModal(false); handleContactTrainer(selectedTrainer); }} disabled={selectedTrainer.availabilityStatus === 'On Leave'}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${selectedTrainer.availabilityStatus === 'On Leave' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
                {selectedTrainer.availabilityStatus === 'On Leave' ? 'Currently Unavailable' : 'Contact This Trainer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainersPage;