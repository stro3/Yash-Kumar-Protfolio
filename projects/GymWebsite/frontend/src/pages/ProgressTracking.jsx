import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext'; // Commented out as not currently used

const ProgressTracking = () => {
  // const { user } = useAuth(); // Commented out as not currently used
  const [activeTab, setActiveTab] = useState('bmi');
  const [bmiData, setBmiData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'male'
  });
  const [bmiResult, setBmiResult] = useState(null);
  const [notification, setNotification] = useState(null);

  // Mock workout data
  const workoutHistory = [
    {
      id: 1,
      date: '2023-12-15',
      type: 'Strength Training',
      duration: 60,
      calories: 350,
      exercises: ['Bench Press', 'Squats', 'Deadlifts'],
      notes: 'Great session, increased weight on bench press'
    },
    {
      id: 2,
      date: '2023-12-13',
      type: 'Cardio',
      duration: 45,
      calories: 420,
      exercises: ['Treadmill', 'Cycling'],
      notes: 'Improved running endurance'
    },
    {
      id: 3,
      date: '2023-12-11',
      type: 'Yoga',
      duration: 75,
      calories: 200,
      exercises: ['Vinyasa Flow', 'Meditation'],
      notes: 'Focused on flexibility and mindfulness'
    }
  ];

  const bodyMeasurements = [
    { date: '2023-12-01', weight: 180, bodyFat: 15, muscle: 42 },
    { date: '2023-11-01', weight: 182, bodyFat: 16, muscle: 41 },
    { date: '2023-10-01', weight: 185, bodyFat: 17, muscle: 40 },
    { date: '2023-09-01', weight: 188, bodyFat: 18, muscle: 39 }
  ];

  const fitnessGoals = [
    { id: 1, goal: 'Lose 10 lbs', target: 170, current: 180, progress: 0, deadline: '2024-03-01' },
    { id: 2, goal: 'Run 5K under 25 mins', target: 25, current: 28, progress: 43, deadline: '2024-02-01' },
    { id: 3, goal: 'Bench Press 200 lbs', target: 200, current: 185, progress: 75, deadline: '2024-04-01' }
  ];

  const calculateBMI = () => {
    if (!bmiData.height || !bmiData.weight) {
      setNotification({ type: 'error', message: 'Please enter both height and weight' });
      return;
    }

    const heightInMeters = parseFloat(bmiData.height) / 100;
    const weightInKg = parseFloat(bmiData.weight);
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category = '';
    let recommendation = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      recommendation = 'Consider a balanced diet with adequate calories and strength training.';
      color = 'text-blue-600';
    } else if (bmi < 25) {
      category = 'Normal weight';
      recommendation = 'Great job! Maintain your current lifestyle with regular exercise and balanced nutrition.';
      color = 'text-green-600';
    } else if (bmi < 30) {
      category = 'Overweight';
      recommendation = 'Consider increasing physical activity and focusing on a balanced, calorie-controlled diet.';
      color = 'text-yellow-600';
    } else {
      category = 'Obese';
      recommendation = 'Consult with a healthcare provider for a comprehensive weight management plan.';
      color = 'text-red-600';
    }

    setBmiResult({
      bmi: bmi.toFixed(1),
      category,
      recommendation,
      color
    });
  };

  const tabs = [
    { id: 'bmi', name: 'BMI Calculator', icon: '⚖️' },
    { id: 'workouts', name: 'Workout History', icon: '💪' },
    { id: 'measurements', name: 'Body Measurements', icon: '📏' },
    { id: 'goals', name: 'Fitness Goals', icon: '🎯' }
  ];

  const BMICalculator = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">BMI Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                value={bmiData.height}
                onChange={(e) => setBmiData(prev => ({ ...prev, height: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 175"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={bmiData.weight}
                onChange={(e) => setBmiData(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={bmiData.age}
                onChange={(e) => setBmiData(prev => ({ ...prev, age: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={bmiData.gender}
                onChange={(e) => setBmiData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button
              onClick={calculateBMI}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Calculate BMI
            </button>
          </div>
          
          {bmiResult && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Your BMI Result</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-3xl font-bold text-blue-600">{bmiResult.bmi}</span>
                  <span className="text-gray-600 ml-2">BMI</span>
                </div>
                <div>
                  <span className={`text-lg font-semibold ${bmiResult.color}`}>
                    {bmiResult.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{bmiResult.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BMI Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-4">BMI Categories</h4>
        <div className="space-y-2">
          <div className="flex justify-between p-2 bg-blue-50 rounded">
            <span>Underweight</span>
            <span className="text-blue-600 font-medium">Less than 18.5</span>
          </div>
          <div className="flex justify-between p-2 bg-green-50 rounded">
            <span>Normal weight</span>
            <span className="text-green-600 font-medium">18.5 - 24.9</span>
          </div>
          <div className="flex justify-between p-2 bg-yellow-50 rounded">
            <span>Overweight</span>
            <span className="text-yellow-600 font-medium">25 - 29.9</span>
          </div>
          <div className="flex justify-between p-2 bg-red-50 rounded">
            <span>Obese</span>
            <span className="text-red-600 font-medium">30 or greater</span>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkoutHistory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Workout History</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Log New Workout
        </button>
      </div>
      
      <div className="space-y-4">
        {workoutHistory.map((workout) => (
          <div key={workout.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold">{workout.type}</h4>
                <p className="text-gray-600">{new Date(workout.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Duration: {workout.duration} mins</div>
                <div className="text-sm text-gray-600">Calories: {workout.calories}</div>
              </div>
            </div>
            
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Exercises: </span>
              <span className="text-sm text-gray-600">{workout.exercises.join(', ')}</span>
            </div>
            
            {workout.notes && (
              <div className="bg-gray-50 p-3 rounded">
                <span className="text-sm font-medium text-gray-700">Notes: </span>
                <span className="text-sm text-gray-600">{workout.notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const BodyMeasurements = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Body Measurements</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add Measurement
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (lbs)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body Fat (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Muscle Mass (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bodyMeasurements.map((measurement, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(measurement.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{measurement.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{measurement.bodyFat}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{measurement.muscle}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {index > 0 && (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        measurement.weight < bodyMeasurements[index - 1].weight
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {measurement.weight < bodyMeasurements[index - 1].weight ? '↓' : '↑'} 
                        {Math.abs(measurement.weight - bodyMeasurements[index - 1].weight)} lbs
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const FitnessGoals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Fitness Goals</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add New Goal
        </button>
      </div>
      
      <div className="space-y-4">
        {fitnessGoals.map((goal) => (
          <div key={goal.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold">{goal.goal}</h4>
                <p className="text-gray-600">Target: {goal.target} | Current: {goal.current}</p>
                <p className="text-sm text-gray-500">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{goal.progress}%</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'bmi':
        return <BMICalculator />;
      case 'workouts':
        return <WorkoutHistory />;
      case 'measurements':
        return <BodyMeasurements />;
      case 'goals':
        return <FitnessGoals />;
      default:
        return <BMICalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="text-gray-600">Monitor your fitness journey and achieve your goals</p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-8 border rounded-lg p-4 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <p>{notification.message}</p>
            <button 
              onClick={() => setNotification(null)}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

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

export default ProgressTracking;