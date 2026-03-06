import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">GymFit Pro</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Welcome to GymFit Pro - your premier destination for fitness and wellness.
            We are committed to helping you achieve your health goals in a supportive,
            state-of-the-art environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 mb-4">
              To empower individuals to transform their lives through fitness, providing
              world-class facilities, expert guidance, and a supportive community that
              inspires lasting lifestyle changes.
            </p>
            <p className="text-gray-400">
              We believe that fitness is not just about physical transformation, but about
              building confidence, strength, and a healthier relationship with your body.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 rounded-2xl text-white shadow-2xl shadow-blue-500/20">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="mb-4 text-white/90">
              To be the leading fitness destination that transforms communities through
              innovative programs, cutting-edge technology, and personalized wellness solutions.
            </p>
            <ul className="space-y-2 text-white/90">
              <li className="flex items-center"><span className="w-2 h-2 bg-white rounded-full mr-3"></span>Excellence in everything we do</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-white rounded-full mr-3"></span>Inclusive and welcoming environment</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-white rounded-full mr-3"></span>Continuous innovation and improvement</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-white rounded-full mr-3"></span>Personalized attention for every member</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Facilities</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
                <img src="/images/weight-training.png" alt="Weight Training" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Weight Training Area</h3>
              <p className="text-gray-400">State-of-the-art equipment for strength training and muscle building.</p>
            </div>
            <div className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
                <img src="/images/hero-main.png" alt="Cardio Zone" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cardio Zone</h3>
              <p className="text-gray-400">Modern cardio equipment with entertainment systems and heart rate monitoring.</p>
            </div>
            <div className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
                <img src="/images/group-class.png" alt="Group Classes" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Group Class Studios</h3>
              <p className="text-gray-400">Spacious studios for yoga, pilates, dance, and group fitness classes.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Certifications & Awards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-yellow-500/30">🏆</div>
              <p className="text-sm font-semibold text-white">Best Gym 2024</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30">⭐</div>
              <p className="text-sm font-semibold text-white">5-Star Rating</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-green-500/30">✅</div>
              <p className="text-sm font-semibold text-white">Certified Trainers</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">🛡️</div>
              <p className="text-sm font-semibold text-white">Safety Certified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;