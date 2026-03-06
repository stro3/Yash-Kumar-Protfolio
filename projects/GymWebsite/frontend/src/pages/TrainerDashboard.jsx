import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for trainer dashboard
  const trainerStats = {
    totalClients: 45,
    activePlans: 38,
    thisWeekSessions: 24,
    completedSessions: 156,
    averageRating: 4.8,
    totalRatings: 89
  };

  const myClients = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      joinDate: '2023-10-15',
      goal: 'Weight Loss',
      progress: 75,
      lastSession: '2023-12-14',
      nextSession: '2023-12-16'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      joinDate: '2023-11-01',
      goal: 'Muscle Gain',
      progress: 60,
      lastSession: '2023-12-13',
      nextSession: '2023-12-15'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      joinDate: '2023-09-20',
      goal: 'Strength Training',
      progress: 85,
      lastSession: '2023-12-12',
      nextSession: '2023-12-17'
    }
  ];

  const upcomingSessions = [
    { id: 1, client: 'John Smith', date: '2023-12-16', time: '09:00 AM', type: 'Personal Training', location: 'Gym Floor' },
    { id: 2, client: 'Sarah Wilson', date: '2023-12-16', time: '02:00 PM', type: 'Strength Training', location: 'Weight Room' },
    { id: 3, client: 'Mike Johnson', date: '2023-12-17', time: '10:00 AM', type: 'CrossFit', location: 'CrossFit Area' }
  ];

  const workoutPlans = [
    {
      id: 1,
      client: 'John Smith',
      planName: 'Weight Loss Program',
      duration: '12 weeks',
      startDate: '2023-10-15',
      progress: 75,
      exercises: ['Cardio', 'HIIT', 'Strength Training']
    },
    {
      id: 2,
      client: 'Sarah Wilson',
      planName: 'Muscle Building Program',
      duration: '16 weeks',
      startDate: '2023-11-01',
      progress: 60,
      exercises: ['Weight Training', 'Compound Movements', 'Progressive Overload']
    }
  ];

  const clientProgress = [
    { client: 'John Smith', metric: 'Weight', before: '185 lbs', current: '170 lbs', target: '160 lbs' },
    { client: 'Sarah Wilson', metric: 'Bench Press', before: '95 lbs', current: '135 lbs', target: '155 lbs' },
    { client: 'Mike Johnson', metric: 'Body Fat', before: '18%', current: '12%', target: '10%' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'clients', name: 'My Clients', icon: '👥' },
    { id: 'sessions', name: 'Sessions', icon: '📅' },
    { id: 'plans', name: 'Workout Plans', icon: '💪' },
    { id: 'progress', name: 'Progress Tracking', icon: '📈' }
  ];

  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-3xl font-bold text-gray-900">{trainerStats.totalClients}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +3 new this month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week Sessions</p>
              <p className="text-3xl font-bold text-gray-900">{trainerStats.thisWeekSessions}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-green-600 text-xl">🏋️</span>
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">8 sessions remaining</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">{trainerStats.averageRating}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-yellow-600 text-xl">⭐</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Based on {trainerStats.totalRatings} reviews</p>
        </div>
      </div>

      {/* Quick Actions and Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm font-medium">Create Workout Plan</div>
            </button>
            <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-medium">Schedule Session</div>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Record Progress</div>
            </button>
            <button className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm font-medium">Message Client</div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Today's Sessions</h3>
          <div className="space-y-3">
            {upcomingSessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{session.client}</div>
                  <div className="text-sm text-gray-600">{session.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{session.time}</div>
                  <div className="text-xs text-gray-600">{session.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ClientsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">My Clients</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add New Client
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClients.map((client) => (
          <div key={client.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">{client.name}</h4>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{client.progress}%</div>
                <div className="text-xs text-gray-600">Progress</div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Goal:</span>
                <span className="font-medium">{client.goal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Joined:</span>
                <span className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Session:</span>
                <span className="font-medium">{new Date(client.lastSession).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Next Session:</span>
                <span className="font-medium text-blue-600">{new Date(client.nextSession).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${client.progress}%` }}
              ></div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                View Profile
              </button>
              <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 rounded text-sm hover:bg-gray-300">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SessionsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Schedule New Session
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingSessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{session.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{session.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{session.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{session.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
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

  const WorkoutPlansContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Workout Plans</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Create New Plan
        </button>
      </div>
      
      <div className="space-y-4">
        {workoutPlans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold">{plan.planName}</h4>
                <p className="text-gray-600">Client: {plan.client}</p>
                <p className="text-sm text-gray-500">Duration: {plan.duration} | Started: {new Date(plan.startDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{plan.progress}%</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700">Focus Areas: </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {plan.exercises.map((exercise, index) => (
                  <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {exercise}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${plan.progress}%` }}
              ></div>
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                View Details
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm hover:bg-gray-300">
                Edit Plan
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                Update Progress
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProgressContent = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Client Progress Tracking</h3>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Before</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientProgress.map((progress, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{progress.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{progress.metric}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{progress.before}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{progress.current}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{progress.target}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      On Track
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewContent />;
      case 'clients': return <ClientsContent />;
      case 'sessions': return <SessionsContent />;
      case 'plans': return <WorkoutPlansContent />;
      case 'progress': return <ProgressContent />;
      default: return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trainer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName || 'Trainer'}! Manage your clients and training programs.</p>
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

export default TrainerDashboard;