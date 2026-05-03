import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [members, setMembers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [notifyModal, setNotifyModal] = useState(null);
  const [notifyMsg, setNotifyMsg] = useState('');
  const [toast, setToast] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, membersRes, bookingsRes] = await Promise.allSettled([
          axios.get(`${API_URL}/admin/stats`),
          axios.get(`${API_URL}/admin/members`),
          axios.get(`${API_URL}/admin/bookings`)
        ]);
        if (statsRes.status === 'fulfilled' && statsRes.value.data.success) setStats(statsRes.value.data.data);
        if (membersRes.status === 'fulfilled' && membersRes.value.data.success) setMembers(membersRes.value.data.data?.users || []);
        if (bookingsRes.status === 'fulfilled' && bookingsRes.value.data.success) setBookings(bookingsRes.value.data.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [API_URL]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/members`, { params: { search } });
      if (res.data.success) setMembers(res.data.data?.users || []);
    } catch (e) { console.error(e); }
  };

  const handleToggleStatus = async (id, current) => {
    try {
      await axios.put(`${API_URL}/admin/members/${id}/status`, { isActive: !current });
      setMembers(members.map(m => m.id === id ? { ...m, isActive: !current } : m));
    } catch (e) { console.error(e); }
  };

  const handleSendNotification = async () => {
    if (!notifyMsg.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/admin/notify`, {
        userId: notifyModal.id,
        title: 'Message from Admin',
        message: notifyMsg,
        type: 'admin_reminder'
      });
      if (res.data.success) {
        setToast(`Notification sent to ${notifyModal.firstName}`);
        if (res.data.data.whatsappLink) window.open(res.data.data.whatsappLink, '_blank');
      }
    } catch (e) { setToast('Failed to send'); }
    setNotifyModal(null);
    setNotifyMsg('');
    setTimeout(() => setToast(''), 3000);
  };

  const handleBulkReminder = async () => {
    try {
      const res = await axios.post(`${API_URL}/admin/notify-expiring`);
      if (res.data.success) setToast(res.data.message);
    } catch (e) { setToast('Failed to send reminders'); }
    setTimeout(() => setToast(''), 3000);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '\u{1F4CA}' },
    { id: 'members', name: 'Members', icon: '\u{1F465}' },
    { id: 'admissions', name: 'New Admissions', icon: '\u{1F4DD}' },
    { id: 'bookings', name: 'Bookings', icon: '\u{1F4C5}' },
    { id: 'notifications', name: 'Send Alerts', icon: '\u{1F514}' }
  ];

  const filteredMembers = search ? members.filter(m =>
    `${m.firstName} ${m.lastName} ${m.email} ${m.phone}`.toLowerCase().includes(search.toLowerCase())
  ) : members;

  const recentAdmissions = [...members].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);

  if (loading) return <div className="min-h-screen bg-slate-50 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  const OverviewContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: stats.totalMembers || 0, icon: '\u{1F465}', color: 'from-orange-500 to-amber-500' },
          { label: 'Active Members', value: stats.activeMembers || 0, icon: '\u2705', color: 'from-green-500 to-emerald-500' },
          { label: 'Total Bookings', value: stats.totalBookings || 0, icon: '\u{1F4C5}', color: 'from-blue-500 to-cyan-500' },
          { label: 'New This Month', value: stats.recentSignups || 0, icon: '\u{1F195}', color: 'from-purple-500 to-pink-500' }
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <div className={`w-10 h-10 bg-gradient-to-br ${s.color} rounded-xl opacity-20`}></div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{typeof s.value === 'number' ? s.value.toLocaleString('en-IN') : s.value}</p>
            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Members</h3>
          {members.slice(0, 5).map(m => (
            <div key={m.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">{(m.firstName || 'U')[0]}</div>
                <div><p className="font-medium text-slate-900 text-sm">{m.firstName} {m.lastName}</p><p className="text-xs text-slate-500">{m.email}</p></div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${m.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Bookings</h3>
          {bookings.slice(0, 5).map((b, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div><p className="font-medium text-slate-900 text-sm">{b.className}</p><p className="text-xs text-slate-500">{b.instructor} - User #{b.userId}</p></div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{b.status}</span>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-center py-6 text-slate-400">No bookings yet</p>}
        </div>
      </div>
    </div>
  );

  const MembersContent = () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input type="text" placeholder="Search by name, email, phone..." className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
        <button onClick={handleSearch} className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors">Search</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between"><h3 className="text-lg font-bold text-slate-900">All Members</h3><span className="text-sm text-slate-500">{filteredMembers.length} members</span></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-slate-50">
              <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Name</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Phone</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">City</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Joined</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-4"><p className="font-medium text-slate-900 text-sm">{m.firstName} {m.lastName}</p><p className="text-xs text-slate-500">{m.email}</p></td>
                  <td className="p-4 text-sm text-slate-700">{m.phone || '--'}</td>
                  <td className="p-4 text-sm text-slate-700">{m.addressCity || '--'}</td>
                  <td className="p-4 text-sm text-slate-700">{m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-IN') : '--'}</td>
                  <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${m.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleToggleStatus(m.id, m.isActive)} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${m.isActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>{m.isActive ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={() => { setNotifyModal(m); setNotifyMsg(''); }} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-blue-50 text-blue-600 hover:bg-blue-100">Notify</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AdmissionsContent = () => (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">New Admissions (Recent Signups)</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-slate-50">
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Name</th>
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Email</th>
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Phone</th>
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">City</th>
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Joined</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {recentAdmissions.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-900 text-sm">{m.firstName} {m.lastName}</td>
                <td className="p-4 text-sm text-slate-700">{m.email}</td>
                <td className="p-4 text-sm text-slate-700">{m.phone || '--'}</td>
                <td className="p-4 text-sm text-slate-700">{m.addressCity || '--'}</td>
                <td className="p-4 text-sm text-slate-700">{m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const BookingsContent = () => (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">All Class Bookings</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-slate-50">
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Class</th>
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Instructor</th>
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">User ID</th>
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Schedule</th>
            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((b, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-900 text-sm">{b.className}</td>
                <td className="p-4 text-sm text-slate-700">{b.instructor}</td>
                <td className="p-4 text-sm text-slate-700">#{b.userId}</td>
                <td className="p-4 text-sm text-slate-700">{b.date} {b.time}</td>
                <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bookings.length === 0 && <p className="text-center py-12 text-slate-400">No bookings yet</p>}
    </div>
  );

  const AlertsContent = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 rounded-2xl text-white">
        <h3 className="text-xl font-bold mb-2">Membership Renewal Reminders</h3>
        <p className="text-orange-100 mb-4">Send a renewal reminder notification to all active members. They will see it on their dashboard.</p>
        <button onClick={handleBulkReminder} className="bg-white text-orange-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-50 transition-colors">Send Bulk Reminder</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Send Individual Notification</h3>
        <p className="text-slate-500 text-sm mb-4">Go to the Members tab and click "Notify" next to any member to send them a personalized message via the app dashboard and WhatsApp.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewContent />;
      case 'members': return <MembersContent />;
      case 'admissions': return <AdmissionsContent />;
      case 'bookings': return <BookingsContent />;
      case 'notifications': return <AlertsContent />;
      default: return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && <div className="fixed top-20 right-6 z-50 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl shadow-lg font-medium text-sm">{toast}</div>}

      {notifyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Notify {notifyModal.firstName} {notifyModal.lastName}</h3>
            <p className="text-sm text-slate-500 mb-4">{notifyModal.email} | {notifyModal.phone || 'No phone'}</p>
            <textarea className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 h-28 resize-none mb-4"
              placeholder="Type your message..." value={notifyMsg} onChange={e => setNotifyMsg(e.target.value)} />
            <div className="flex gap-3">
              <button onClick={() => setNotifyModal(null)} className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-medium">Cancel</button>
              <button onClick={handleSendNotification} className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-medium transition-colors">Send + WhatsApp</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sticky top-24">
              <div className="mb-4 p-3 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl text-center">
                <p className="text-white font-bold">Admin Panel</p>
                <p className="text-slate-400 text-xs">{user?.firstName || 'Admin'}</p>
              </div>
              <div className="space-y-1">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${activeTab === t.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <span>{t.icon}</span><span>{t.name}</span>
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

export default AdminDashboard;