import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MemberPortal = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [membershipAlert, setMembershipAlert] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, notifRes] = await Promise.allSettled([
          axios.get(`${API_URL}/users/profile`),
          axios.get(`${API_URL}/notifications`)
        ]);

        if (profileRes.status === 'fulfilled' && profileRes.value.data.success) {
          const profile = profileRes.value.data.data;
          setMemberData(profile.membership || null);
          setBookings(profile.bookings || []);
          setInvoices(profile.invoices || []);
        }

        if (notifRes.status === 'fulfilled' && notifRes.value.data.success) {
          setNotifications(notifRes.value.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_URL]);

  useEffect(() => {
    if (memberData && memberData.expiryDate) {
      const today = new Date();
      const expiry = new Date(memberData.expiryDate);
      const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

      if (daysLeft <= 0) {
        setMembershipAlert({ type: 'expired', message: 'Your membership has expired. Renew now to continue accessing the gym.', days: 0 });
      } else if (daysLeft <= 7) {
        setMembershipAlert({ type: 'expiring', message: `Your membership expires in ${daysLeft} day${daysLeft > 1 ? 's' : ''}. Renew to avoid interruption.`, days: daysLeft });
      } else if (daysLeft <= 30) {
        setMembershipAlert({ type: 'warning', message: `Your membership expires in ${daysLeft} days.`, days: daysLeft });
      }
    }
  }, [memberData]);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'bookings', name: 'My Bookings', icon: '📅' },
    { id: 'invoices', name: 'Invoices', icon: '📄' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'profile', name: 'Profile', icon: '👤' }
  ];

  const DashboardContent = () => (
    <div className="space-y-6">
      {membershipAlert && (
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          membershipAlert.type === 'expired' ? 'bg-red-50 border-red-200 text-red-700' :
          membershipAlert.type === 'expiring' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
          'bg-orange-50 border-orange-200 text-orange-700'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{membershipAlert.type === 'expired' ? '🚫' : '⚠️'}</span>
            <div>
              <p className="font-semibold">{membershipAlert.type === 'expired' ? 'Membership Expired' : 'Membership Expiring Soon'}</p>
              <p className="text-sm">{membershipAlert.message}</p>
            </div>
          </div>
          <Link to="/memberships" className={`px-4 py-2 rounded-lg text-sm font-semibold flex-shrink-0 ${
            membershipAlert.type === 'expired' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}>Renew Now</Link>
        </div>
      )}

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-sm">Welcome back,</p>
            <h2 className="text-2xl font-bold">{user?.firstName || 'Member'} {user?.lastName || ''}</h2>
            <p className="text-orange-400 font-medium mt-1">{memberData?.plan || 'No Active Plan'}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs">Member ID</p>
            <p className="font-mono text-sm">{user?.id ? `GM-${user.id}` : '--'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-3xl font-bold text-orange-500">{memberData?.totalVisits || 0}</div>
          <div className="text-sm text-slate-500 mt-1">Total Visits</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-3xl font-bold text-orange-500">{bookings.length}</div>
          <div className="text-sm text-slate-500 mt-1">Bookings</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-3xl font-bold text-orange-500">{memberData?.status === 'Active' ? 'Active' : '--'}</div>
          <div className="text-sm text-slate-500 mt-1">Status</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-3xl font-bold text-orange-500">{invoices.length}</div>
          <div className="text-sm text-slate-500 mt-1">Payments</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Classes</h3>
          {bookings.length > 0 ? (
            bookings.slice(0, 3).map((b, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-semibold text-slate-900">{b.className || b.class}</p>
                  <p className="text-sm text-slate-500">{b.instructor || 'Trainer'} - {b.time || ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{b.date || ''}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status || 'Pending'}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p className="mb-2">No upcoming bookings</p>
              <Link to="/classes" className="text-orange-500 font-medium text-sm hover:text-orange-600">Browse Classes</Link>
            </div>
          )}
          {bookings.length > 0 && <Link to="/classes" className="block text-center mt-4 text-orange-500 hover:text-orange-600 font-medium text-sm">View All Classes</Link>}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/classes" className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 p-4 rounded-xl transition-colors">
              <span className="text-2xl">📅</span>
              <span className="font-medium text-slate-900 text-sm">Book Class</span>
            </Link>
            <Link to="/trainers" className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-4 rounded-xl transition-colors">
              <span className="text-2xl">👨‍🏫</span>
              <span className="font-medium text-slate-900 text-sm">Contact Trainer</span>
            </Link>
            <Link to="/memberships" className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-4 rounded-xl transition-colors">
              <span className="text-2xl">💳</span>
              <span className="font-medium text-slate-900 text-sm">Renew Plan</span>
            </Link>
            <Link to="/progress" className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-4 rounded-xl transition-colors">
              <span className="text-2xl">📈</span>
              <span className="font-medium text-slate-900 text-sm">View Progress</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Membership Details</h3>
        {memberData ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><span className="text-slate-400 text-sm">Plan</span><p className="font-semibold text-slate-900">{memberData.plan}</p></div>
            <div><span className="text-slate-400 text-sm">Status</span><p className="font-semibold text-green-600">{memberData.status}</p></div>
            <div><span className="text-slate-400 text-sm">Start Date</span><p className="font-semibold text-slate-900">{memberData.startDate || '--'}</p></div>
            <div><span className="text-slate-400 text-sm">Expiry Date</span><p className="font-semibold text-slate-900">{memberData.expiryDate || '--'}</p></div>
          </div>
        ) : (
          <div className="text-center py-4 text-slate-400">
            <p className="mb-2">No active membership</p>
            <Link to="/memberships" className="text-orange-500 font-medium hover:text-orange-600">Choose a Plan</Link>
          </div>
        )}
      </div>
    </div>
  );

  const BookingsContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">My Bookings</h3></div>
      {bookings.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {bookings.map((b, i) => (
            <div key={i} className="flex items-center justify-between p-6">
              <div>
                <p className="font-semibold text-slate-900">{b.className || b.class}</p>
                <p className="text-sm text-slate-500">{b.instructor || ''}</p>
                <p className="text-sm text-slate-400">{b.date || ''} at {b.time || ''}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status || 'Pending'}</span>
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

  const InvoicesContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Payment History</h3></div>
      {invoices.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-slate-50"><th className="text-left p-4 text-sm font-semibold text-slate-600">Invoice</th><th className="text-left p-4 text-sm font-semibold text-slate-600">Date</th><th className="text-left p-4 text-sm font-semibold text-slate-600">Amount</th><th className="text-left p-4 text-sm font-semibold text-slate-600">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4 text-sm font-mono text-slate-700">{inv.id || `INV-${i + 1}`}</td>
                  <td className="p-4 text-sm text-slate-600">{inv.date || ''}</td>
                  <td className="p-4 text-sm font-semibold text-slate-900">{inv.amount || ''}</td>
                  <td className="p-4"><span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{inv.status || 'Paid'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400">
          <p className="text-lg">No payment history yet</p>
        </div>
      )}
    </div>
  );

  const NotificationsContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Notifications</h3></div>
      {notifications.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {notifications.map((n, i) => (
            <div key={i} className="flex items-start gap-4 p-6">
              <span className="text-2xl">{n.type === 'class' ? '📅' : n.type === 'announcement' ? '📢' : '🔔'}</span>
              <div className="flex-1">
                <p className="text-slate-900">{n.message}</p>
                <p className="text-sm text-slate-400 mt-1">{n.time || n.createdAt || ''}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400">
          <p className="text-lg">No notifications</p>
        </div>
      )}
    </div>
  );

  const ProfileContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Profile Settings</h3>
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-3xl">{(user?.firstName || 'M')[0]}</div>
        <div>
          <h4 className="text-xl font-bold text-slate-900">{user?.firstName || ''} {user?.lastName || ''}</h4>
          <p className="text-slate-500">{user?.email || ''}</p>
          <p className="text-orange-500 font-medium text-sm">{memberData?.plan || 'No Plan'}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">First Name</label><input type="text" defaultValue={user?.firstName || ''} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label><input type="text" defaultValue={user?.lastName || ''} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input type="email" defaultValue={user?.email || ''} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input type="tel" defaultValue={user?.phone || ''} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
      </div>
      <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">Save Changes</button>
    </div>
  );

  const renderContent = () => {
    if (loading) return <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'bookings': return <BookingsContent />;
      case 'invoices': return <InvoicesContent />;
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
            <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-24">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                      activeTab === tab.id ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-50'
                    }`}>
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                    {tab.id === 'notifications' && notifications.length > 0 && (
                      <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/30 text-white' : 'bg-orange-100 text-orange-600'}`}>{notifications.length}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPortal;