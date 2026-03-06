import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MemberPortal = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for member information
  const memberData = {
    membershipType: 'Premium',
    memberSince: '2023-01-15',
    membershipExpiry: '2024-01-15',
    status: 'Active',
    membershipId: 'GM-2023-001234',
    personalTrainer: 'Sarah Johnson',
    nextPayment: '2024-01-15',
    totalVisits: 156,
    thisMonthVisits: 12
  };

  const recentBookings = [
    { id: 1, class: 'Morning Yoga', date: '2023-12-15', time: '7:00 AM', status: 'Confirmed' },
    { id: 2, class: 'HIIT Cardio', date: '2023-12-17', time: '6:00 PM', status: 'Confirmed' },
    { id: 3, class: 'CrossFit Bootcamp', date: '2023-12-20', time: '6:00 PM', status: 'Waitlist' }
  ];

  const invoices = [
    { id: 'INV-001', date: '2023-12-01', amount: '$79.99', status: 'Paid', type: 'Monthly Membership' },
    { id: 'INV-002', date: '2023-11-01', amount: '$79.99', status: 'Paid', type: 'Monthly Membership' },
    { id: 'INV-003', date: '2023-10-01', amount: '$79.99', status: 'Paid', type: 'Monthly Membership' }
  ];

  const workoutStats = [
    { month: 'Dec 2023', visits: 12, classes: 8, personalTraining: 4 },
    { month: 'Nov 2023', visits: 15, classes: 10, personalTraining: 5 },
    { month: 'Oct 2023', visits: 18, classes: 12, personalTraining: 6 }
  ];

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'membership', name: 'Membership', icon: '💳' },
    { id: 'bookings', name: 'Bookings', icon: '📅' },
    { id: 'invoices', name: 'Invoices', icon: '📄' },
    { id: 'profile', name: 'Profile', icon: '👤' }
  ];

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.firstName || 'Member'}!</h2>
        <p className="text-blue-100">You've visited {memberData.thisMonthVisits} times this month. Keep up the great work!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">{memberData.totalVisits}</div>
          <div className="text-gray-600">Total Visits</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{memberData.thisMonthVisits}</div>
          <div className="text-gray-600">This Month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">{memberData.membershipType}</div>
          <div className="text-gray-600">Membership</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-orange-600">Active</div>
          <div className="text-gray-600">Status</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {recentBookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{booking.class}</div>
                  <div className="text-sm text-gray-600">{booking.date} at {booking.time}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Workout Progress</h3>
          <div className="space-y-3">
            {workoutStats.slice(0, 3).map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="font-medium">{stat.month}</div>
                <div className="text-sm text-gray-600">
                  {stat.visits} visits, {stat.classes} classes, {stat.personalTraining} PT sessions
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MembershipContent = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Membership Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Membership ID</label>
              <p className="mt-1 text-sm text-gray-900">{memberData.membershipId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Membership Type</label>
              <p className="mt-1 text-sm text-gray-900">{memberData.membershipType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {memberData.status}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-sm text-gray-900">{new Date(memberData.memberSince).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <p className="mt-1 text-sm text-gray-900">{new Date(memberData.membershipExpiry).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Next Payment</label>
              <p className="mt-1 text-sm text-gray-900">{new Date(memberData.nextPayment).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Renew Membership
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
            Freeze Membership
          </button>
        </div>
      </div>
    </div>
  );

  const BookingsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">My Bookings</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Book New Class
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const InvoicesContent = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Billing History</h3>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ProfileContent = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={user?.firstName || 'John'} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={user?.lastName || 'Doe'} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={user?.email || 'john.doe@example.com'} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="+1 (555) 123-4567" />
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Update Profile
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="Spouse" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="+1 (555) 987-6543" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'membership': return <MembershipContent />;
      case 'bookings': return <BookingsContent />;
      case 'invoices': return <InvoicesContent />;
      case 'profile': return <ProfileContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Member Portal</h1>
          <p className="text-gray-600">Manage your membership and track your fitness journey</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default MemberPortal;