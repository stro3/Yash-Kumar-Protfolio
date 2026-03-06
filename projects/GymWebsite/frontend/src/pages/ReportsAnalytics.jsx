import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ReportsAnalytics = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock analytics data
  const analyticsData = {
    revenue: {
      month: { current: 18450, previous: 16800, growth: 9.8 },
      quarter: { current: 52400, previous: 48200, growth: 8.7 },
      year: { current: 198500, previous: 175300, growth: 13.2 }
    },
    members: {
      month: { current: 1247, previous: 1189, growth: 4.9 },
      quarter: { current: 1247, previous: 1156, growth: 7.9 },
      year: { current: 1247, previous: 987, growth: 26.3 }
    },
    retention: {
      month: { current: 92.5, previous: 89.2, growth: 3.7 },
      quarter: { current: 88.4, previous: 85.1, growth: 3.9 },
      year: { current: 79.8, previous: 75.2, growth: 6.1 }
    }
  };

  const membershipBreakdown = [
    { type: 'Basic', count: 487, percentage: 39.1, revenue: 14610 },
    { type: 'Premium', count: 562, percentage: 45.1, revenue: 28100 },
    { type: 'Elite', count: 198, percentage: 15.9, revenue: 15840 }
  ];

  const classPopularity = [
    { name: 'Yoga', bookings: 324, capacity: 400, utilization: 81 },
    { name: 'HIIT', bookings: 298, capacity: 350, utilization: 85 },
    { name: 'Zumba', bookings: 267, capacity: 300, utilization: 89 },
    { name: 'CrossFit', bookings: 234, capacity: 275, utilization: 85 },
    { name: 'Strength Training', bookings: 189, capacity: 250, utilization: 76 }
  ];

  const trainerPerformance = [
    { name: 'Sarah Johnson', sessions: 78, revenue: 5850, rating: 4.9, clients: 32 },
    { name: 'Mike Chen', sessions: 65, revenue: 5525, rating: 4.8, clients: 28 },
    { name: 'Maria Garcia', sessions: 72, revenue: 5040, rating: 4.9, clients: 36 },
    { name: 'David Brown', sessions: 58, revenue: 4640, rating: 4.7, clients: 25 }
  ];

  const monthlyTrends = [
    { month: 'Jan', revenue: 15400, members: 1098, classes: 234 },
    { month: 'Feb', revenue: 16200, members: 1134, classes: 267 },
    { month: 'Mar', revenue: 17100, members: 1167, classes: 289 },
    { month: 'Apr', revenue: 16800, members: 1189, classes: 278 },
    { month: 'May', revenue: 18450, members: 1247, classes: 324 }
  ];

  const getCurrentData = () => {
    return analyticsData[selectedMetric][selectedPeriod];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'revenue': return '💰';
      case 'members': return '👥';
      case 'retention': return '🔄';
      default: return '📊';
    }
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your gym's performance</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Metric</label>
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="revenue">Revenue</option>
                <option value="members">Members</option>
                <option value="retention">Retention Rate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(analyticsData.revenue[selectedPeriod].current)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-green-600 text-2xl">💰</span>
              </div>
            </div>
            <p className={`text-sm mt-2 ${getGrowthColor(analyticsData.revenue[selectedPeriod].growth)}`}>
              ↗ +{analyticsData.revenue[selectedPeriod].growth}% from last {selectedPeriod}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData.members[selectedPeriod].current.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-blue-600 text-2xl">👥</span>
              </div>
            </div>
            <p className={`text-sm mt-2 ${getGrowthColor(analyticsData.members[selectedPeriod].growth)}`}>
              ↗ +{analyticsData.members[selectedPeriod].growth}% from last {selectedPeriod}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Retention Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analyticsData.retention[selectedPeriod].current}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-purple-600 text-2xl">🔄</span>
              </div>
            </div>
            <p className={`text-sm mt-2 ${getGrowthColor(analyticsData.retention[selectedPeriod].growth)}`}>
              ↗ +{analyticsData.retention[selectedPeriod].growth}% from last {selectedPeriod}
            </p>
          </div>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Membership Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Membership Breakdown</h3>
            <div className="space-y-4">
              {membershipBreakdown.map((membership, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500" style={{
                      backgroundColor: index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : '#F59E0B'
                    }}></div>
                    <span className="font-medium">{membership.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{membership.count} members</div>
                    <div className="text-sm text-gray-600">{formatCurrency(membership.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class Utilization */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Class Utilization</h3>
            <div className="space-y-4">
              {classPopularity.map((classItem, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{classItem.name}</span>
                    <span className="text-sm text-gray-600">{classItem.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${classItem.utilization}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {classItem.bookings}/{classItem.capacity} bookings
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trainer Performance */}
        <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Trainer Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trainerPerformance.map((trainer, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trainer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.sessions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(trainer.revenue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">⭐ {trainer.rating}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.clients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-900">{month.month}</div>
                <div className="mt-2 space-y-1">
                  <div className="text-sm">
                    <div className="text-green-600 font-medium">{formatCurrency(month.revenue)}</div>
                    <div className="text-gray-500">Revenue</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-blue-600 font-medium">{month.members}</div>
                    <div className="text-gray-500">Members</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-purple-600 font-medium">{month.classes}</div>
                    <div className="text-gray-500">Classes</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            📊 Export Report
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
            📈 Generate Dashboard
          </button>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
            📧 Email Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;