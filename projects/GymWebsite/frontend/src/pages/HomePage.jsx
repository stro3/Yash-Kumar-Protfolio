import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-main.png)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Transform Your Body
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Transform Your Life
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join our state-of-the-art fitness center and achieve your fitness goals
            with expert trainers, modern equipment, and personalized programs.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                  Start Your Journey
                </Link>
                <Link
                  to="/classes"
                  className="border-2 border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
                >
                  View Classes
                </Link>
              </>
            ) : (
              <Link
                to="/member-portal"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                Go to Dashboard
              </Link>
            )}
          </div>

          <div className="mt-16 flex justify-center">
            <div className="animate-bounce">
              <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">500+</div>
              <div className="text-gray-400 text-lg">Happy Members</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">50+</div>
              <div className="text-gray-400 text-lg">Group Classes</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">20+</div>
              <div className="text-gray-400 text-lg">Expert Trainers</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">100+</div>
              <div className="text-gray-400 text-lg">Modern Equipment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">World-Class</span> Facilities
          </h2>
          <p className="text-gray-400 text-center text-xl mb-16 max-w-2xl mx-auto">
            Experience fitness like never before with our premium equipment and expert guidance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src="/images/hero-main.png"
                alt="Modern Gym Equipment"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl font-bold">State-of-the-Art Equipment</h3>
                <p className="text-gray-300 text-sm">Premium machines and free weights</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src="/images/weight-training.png"
                alt="Weight Training"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl font-bold">Intense Weight Training</h3>
                <p className="text-gray-300 text-sm">Build strength and muscle mass</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src="/images/group-class.png"
                alt="Group Fitness Class"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl font-bold">Dynamic Group Classes</h3>
                <p className="text-gray-300 text-sm">Energy-packed sessions for all levels</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">PowerGym</span>?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-white mb-4">Personal Training</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Work one-on-one with our certified personal trainers who will create a customized
                workout plan tailored to your goals. Whether you want to lose weight, build muscle,
                or improve your overall fitness, we have got you covered.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Personalized workout programs
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Nutrition guidance and meal planning
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Progress tracking and adjustments
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20">
                <img
                  src="/images/personal-trainer.png"
                  alt="Personal Training"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20">
                <img
                  src="/images/group-class.png"
                  alt="Group Fitness"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-cyan-600/20 to-transparent" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Group Fitness Classes</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Join our high-energy group fitness classes led by expert instructors.
                From yoga and pilates to HIIT and spinning, there is something for everyone.
                Experience the motivation of working out with others.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  50+ classes per week
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  All skill levels welcome
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Certified instructors
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/weight-training.png)',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-600/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Join PowerGym today and take the first step towards a healthier, stronger you.
            First week free for all new members!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link
                  to="/signup"
                  className="bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
                >
                  Contact Us
                </Link>
              </>
            ) : (
              <Link
                to="/classes"
                className="bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Book Your Next Class
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
