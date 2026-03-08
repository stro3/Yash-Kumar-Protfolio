import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardStats = {
    totalMembers: 1247,
    activeMembers: 1098,
    totalRevenue: 10475000,
    monthlyRevenue: 1537500,
    totalClasses: 45,
    totalTrainers: 12,
    todayVisits: 89,
    pendingPayments: 23
  };

  const allMembers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', joinDate: '2024-01-15', membership: 'Premium', expiryDate: '2025-01-15', status: 'Active', visitsThisMonth: 18, totalVisits: 156, regularity: 'Regular' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', joinDate: '2024-02-10', membership: 'Basic', expiryDate: '2025-02-10', status: 'Active', visitsThisMonth: 8, totalVisits: 72, regularity: 'Moderate' },
    { id: 3, name: 'Amit Singh', email: 'amit@example.com', phone: '9876543212', joinDate: '2023-11-01', membership: 'VIP', expiryDate: '2024-11-01', status: 'Expired', visitsThisMonth: 0, totalVisits: 220, regularity: 'Inactive' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', phone: '9876543213', joinDate: '2024-03-01', membership: 'Premium', expiryDate: '2025-03-01', status: 'Active', visitsThisMonth: 22, totalVisits: 198, regularity: 'Regular' },
    { id: 5, name: 'Vikram Joshi', email: 'vikram@example.com', phone: '9876543214', joinDate: '2024-06-15', membership: 'Basic', expiryDate: '2025-03-15', status: 'Active', visitsThisMonth: 3, totalVisits: 25, regularity: 'Irregular' },
    { id: 6, name: 'Ananya Gupta', email: 'ananya@example.com', phone: '9876543215', joinDate: '2024-01-20', membership: 'Premium', expiryDate: '2024-03-20', status: 'Expired', visitsThisMonth: 0, totalVisits: 45, regularity: 'Inactive' }
  ];

  const expiringMembers = allMembers.filter(m => {
    const expiry = new Date(m.expiryDate);
    const today = new Date();
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 || m.status === 'Expired';
  });

  const recentPayments = [
    { id: 1, member: 'Rahul Sharma', amount: 4999, date: '2024-12-15', status: 'Completed', method: 'UPI' },
    { id: 2, member: 'Priya Patel', amount: 2499, date: '2024-12-14', status: 'Completed', method: 'Card' },
    { id: 3, member: 'Vikram Joshi', amount: 2499, date: '2024-12-13', status: 'Pending', method: 'Bank Transfer' }
  ];

  const trainers = [
    { id: 1, name: 'Sarah Johnson', speciality: 'Yoga', members: 45, rating: 4.9, status: 'Active' },
    { id: 2, name: 'Mike Chen', speciality: 'CrossFit', members: 38, rating: 4.8, status: 'Active' },
    { id: 3, name: 'Maria Garcia', speciality: 'Zumba', members: 52, rating: 4.9, status: 'Active' }
  ];

  const upcomingClasses = [
    { id: 1, name: 'Morning Yoga', instructor: 'Sarah Johnson', time: '07:00 AM', capacity: 25, booked: 18 },
    { id: 2, name: 'HIIT Cardio', instructor: 'Emma Wilson', time: '06:00 PM', capacity: 30, booked: 22 },
    { id: 3, name: 'CrossFit Bootcamp', instructor: 'Mike Chen', time: '06:00 PM', capacity: 20, booked: 12 }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'members', name: 'Members', icon: '👥' },
    { id: 'expiry', name: 'Expiry Alerts', icon: '⚠️' },
    { id: 'trainers', name: 'Trainers', icon: '🏃' },
    { id: 'classes', name: 'Classes', icon: '📅' },
    { id: 'payments', name: 'Payments', icon: '💳' }
  ];

  const getRegularityBadge = (r) => {
    if (r === 'Regular') return 'bg-green-100 text-green-700';
    if (r === 'Moderate') return 'bg-blue-100 text-blue-700';
    if (r === 'Irregular') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const OverviewContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-xl"><p className="text-sm text-slate-500">Total Members</p><p className="text-3xl font-bold text-slate-900">{dashboardStats.totalMembers.toLocaleString('en-IN')}</p><p className="text-sm text-green-600 mt-1">+12% from last month</p></div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl"><p className="text-sm text-slate-500">Monthly Revenue</p><p className="text-3xl font-bold text-slate-900">₹{dashboardStats.monthlyRevenue.toLocaleString('en-IN')}</p><p className="text-sm text-green-600 mt-1">+8% from last month</p></div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl"><p className="text-sm text-slate-500">Active Members</p><p className="text-3xl font-bold text-slate-900">{dashboardStats.activeMembers.toLocaleString('en-IN')}</p><p className="text-sm text-slate-500 mt-1">88% of total</p></div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl"><p className="text-sm text-slate-500">Today's Visits</p><p className="text-3xl font-bold text-orange-500">{dashboardStats.todayVisits}</p><p className="text-sm text-slate-500 mt-1">Real-time</p></div>
      </div>

      {expiringMembers.length > 0 && (
        <div className="bg-white border-l-4 border-red-500 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><span className="text-xl">⚠️</span><h3 className="text-lg font-bold text-slate-900">Membership Renewals</h3></div>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">{expiringMembers.filter(m => m.status === 'Expired').length} Expired</span>
          </div>
          <div className="space-y-2">
            {expiringMembers.slice(0, 3).map(m => (
              <div key={m.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="font-medium text-slate-900">{m.name}</p><p className="text-sm text-slate-500">{m.email}</p></div>
                <div className="flex items-center gap-3"><span className="text-sm text-slate-500">{m.membership}</span><span className={`text-xs px-2 py-1 rounded-full font-medium ${m.status === 'Expired' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span></div>
              </div>
            ))}
          </div>
          <button onClick={() => setActiveTab('expiry')} className="mt-3 text-orange-500 hover:text-orange-600 font-medium text-sm">View All →</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-5 rounded-xl">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Members</h3>
          <div className="space-y-3">
            {allMembers.slice(0, 3).map(m => (
              <div key={m.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="font-medium text-slate-900">{m.name}</p><p className="text-sm text-slate-500">{m.email}</p></div>
                <div className="text-right"><p className="text-sm font-medium">{m.membership}</p><span className={`text-xs px-2 py-1 rounded-full ${getRegularityBadge(m.regularity)}`}>{m.regularity}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Today's Classes</h3>
          <div className="space-y-3">
            {upcomingClasses.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="font-medium text-slate-900">{c.name}</p><p className="text-sm text-slate-500">{c.instructor}</p></div>
                <div className="text-right"><p className="text-sm font-medium">{c.time}</p><p className="text-xs text-slate-500">{c.booked}/{c.capacity} booked</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MembersContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">All Members</h3>
        <div className="text-sm text-slate-500">{allMembers.length} members</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-slate-50"><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Name</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Plan</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Expiry</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Visits/Month</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Regularity</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Status</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {allMembers.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-4"><p className="font-medium text-slate-900">{m.name}</p><p className="text-xs text-slate-500">{m.email}</p></td>
                <td className="p-4 text-sm text-slate-700">{m.membership}</td>
                <td className="p-4 text-sm text-slate-700">{m.expiryDate}</td>
                <td className="p-4 text-sm font-semibold text-slate-900">{m.visitsThisMonth}</td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${getRegularityBadge(m.regularity)}`}>{m.regularity}</span></td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${m.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ExpiryContent = () => (
    <div className="space-y-4">
      <div className="bg-red-50 border border-red-200 p-4 rounded-xl"><p className="text-red-700 font-semibold">⚠️ {expiringMembers.filter(m => m.status === 'Expired').length} members have expired memberships. {expiringMembers.filter(m => m.status !== 'Expired').length} are expiring within 30 days.</p></div>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-slate-50"><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Member</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Plan</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Expiry Date</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Last Visit</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Regularity</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {expiringMembers.map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-4"><p className="font-medium text-slate-900">{m.name}</p><p className="text-xs text-slate-500">{m.phone}</p></td>
                  <td className="p-4 text-sm">{m.membership}</td>
                  <td className="p-4 text-sm font-medium text-red-600">{m.expiryDate}</td>
                  <td className="p-4 text-sm">{m.visitsThisMonth > 0 ? `${m.visitsThisMonth} this month` : 'Not visited'}</td>
                  <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${getRegularityBadge(m.regularity)}`}>{m.regularity}</span></td>
                  <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${m.status === 'Expired' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TrainersContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Trainers</h3></div>
      <div className="divide-y divide-slate-100">
        {trainers.map(t => (
          <div key={t.id} className="flex items-center justify-between p-5">
            <div><p className="font-semibold text-slate-900">{t.name}</p><p className="text-sm text-slate-500">{t.speciality}</p></div>
            <div className="flex items-center gap-6 text-sm">
              <div><span className="text-slate-400">Members:</span> <span className="font-semibold text-slate-900">{t.members}</span></div>
              <div><span className="text-yellow-400">★</span> <span className="font-semibold">{t.rating}</span></div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ClassesContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Classes Schedule</h3></div>
      <div className="divide-y divide-slate-100">
        {upcomingClasses.map(c => (
          <div key={c.id} className="flex items-center justify-between p-5">
            <div><p className="font-semibold text-slate-900">{c.name}</p><p className="text-sm text-slate-500">{c.instructor}</p></div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">{c.time}</span>
              <div className="w-24 bg-slate-100 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(c.booked / c.capacity) * 100}%` }}></div></div>
              <span className="text-slate-500">{c.booked}/{c.capacity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PaymentsContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Recent Payments</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-slate-50"><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Member</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Amount</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Date</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Method</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Status</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {recentPayments.map(p => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="p-4 text-sm font-medium text-slate-900">{p.member}</td>
                <td className="p-4 text-sm font-semibold text-slate-900">₹{p.amount.toLocaleString('en-IN')}</td>
                <td className="p-4 text-sm text-slate-600">{p.date}</td>
                <td className="p-4 text-sm text-slate-600">{p.method}</td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewContent />;
      case 'members': return <MembersContent />;
      case 'expiry': return <ExpiryContent />;
      case 'trainers': return <TrainersContent />;
      case 'classes': return <ClassesContent />;
      case 'payments': return <PaymentsContent />;
      default: return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-24">
              <div className="mb-4 p-3 bg-slate-900 rounded-xl text-center"><p className="text-white font-bold">Admin Panel</p><p className="text-slate-400 text-xs">{user?.firstName || 'Admin'}</p></div>
              <div className="space-y-1">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${activeTab === t.id ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <span>{t.icon}</span><span>{t.name}</span>
                    {t.id === 'expiry' && expiringMembers.length > 0 && <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${activeTab === t.id ? 'bg-white/30' : 'bg-red-100 text-red-600'}`}>{expiringMembers.length}</span>}
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