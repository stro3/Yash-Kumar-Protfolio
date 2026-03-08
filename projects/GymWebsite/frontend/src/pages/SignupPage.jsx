import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';

const SignupPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { register, googleAuth, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); if (formErrors[e.target.name]) setFormErrors({ ...formErrors, [e.target.name]: '' }); if (error) clearError(); };

  const validateForm = () => {
    const errors = {};
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const { confirmPassword: _, ...userData } = formData;
    const result = await register(userData);
    if (result.success) navigate('/');
    setIsLoading(false);
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (response) => {
      setGoogleLoading(true);
      try {
        // Exchange the authorization code for user info
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` }
        });
        const userInfo = await userInfoRes.json();
        
        // Get ID token via tokeninfo endpoint
        const tokenRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${response.access_token}`);
        const tokenInfo = await tokenRes.json();
        
        // Send to our backend
        const result = await googleAuth(response.access_token, userInfo);
        if (result.success) navigate('/');
      } catch (err) {
        console.error('Google signup error:', err);
      }
      setGoogleLoading(false);
    },
    onError: (error) => {
      console.error('Google signup failed:', error);
      setGoogleLoading(false);
    }
  });

  const inputCls = "mt-2 block w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80" alt="Gym" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center">
            <div className="text-white text-3xl font-bold tracking-wide mb-4"><span className="text-orange-300">GYM</span>FIT PRO</div>
            <p className="text-white/80 text-xl">Start your transformation today.</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="lg:hidden text-2xl font-bold tracking-wide mb-6"><span className="text-orange-500">GYM</span>FIT PRO</div>
            <h2 className="text-3xl font-bold text-slate-900">Join GymFit Pro</h2>
            <p className="mt-2 text-slate-500">Already a member? <Link to="/login" className="font-medium text-orange-500 hover:text-orange-600">Sign in</Link></p>
          </div>

          <button onClick={() => handleGoogleSignup()} disabled={googleLoading} className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50">
            {googleLoading ? (
              <><svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Connecting...</>
            ) : (
              <><svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Sign up with Google</>
            )}
          </button>

          <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div><div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-400">or sign up with email</span></div></div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4"><p className="text-sm text-red-600">{error}</p></div>}
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700">First Name</label><input name="firstName" type="text" required className={inputCls} value={formData.firstName} onChange={handleChange} /></div>
              <div><label className="block text-sm font-medium text-slate-700">Last Name</label><input name="lastName" type="text" required className={inputCls} value={formData.lastName} onChange={handleChange} /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700">Email</label><input name="email" type="email" required className={inputCls} value={formData.email} onChange={handleChange} /></div>
            <div><label className="block text-sm font-medium text-slate-700">Phone</label><input name="phone" type="tel" required className={inputCls} value={formData.phone} onChange={handleChange} placeholder="+91" /></div>
            <div><label className="block text-sm font-medium text-slate-700">Password</label><input name="password" type="password" required className={inputCls} value={formData.password} onChange={handleChange} />{formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}</div>
            <div><label className="block text-sm font-medium text-slate-700">Confirm Password</label><input name="confirmPassword" type="password" required className={inputCls} value={formData.confirmPassword} onChange={handleChange} />{formErrors.confirmPassword && <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>}</div>
            <button type="submit" disabled={isLoading} className="w-full py-3 px-4 rounded-xl text-white font-semibold bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition-all shadow-lg shadow-orange-500/20">
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;