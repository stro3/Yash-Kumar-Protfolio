import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClassesPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [bookingModal, setBookingModal] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/classes`, { params: { category: selectedCategory } });
        if (response.data.success) setClasses(response.data.data);
        else setError('Failed to load classes');
      } catch (err) {
        setError('Failed to load classes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [selectedCategory, API_URL]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const categories = [
    { id: 'all', name: 'All Classes', icon: '🏃' },
    { id: 'yoga', name: 'Yoga', icon: '🧘' },
    { id: 'zumba', name: 'Zumba', icon: '💃' },
    { id: 'crossfit', name: 'CrossFit', icon: '🏋️' },
    { id: 'cardio', name: 'Cardio', icon: '❤️' },
    { id: 'strength', name: 'Strength', icon: '💪' }
  ];

  const getDifficultyColor = (d) => {
    if (d === 'Beginner') return 'bg-green-50 text-green-700 border border-green-200';
    if (d === 'Intermediate') return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
    if (d === 'Advanced') return 'bg-red-50 text-red-700 border border-red-200';
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  const getSpotsColor = (remaining, total) => {
    const pct = remaining / total;
    if (pct > 0.5) return 'text-green-600';
    if (pct > 0.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSpotsBarColor = (remaining, total) => {
    const pct = remaining / total;
    if (pct > 0.5) return 'bg-green-500';
    if (pct > 0.2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleBookClass = async (classItem) => {
    if (!isAuthenticated) { navigate('/login'); return; }
    try {
      const response = await axios.post(`${API_URL}/classes/${classItem.id}/book`);
      if (response.data.success) {
        setBookingModal({ className: classItem.name, instructor: classItem.instructor, spots: response.data.data.availableSpots, bookingId: response.data.data.bookingId });
        const updated = await axios.get(`${API_URL}/classes`, { params: { category: selectedCategory } });
        if (updated.data.success) setClasses(updated.data.data);
      } else {
        setNotification({ type: 'error', message: response.data.message || 'Failed to book class' });
      }
    } catch (error) {
      setNotification({ type: 'error', message: error.response?.data?.message || 'Failed to book class.' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Fitness <span className="text-orange-500">Classes</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            {classes.length} classes available. Expert-led fitness sessions for every level.
          </p>
        </div>

        {notification && (
          <div className={`fixed top-20 right-6 z-50 max-w-sm rounded-xl p-4 shadow-2xl border ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
            <div className="flex items-start">
              <span className="text-xl mr-3">{notification.type === 'success' ? '✅' : '❌'}</span>
              <div className="flex-1"><p className="font-medium">{notification.message}</p></div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} disabled={loading}
              className={`flex items-center space-x-2 px-5 py-3 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} ${loading ? 'opacity-50' : ''}`}>
              <span>{cat.icon}</span><span>{cat.name}</span>
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-orange-500 text-white px-6 py-2 rounded-lg">Retry</button>
          </div>
        )}

        {!loading && !error && classes.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-slate-900 mb-2">No classes found</h3>
            <p className="text-slate-500">Try selecting a different category.</p>
          </div>
        )}

        {!loading && !error && classes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((c) => {
              const remaining = c.maxCapacity - c.currentBookings;
              return (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-slate-900 pr-2">{c.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getDifficultyColor(c.difficulty)}`}>{c.difficulty}</span>
                    </div>
                    <p className="text-slate-500 mb-4 text-sm">{c.description}</p>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex text-slate-600"><span className="text-slate-400 w-24">Instructor:</span><span className="font-medium">{c.instructor}</span></div>
                      <div className="flex text-slate-600"><span className="text-slate-400 w-24">Duration:</span>{c.duration}</div>
                      <div className="flex text-slate-600"><span className="text-slate-400 w-24">Price:</span>{c.price}</div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-slate-400">Availability</span>
                        <span className={`text-xs font-bold ${getSpotsColor(remaining, c.maxCapacity)}`}>
                          {remaining === 0 ? 'FULL' : `${remaining} of ${c.maxCapacity} spots`}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className={`h-2 rounded-full transition-all ${getSpotsBarColor(remaining, c.maxCapacity)}`} style={{ width: `${(c.currentBookings / c.maxCapacity) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="mb-4 bg-slate-50 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-2 font-medium">Schedule</div>
                      <div className="grid grid-cols-1 gap-1">
                        {c.schedule.map((s, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-slate-600">{s.day}</span>
                            <span className="text-slate-900 font-medium">{s.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => handleBookClass(c)} disabled={remaining === 0}
                      className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${remaining === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20'}`}>
                      {remaining === 0 ? 'Class Full' : 'Book Class'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isAuthenticated && (
          <div className="mt-16 text-center bg-slate-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start?</h2>
            <p className="text-slate-400 mb-6">Join our gym to access all classes and start booking today.</p>
            <Link to="/signup" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all">Sign Up Now</Link>
          </div>
        )}
      </div>

      {bookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
            <p className="text-slate-500 mb-1">You have successfully booked</p>
            <p className="text-lg font-semibold text-slate-900 mb-1">{bookingModal.className}</p>
            <p className="text-sm text-slate-400 mb-4">with {bookingModal.instructor}</p>
            <div className="bg-slate-50 rounded-xl p-3 mb-6">
              <div className="text-xs text-slate-400">Booking ID</div>
              <div className="font-mono text-sm text-slate-700">#{bookingModal.bookingId}</div>
            </div>
            <button onClick={() => setBookingModal(null)} className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;