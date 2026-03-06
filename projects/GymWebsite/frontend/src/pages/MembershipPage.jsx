import React from 'react';
import { Link } from 'react-router-dom';

const MembershipPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      description: 'Perfect for beginners starting their fitness journey',
      features: ['Access to gym equipment', 'Locker room access', 'Basic fitness assessment', 'Group fitness classes', 'Mobile app access', 'Free Wi-Fi'],
      popular: false
    },
    {
      name: 'Premium',
      price: '$59',
      period: '/month',
      description: 'Most popular choice for serious fitness enthusiasts',
      features: ['Everything in Basic', 'Personal training sessions (2/month)', 'Nutrition consultation', 'Advanced fitness assessment', 'Priority class booking', 'Guest passes (2/month)', 'Towel service'],
      popular: true
    },
    {
      name: 'VIP',
      price: '$99',
      period: '/month',
      description: 'Ultimate fitness experience with premium amenities',
      features: ['Everything in Premium', 'Unlimited personal training', 'Custom meal planning', 'Body composition analysis', 'Unlimited guest passes', 'Exclusive VIP area access', '24/7 gym access', 'Massage therapy (1/month)'],
      popular: false
    }
  ];

  const additionalPlans = [
    { name: 'Student', price: '$19', period: '/month', description: 'Special discount for students', note: 'Valid student ID required' },
    { name: 'Corporate', price: 'Custom', period: 'pricing', description: 'Group plans for businesses', note: 'Minimum 10 employees' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Membership</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Select the perfect membership plan that fits your fitness goals and lifestyle.
          </p>
          <div className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl px-6 py-3">
            <p className="text-green-400 font-semibold">7-Day Free Trial for All Plans</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all transform hover:scale-105 ${plan.popular ? 'border-blue-500 scale-105 shadow-2xl shadow-blue-500/20' : 'border-gray-700/50 hover:border-gray-600'
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">
                  {plan.price}
                  <span className="text-lg text-gray-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`w-full block text-center py-3 px-4 rounded-xl font-semibold transition-all ${plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
              >
                Start {plan.name} Plan
              </Link>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Special <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Plans</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalPlans.map((plan, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  {plan.price} <span className="text-lg text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.note}</p>
                <Link to="/contact" className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all">
                  Contact Us
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-400">Yes, you can cancel your membership at any time with 30 days notice.</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Are there any hidden fees?</h3>
              <p className="text-gray-400">No hidden fees! What you see is what you pay. One-time enrollment fee may apply.</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Can I freeze my membership?</h3>
              <p className="text-gray-400">Yes, you can freeze your membership for up to 3 months per year for medical reasons.</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Do you offer family plans?</h3>
              <p className="text-gray-400">Yes! Contact us for special family pricing and group discounts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
