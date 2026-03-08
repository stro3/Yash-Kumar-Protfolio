import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            About <span className="text-orange-500">GymFit Pro</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Your premier destination for fitness and wellness. We are committed to helping you achieve your health goals in a supportive, state-of-the-art environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-500 mb-4">
              To empower individuals to transform their lives through fitness, providing world-class facilities, expert guidance, and a supportive community that inspires lasting lifestyle changes.
            </p>
            <p className="text-slate-500">
              We believe that fitness is not just about physical transformation, but about building confidence, strength, and a healthier relationship with your body.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl text-white">
            <h2 className="text-3xl font-bold mb-4">Our <span className="text-orange-500">Vision</span></h2>
            <p className="mb-4 text-white/90">
              To be the leading fitness destination that transforms communities through innovative programs, cutting-edge technology, and personalized wellness solutions.
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Excellence in everything we do</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Inclusive and welcoming environment</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Continuous innovation and improvement</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Personalized attention for every member</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Our <span className="text-orange-500">Facilities</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80" alt="Weight Training" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Weight Training Area</h3>
                <p className="text-slate-500">State-of-the-art equipment for strength training and muscle building.</p>
              </div>
            </div>
            <div className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80" alt="Cardio Zone" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Cardio Zone</h3>
                <p className="text-slate-500">Modern cardio equipment with entertainment systems and heart rate monitoring.</p>
              </div>
            </div>
            <div className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80" alt="Group Classes" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Group Class Studios</h3>
                <p className="text-slate-500">Spacious studios for yoga, pilates, dance, and group fitness classes.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Certifications & Awards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-orange-500 rounded-full flex items-center justify-center text-2xl text-white shadow-lg shadow-orange-500/30">🏆</div>
              <p className="text-sm font-semibold text-slate-900">Best Gym 2024</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-amber-500 rounded-full flex items-center justify-center text-2xl text-white shadow-lg shadow-amber-500/30">⭐</div>
              <p className="text-sm font-semibold text-slate-900">5-Star Rating</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-600 rounded-full flex items-center justify-center text-2xl text-white shadow-lg shadow-green-600/30">✅</div>
              <p className="text-sm font-semibold text-slate-900">Certified Trainers</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-orange-600 rounded-full flex items-center justify-center text-2xl text-white shadow-lg shadow-orange-600/30">🛡️</div>
              <p className="text-sm font-semibold text-slate-900">Safety Certified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;