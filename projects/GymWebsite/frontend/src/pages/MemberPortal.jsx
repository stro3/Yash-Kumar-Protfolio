import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MemberPortal = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [myTrainer, setMyTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [saveMsg, setSaveMsg] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'https://gymfit-pro-dctn.onrender.com/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bookRes, notifRes, trainerRes] = await Promise.allSettled([
          axios.get(`${API_URL}/classes/my-bookings`),
          axios.get(`${API_URL}/notifications`),
          axios.get(`${API_URL}/trainers/my-trainer`)
        ]);
        if (bookRes.status === 'fulfilled' && bookRes.value.data.success) setBookings(bookRes.value.data.data || []);
        if (notifRes.status === 'fulfilled' && notifRes.value.data.success) setNotifications(notifRes.value.data.data?.notifications || []);
        if (trainerRes.status === 'fulfilled' && trainerRes.value.data.success) setMyTrainer(trainerRes.value.data.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [API_URL]);

  useEffect(() => {
    if (user) setProfileData({
      firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '', phone: user.phone || '',
      addressStreet: user.addressStreet || '', addressCity: user.addressCity || '', addressState: user.addressState || '',
      addressZipCode: user.addressZipCode || '', addressCountry: user.addressCountry || '',
      emergencyContactName: user.emergencyContactName || '', emergencyContactPhone: user.emergencyContactPhone || '',
      emergencyContactRelationship: user.emergencyContactRelationship || ''
    });
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put(`${API_URL}/users/profile`, profileData);
      if (res.data.success) setSaveMsg('Profile saved successfully');
      else setSaveMsg('Failed to save');
    } catch (e) { setSaveMsg('Error saving profile'); }
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const classBookings = bookings.filter(b => b.classId > 0);
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '\u{1F4CA}' },
    { id: 'bookings', name: 'My Bookings', icon: '\u{1F4C5}' },
    { id: 'notifications', name: 'Notifications', icon: '\u{1F514}' },
    { id: 'profile', name: 'Profile & Address', icon: '\u{1F464}' }
  ];

  const inputCls = "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500";

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 text-white p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative flex justify-between items-start">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-orange-500/30">
              {(user?.firstName || 'M')[0]}
            </div>
            <div>
              <p className="text-slate-400 text-sm">Welcome back,</p>
              <h2 className="text-2xl font-bold">{user?.firstName || 'Member'} {user?.lastName || ''}</h2>
              <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>Active Member
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs">Member ID</p>
            <p className="font-mono text-lg font-bold text-orange-400">{user?.id ? `GM-${user.id}` : '--'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Classes Booked', value: classBookings.length, color: 'from-orange-500 to-amber-500', icon: '\u{1F4C5}' },
          { label: 'Trainers Contacted', value: bookings.filter(b => b.trainerId).length, color: 'from-blue-500 to-cyan-500', icon: '\u{1F3CB}' },
          { label: 'Notifications', value: notifications.filter(n => !n.isRead).length, color: 'from-purple-500 to-pink-500', icon: '\u{1F514}' },
          { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '--', color: 'from-emerald-500 to-teal-500', icon: '\u2B50' }
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <div className={`w-8 h-8 bg-gradient-to-br ${s.color} rounded-lg opacity-20 group-hover:opacity-40 transition-opacity`}></div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Upcoming Classes</h3>
            <Link to="/classes" className="text-orange-500 text-sm font-medium hover:text-orange-600">View All</Link>
          </div>
          {classBookings.length > 0 ? classBookings.slice(0, 4).map((b, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 font-bold text-sm">{b.date?.slice(0, 3)}</div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{b.className}</p>
                  <p className="text-xs text-slate-500">{b.instructor} - {b.time}</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">{b.status}</span>
            </div>
          )) : (
            <div className="text-center py-8 text-slate-400">
              <p className="text-4xl mb-3">{'\u{1F4C5}'}</p>
              <p className="mb-2">No classes booked yet</p>
              <Link to="/classes" className="text-orange-500 font-medium text-sm hover:text-orange-600">Browse Classes</Link>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">My Trainer</h3>
          {myTrainer ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-lg">{myTrainer.name[0]}</div>
                <div>
                  <p className="font-bold text-slate-900">{myTrainer.name}</p>
                  <p className="text-sm text-orange-500">{myTrainer.title}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-yellow-400 text-xs">{'\u2605'}</span>
                    <span className="text-xs font-medium text-slate-700">{myTrainer.rating}</span>
                    <span className="text-xs text-slate-400">({myTrainer.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl"><div className="text-xs text-slate-400">Experience</div><div className="font-semibold text-slate-900 text-sm">{myTrainer.experience}</div></div>
                <div className="bg-slate-50 p-3 rounded-xl"><div className="text-xs text-slate-400">Rate</div><div className="font-semibold text-slate-900 text-sm">{myTrainer.sessionPrice}</div></div>
              </div>
              <a href={`https://wa.me/?text=Hi ${myTrainer.name}, I am ${user?.firstName} from GymFit Pro.`} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors">
                {'\u{1F4AC}'} WhatsApp Trainer
              </a>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p className="text-4xl mb-3">{'\u{1F3CB}'}</p>
              <p className="mb-2">No trainer contacted yet</p>
              <Link to="/trainers" className="text-orange-500 font-medium text-sm hover:text-orange-600">Browse Trainers</Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { to: '/classes', icon: '\u{1F4C5}', label: 'Book Class', bg: 'bg-orange-50 hover:bg-orange-100' },
            { to: '/trainers', icon: '\u{1F3CB}', label: 'Find Trainer', bg: 'bg-blue-50 hover:bg-blue-100' },
            { to: '/memberships', icon: '\u{1F4B3}', label: 'Renew Plan', bg: 'bg-green-50 hover:bg-green-100' },
            { to: '/progress', icon: '\u{1F4C8}', label: 'View Progress', bg: 'bg-purple-50 hover:bg-purple-100' }
          ].map((a, i) => (
            <Link key={i} to={a.to} className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${a.bg}`}>
              <span className="text-2xl">{a.icon}</span>
              <span className="font-medium text-slate-900 text-sm">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingsContent = () => (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">My Bookings</h3></div>
      {classBookings.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {classBookings.map((b, i) => (
            <div key={i} className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center"><span className="text-xl">{'\u{1F4C5}'}</span></div>
                <div>
                  <p className="font-semibold text-slate-900">{b.className}</p>
                  <p className="text-sm text-slate-500">{b.instructor}</p>
                  <p className="text-xs text-slate-400">{b.date} at {b.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400">
          <p className="text-lg mb-2">No bookings yet</p>
          <Link to="/classes" className="text-orange-500 font-medium hover:text-orange-600">Book Your First Class</Link>
        </div>
      )}
    </div>
  );

  const NotificationsContent = () => (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
        {notifications.length > 0 && <button onClick={async () => { await axios.put(`${API_URL}/notifications/read-all`); setNotifications(notifications.map(n => ({ ...n, isRead: true }))); }} className="text-sm text-orange-500 font-medium">Mark all read</button>}
      </div>
      {notifications.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {notifications.map((n, i) => (
            <div key={i} className={`flex items-start gap-4 p-5 ${!n.isRead ? 'bg-orange-50/50' : ''}`}>
              <span className="text-xl mt-0.5">{n.type === 'membership_expiry' ? '\u26A0\uFE0F' : n.type === 'class_reminder' ? '\u{1F4C5}' : '\u{1F514}'}</span>
              <div className="flex-1">
                <p className="font-medium text-slate-900 text-sm">{n.title}</p>
                <p className="text-sm text-slate-600 mt-0.5">{n.message}</p>
                <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              {!n.isRead && <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400"><p className="text-lg">No notifications</p></div>
      )}
    </div>
  );

  const ProfileContent = () => (
    <div className="space-y-6">
      {saveMsg && <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-medium">{saveMsg}</div>}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Personal Information</h3>
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl text-white font-bold">{(user?.firstName || 'M')[0]}</div>
          <div>
            <h4 className="text-xl font-bold text-slate-900">{user?.firstName} {user?.lastName}</h4>
            <p className="text-slate-500">{user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">First Name</label><input type="text" className={inputCls} value={profileData.firstName} onChange={e => setProfileData({...profileData, firstName: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label><input type="text" className={inputCls} value={profileData.lastName} onChange={e => setProfileData({...profileData, lastName: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input type="email" className={inputCls} value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="tel" className={inputCls} value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} /></div>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Address Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label><input type="text" className={inputCls} value={profileData.addressStreet} onChange={e => setProfileData({...profileData, addressStreet: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">City</label><input type="text" className={inputCls} value={profileData.addressCity} onChange={e => setProfileData({...profileData, addressCity: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">State</label><input type="text" className={inputCls} value={profileData.addressState} onChange={e => setProfileData({...profileData, addressState: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Zip Code</label><input type="text" className={inputCls} value={profileData.addressZipCode} onChange={e => setProfileData({...profileData, addressZipCode: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Country</label><input type="text" className={inputCls} value={profileData.addressCountry} onChange={e => setProfileData({...profileData, addressCountry: e.target.value})} /></div>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Contact Name</label><input type="text" className={inputCls} value={profileData.emergencyContactName} onChange={e => setProfileData({...profileData, emergencyContactName: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label><input type="tel" className={inputCls} value={profileData.emergencyContactPhone} onChange={e => setProfileData({...profileData, emergencyContactPhone: e.target.value})} /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Relationship</label><input type="text" className={inputCls} value={profileData.emergencyContactRelationship} onChange={e => setProfileData({...profileData, emergencyContactRelationship: e.target.value})} /></div>
        </div>
      </div>
      <button onClick={handleSaveProfile} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">Save All Changes</button>
    </div>
  );

  const renderContent = () => {
    if (loading) return <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'bookings': return <BookingsContent />;
      case 'notifications': return <NotificationsContent />;
      case 'profile': return <ProfileContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sticky top-24">
              <div className="space-y-1">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${activeTab === tab.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <span>{tab.icon}</span><span>{tab.name}</span>
                    {tab.id === 'notifications' && notifications.filter(n => !n.isRead).length > 0 && (
                      <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/30 text-white' : 'bg-orange-100 text-orange-600'}`}>{notifications.filter(n => !n.isRead).length}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default MemberPortal;