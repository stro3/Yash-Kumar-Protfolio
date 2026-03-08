import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const MembershipPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic',
      price: '₹2,499',
      period: '/month',
      description: 'Perfect for beginners starting their fitness journey',
      features: ['Access to gym equipment', 'Locker room access', 'Basic fitness assessment', 'Group fitness classes', 'Mobile app access', 'Free Wi-Fi'],
      popular: false
    },
    {
      name: 'Premium',
      price: '₹4,999',
      period: '/month',
      description: 'Most popular choice for serious fitness enthusiasts',
      features: ['Everything in Basic', 'Personal training sessions (2/month)', 'Nutrition consultation', 'Advanced fitness assessment', 'Priority class booking', 'Guest passes (2/month)', 'Towel service'],
      popular: true
    },
    {
      name: 'VIP',
      price: '₹6,999',
      period: '/month',
      description: 'Ultimate fitness experience with premium amenities',
      features: ['Everything in Premium', 'Unlimited personal training', 'Custom meal planning', 'Body composition analysis', 'Unlimited guest passes', 'Exclusive VIP area access', '24/7 gym access', 'Massage therapy (1/month)'],
      popular: false
    }
  ];

  const handleSelectPlan = (plan) => {
    if (isAuthenticated) {
      navigate('/payment', { state: { selectedPlan: plan } });
    } else {
      navigate('/signup', { state: { redirectTo: '/memberships' } });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Choose Your <span className="text-orange-500">Plan</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-8">
            Select the membership that fits your fitness goals and lifestyle.
          </p>
          <div className="inline-block bg-orange-50 border border-orange-200 rounded-full px-6 py-2">
            <p className="text-orange-600 font-semibold text-sm">7-Day Free Trial for All Plans</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-2xl p-8 border transition-all ${plan.popular ? 'border-orange-500 shadow-xl shadow-orange-500/10 scale-105' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">Most Popular</span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 mb-4">{plan.description}</p>
                <div className="text-5xl font-bold text-slate-900 mb-1">
                  {plan.price}<span className="text-lg text-slate-400">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full block text-center py-3 px-4 rounded-xl font-semibold transition-all cursor-pointer ${plan.popular ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
              >
                {isAuthenticated ? `Select ${plan.name}` : `Start ${plan.name} Plan`}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4"><h3 className="text-lg font-semibold text-slate-900 mb-2">Can I cancel anytime?</h3><p className="text-slate-500">Yes, cancel at any time with 30 days notice.</p></div>
            <div className="p-4"><h3 className="text-lg font-semibold text-slate-900 mb-2">Any hidden fees?</h3><p className="text-slate-500">No hidden fees. One-time enrollment fee may apply.</p></div>
            <div className="p-4"><h3 className="text-lg font-semibold text-slate-900 mb-2">Can I freeze my membership?</h3><p className="text-slate-500">Yes, freeze for up to 3 months per year for medical reasons.</p></div>
            <div className="p-4"><h3 className="text-lg font-semibold text-slate-900 mb-2">Do you offer family plans?</h3><p className="text-slate-500">Yes! Contact us for special family pricing.</p></div>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mt-12 text-center bg-slate-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Not a member yet?</h2>
            <p className="text-slate-400 mb-6">Sign up today to access all membership plans and get your free trial.</p>
            <Link to="/signup" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all">Create Account</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipPage;
