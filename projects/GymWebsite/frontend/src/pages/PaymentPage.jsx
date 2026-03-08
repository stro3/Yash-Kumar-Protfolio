import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const planFromState = location.state?.plan;

  const [selectedPlan, setSelectedPlan] = useState(planFromState || null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' });

  const plans = [
    { id: 'basic', name: 'Basic', price: 2499, features: ['Gym equipment access', 'Locker room', 'Fitness assessment', '24/7 access'], popular: false },
    { id: 'premium', name: 'Premium', price: 4999, features: ['Everything in Basic', 'Unlimited group classes', 'Personal trainer consultation', 'Nutrition guidance', 'Guest passes (2/month)'], popular: true },
    { id: 'elite', name: 'Elite', price: 6999, features: ['Everything in Premium', '4 PT sessions', 'Massage therapy', 'Priority booking', 'Unlimited guest passes'], popular: false }
  ];

  const handleInputChange = (e) => setPaymentData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePayment = async (e) => {
    e.preventDefault();
    if (paymentMethod === 'upi' && !upiId) { setNotification({ type: 'error', message: 'Enter your UPI ID' }); return; }
    if (paymentMethod === 'card' && (!paymentData.cardNumber || !paymentData.cvv)) { setNotification({ type: 'error', message: 'Fill all card details' }); return; }

    setIsProcessing(true);
    setNotification(null);
    setTimeout(() => {
      setNotification({ type: 'success', message: `Payment of ₹${selectedPlan.price.toLocaleString('en-IN')} successful! Welcome to ${selectedPlan.name} plan. Your membership is now active.` });
      setIsProcessing(false);
    }, 2500);
  };

  const formatCard = (v) => {
    const num = v.replace(/\D/g, '');
    const parts = num.match(/.{1,4}/g) || [];
    return parts.join(' ');
  };

  const inputCls = "w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500";

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">Choose Your <span className="text-orange-500">Plan</span></h1>
            <p className="text-xl text-slate-500">Select a plan that fits your goals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p) => (
              <div key={p.id} className={`bg-white rounded-2xl p-8 relative border transition-all ${p.popular ? 'border-orange-500 scale-105 shadow-xl shadow-orange-500/10' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>
                {p.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"><span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Popular</span></div>}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{p.name}</h3>
                  <span className="text-5xl font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</span><span className="text-slate-400">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, i) => (<li key={i} className="flex items-center"><span className="text-orange-500 mr-3">✓</span><span className="text-slate-600">{f}</span></li>))}
                </ul>
                <button onClick={() => setSelectedPlan(p)} className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${p.popular ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>Choose {p.name}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div><h1 className="text-2xl font-bold">Complete Payment</h1><p className="text-white/70">Secure checkout</p></div>
              <button onClick={() => setSelectedPlan(null)} className="text-white/70 hover:text-white">← Back</button>
            </div>
          </div>

          {notification && (
            <div className={`m-6 rounded-xl p-4 ${notification.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              <p className="font-medium">{notification.message}</p>
              {notification.type === 'success' && <button onClick={() => navigate('/dashboard')} className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">Go to Dashboard</button>}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div>
              <div className="bg-slate-50 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-slate-900 mb-3">Order Summary</h3>
                <div className="flex justify-between mb-2"><span className="text-slate-500">{selectedPlan.name} Plan</span><span className="font-semibold text-slate-900">₹{selectedPlan.price.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between mb-2"><span className="text-slate-500">GST (18%)</span><span className="font-semibold text-slate-900">₹{Math.round(selectedPlan.price * 0.18).toLocaleString('en-IN')}</span></div>
                <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between"><span className="font-bold text-slate-900">Total</span><span className="font-bold text-2xl text-orange-500">₹{Math.round(selectedPlan.price * 1.18).toLocaleString('en-IN')}</span></div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-sm text-orange-700 font-medium">🔒 Your payment is 100% secure. We use industry-standard encryption.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-4">Payment Method</h3>
              <div className="flex gap-3 mb-6">
                {[{ id: 'upi', label: 'UPI', icon: '📱' }, { id: 'card', label: 'Card', icon: '💳' }, { id: 'netbanking', label: 'Net Banking', icon: '🏦' }].map(m => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`flex-1 p-3 rounded-xl border text-center font-medium text-sm transition-all ${paymentMethod === m.id ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    <span className="block text-lg mb-1">{m.icon}</span>{m.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">UPI ID</label>
                    <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" className={inputCls} />
                    <p className="text-xs text-slate-400 mt-1">Google Pay, PhonePe, Paytm, BHIM UPI</p>
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label><input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: formatCard(e.target.value) }))} placeholder="1234 5678 9012 3456" maxLength={19} className={inputCls} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label><input type="text" name="expiryDate" value={paymentData.expiryDate} onChange={handleInputChange} placeholder="MM/YY" maxLength={5} className={inputCls} /></div>
                      <div><label className="block text-sm font-medium text-slate-700 mb-1">CVV</label><input type="password" name="cvv" value={paymentData.cvv} onChange={handleInputChange} placeholder="***" maxLength={4} className={inputCls} /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Name on Card</label><input type="text" name="nameOnCard" value={paymentData.nameOnCard} onChange={handleInputChange} placeholder="Full name" className={inputCls} /></div>
                  </>
                )}
                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Bank</label>
                    <select className={inputCls}>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Punjab National Bank</option>
                      <option>Bank of Baroda</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}
                <button type="submit" disabled={isProcessing} className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isProcessing ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
                  {isProcessing ? 'Processing...' : `Pay ₹${Math.round(selectedPlan.price * 1.18).toLocaleString('en-IN')}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;