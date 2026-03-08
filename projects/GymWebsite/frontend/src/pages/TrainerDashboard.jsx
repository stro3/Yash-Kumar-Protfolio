import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const trainerStats = { totalClients: 45, activePlans: 38, thisWeekSessions: 24, completedSessions: 156, averageRating: 4.8, totalRatings: 89 };

  const myClients = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', joinDate: '2023-10-15', membership: 'Premium', expiryDate: '2025-01-15', goal: 'Weight Loss', progress: 75, lastSession: '2024-12-14', nextSession: '2024-12-16', visitsThisMonth: 18, regularity: 'Regular' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', joinDate: '2023-11-01', membership: 'Basic', expiryDate: '2025-02-10', goal: 'Muscle Gain', progress: 60, lastSession: '2024-12-13', nextSession: '2024-12-15', visitsThisMonth: 8, regularity: 'Moderate' },
    { id: 3, name: 'Amit Singh', email: 'amit@example.com', phone: '9876543212', joinDate: '2023-09-20', membership: 'VIP', expiryDate: '2024-11-01', goal: 'Strength Training', progress: 85, lastSession: '2024-11-12', nextSession: '', visitsThisMonth: 0, regularity: 'Inactive' }
  ];

  const upcomingSessions = [
    { id: 1, client: 'Rahul Sharma', date: '2024-12-16', time: '09:00 AM', type: 'Personal Training', location: 'Gym Floor' },
    { id: 2, client: 'Priya Patel', date: '2024-12-16', time: '02:00 PM', type: 'Strength Training', location: 'Weight Room' },
    { id: 3, client: 'Sneha Reddy', date: '2024-12-17', time: '10:00 AM', type: 'CrossFit', location: 'CrossFit Area' }
  ];

  const clientProgress = [
    { client: 'Rahul Sharma', metric: 'Weight', before: '85 kg', current: '77 kg', target: '72 kg' },
    { client: 'Priya Patel', metric: 'Bench Press', before: '30 kg', current: '50 kg', target: '60 kg' },
    { client: 'Amit Singh', metric: 'Body Fat', before: '18%', current: '12%', target: '10%' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'clients', name: 'My Clients', icon: '👥' },
    { id: 'sessions', name: 'Sessions', icon: '📅' },
    { id: 'progress', name: 'Progress', icon: '📈' }
  ];

  const getRegularityBadge = (r) => {
    if (r === 'Regular') return 'bg-green-100 text-green-700';
    if (r === 'Moderate') return 'bg-blue-100 text-blue-700';
    if (r === 'Irregular') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const OverviewContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-xl"><p className="text-sm text-slate-500">Total Clients</p><p className="text-3xl font-bold text-slate-900">{trainerStats.totalClients}</p><p className="text-sm text-green-600 mt-1">+3 new this month</p></div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl"><p className="text-sm text-slate-500">This Week Sessions</p><p className="text-3xl font-bold text-orange-500">{trainerStats.thisWeekSessions}</p><p className="text-sm text-slate-500 mt-1">8 remaining</p></div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl"><p className="text-sm text-slate-500">Average Rating</p><p className="text-3xl font-bold text-yellow-500">{trainerStats.averageRating} ★</p><p className="text-sm text-slate-500 mt-1">{trainerStats.totalRatings} reviews</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-5 rounded-xl">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Client Regularity</h3>
          <div className="space-y-3">
            {myClients.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="font-medium text-slate-900">{c.name}</p><p className="text-sm text-slate-500">{c.visitsThisMonth} visits this month</p></div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRegularityBadge(c.regularity)}`}>{c.regularity}</span>
                  {c.expiryDate && new Date(c.expiryDate) < new Date() && <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Expired</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Today's Sessions</h3>
          <div className="space-y-3">
            {upcomingSessions.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div><p className="font-medium text-slate-900">{s.client}</p><p className="text-sm text-slate-500">{s.type}</p></div>
                <div className="text-right"><p className="text-sm font-medium">{s.time}</p><p className="text-xs text-slate-500">{s.location}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-l-4 border-yellow-400 p-5 rounded-xl">
        <h3 className="font-bold text-slate-900 mb-3">⚠️ Membership Alerts</h3>
        <div className="space-y-2">
          {myClients.filter(c => c.regularity === 'Inactive' || new Date(c.expiryDate) < new Date()).map(c => (
            <div key={c.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div><p className="font-medium text-slate-900">{c.name}</p><p className="text-sm text-red-600">Membership expired: {c.expiryDate}</p></div>
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">{c.regularity}</span>
            </div>
          ))}
          {myClients.filter(c => c.regularity === 'Inactive' || new Date(c.expiryDate) < new Date()).length === 0 && (
            <p className="text-slate-500 text-sm">No alerts at this time.</p>
          )}
        </div>
      </div>
    </div>
  );

  const ClientsContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">My Clients</h3></div>
      <div className="space-y-4 p-5">
        {myClients.map(c => (
          <div key={c.id} className="border border-slate-200 rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{c.name}</h4>
                <p className="text-sm text-slate-500">{c.email} | {c.phone}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-500">{c.progress}%</div>
                <span className={`text-xs px-2 py-1 rounded-full ${getRegularityBadge(c.regularity)}`}>{c.regularity}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
              <div><span className="text-slate-400">Goal:</span> <span className="font-medium text-slate-900">{c.goal}</span></div>
              <div><span className="text-slate-400">Plan:</span> <span className="font-medium text-slate-900">{c.membership}</span></div>
              <div><span className="text-slate-400">Expiry:</span> <span className={`font-medium ${new Date(c.expiryDate) < new Date() ? 'text-red-600' : 'text-slate-900'}`}>{c.expiryDate}</span></div>
              <div><span className="text-slate-400">Visits/mo:</span> <span className="font-medium text-slate-900">{c.visitsThisMonth}</span></div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{ width: `${c.progress}%` }}></div></div>
          </div>
        ))}
      </div>
    </div>
  );

  const SessionsContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Upcoming Sessions</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-slate-50"><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Client</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Date</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Time</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Type</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Location</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {upcomingSessions.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-4 text-sm font-medium text-slate-900">{s.client}</td>
                <td className="p-4 text-sm text-slate-600">{s.date}</td>
                <td className="p-4 text-sm text-slate-600">{s.time}</td>
                <td className="p-4 text-sm text-slate-600">{s.type}</td>
                <td className="p-4 text-sm text-slate-600">{s.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ProgressContent = () => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">Client Progress</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-slate-50"><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Client</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Metric</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Before</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Current</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Target</th><th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Status</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {clientProgress.map((p, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 text-sm font-medium text-slate-900">{p.client}</td>
                <td className="p-4 text-sm text-slate-700">{p.metric}</td>
                <td className="p-4 text-sm text-slate-500">{p.before}</td>
                <td className="p-4 text-sm font-semibold text-orange-500">{p.current}</td>
                <td className="p-4 text-sm text-slate-700">{p.target}</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">On Track</span></td>
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
      case 'clients': return <ClientsContent />;
      case 'sessions': return <SessionsContent />;
      case 'progress': return <ProgressContent />;
      default: return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-24">
              <div className="mb-4 p-3 bg-orange-500 rounded-xl text-center"><p className="text-white font-bold">Trainer Panel</p><p className="text-white/70 text-xs">{user?.firstName || 'Trainer'}</p></div>
              <div className="space-y-1">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${activeTab === t.id ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
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

export default TrainerDashboard;