import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1920&q=80)',
            filter: 'brightness(0.45)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-orange-500/20 border border-orange-500/40 rounded-full px-6 py-2 mb-8">
            <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">Welcome to GymFit Pro</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Build Your
            <span className="block text-orange-500">Strongest Self</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Premium fitness center with world-class equipment, expert trainers,
            and personalized programs designed for your transformation.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/signup" className="bg-orange-500 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30">
                  Start Free Trial
                </Link>
                <Link to="/classes" className="border-2 border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all">
                  Explore Classes
                </Link>
              </>
            ) : (
              <Link to="/member-portal" className="bg-orange-500 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-slate-600 text-lg font-medium">Active Members</div>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-slate-600 text-lg font-medium">Weekly Classes</div>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">20+</div>
              <div className="text-slate-600 text-lg font-medium">Expert Trainers</div>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-slate-600 text-lg font-medium">Gym Access</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our <span className="text-orange-500">Facilities</span>
            </h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto">
              Premium equipment and spaces designed for every type of workout
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=80" alt="Modern Gym" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold">Premium Equipment</h3>
                <p className="text-slate-300 text-sm">Latest machines and free weights</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" alt="Weight Training" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold">Strength Training</h3>
                <p className="text-slate-300 text-sm">Build power and endurance</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80" alt="Group Class" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold">Group Classes</h3>
                <p className="text-slate-300 text-sm">High-energy sessions for all levels</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
            Why Choose <span className="text-orange-500">Us?</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Personal Training</h3>
              <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                Work one-on-one with certified personal trainers who create customized
                workout plans tailored to your goals, whether you want to lose weight,
                build muscle, or improve overall fitness.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-700"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Personalized workout programs</li>
                <li className="flex items-center text-slate-700"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Nutrition guidance and meal planning</li>
                <li className="flex items-center text-slate-700"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Weekly progress tracking</li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=800&q=80" alt="Personal Training" className="w-full h-80 object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" alt="Group Fitness" className="w-full h-80 object-cover" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Group Fitness</h3>
              <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                Join high-energy group fitness classes led by expert instructors.
                From yoga and pilates to HIIT and spinning, there is something for everyone.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-700"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>50+ classes per week</li>
                <li className="flex items-center text-slate-700"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>All skill levels welcome</li>
                <li className="flex items-center text-slate-700"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Certified instructors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80)', filter: 'brightness(0.3)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/70 to-orange-500/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform?</h2>
          <p className="text-xl text-white/90 mb-10">
            Join today and get your first week free. No contracts, no commitments.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/signup" className="bg-white text-slate-900 px-10 py-4 rounded-lg text-lg font-bold hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg">
                  Get Started Free
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </>
            ) : (
              <Link to="/classes" className="bg-white text-slate-900 px-10 py-4 rounded-lg text-lg font-bold hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg">
                Book a Class
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
