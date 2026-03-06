import React, { useState } from 'react';

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '', billingAddress: '', city: '', zipCode: '', country: 'United States' });

  const membershipPlans = [
    { id: 'basic', name: 'Basic Membership', price: 29.99, duration: 'month', features: ['Access to gym equipment', 'Locker room facilities', 'Basic fitness assessment', '24/7 gym access'], popular: false },
    { id: 'premium', name: 'Premium Membership', price: 49.99, duration: 'month', features: ['Everything in Basic', 'Unlimited group classes', 'Personal trainer consultation', 'Nutrition guidance', 'Guest passes (2/month)'], popular: true },
    { id: 'elite', name: 'Elite Membership', price: 79.99, duration: 'month', features: ['Everything in Premium', '4 personal training sessions', 'Massage therapy session', 'Priority class booking', 'Unlimited guest passes'], popular: false }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setNotification({ type: 'success', message: `Payment successful! Welcome to ${selectedPlan.name}!` });
      setIsProcessing(false);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const inputClass = "w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Membership</span>
            </h1>
            <p className="text-xl text-gray-400">Select a plan that fits your fitness goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan) => (
              <div key={plan.id} className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 relative border transition-all ${plan.popular ? 'border-blue-500 scale-105 shadow-2xl shadow-blue-500/20' : 'border-gray-700/50 hover:border-gray-600'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">Most Popular</span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">${plan.price}</span>
                    <span className="text-gray-400">/{plan.duration}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-400 mr-3">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSelectedPlan(plan)} className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
                <p className="text-blue-100">You are one step away from joining GymFit Pro!</p>
              </div>
              <button onClick={() => setSelectedPlan(null)} className="text-blue-100 hover:text-white">← Back to Plans</button>
            </div>
          </div>

          {notification && (
            <div className={`m-6 rounded-xl p-4 ${notification.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
              <p>{notification.message}</p>
              <button onClick={() => setNotification(null)} className="mt-2 text-sm underline">Dismiss</button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div className="lg:order-2">
              <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/50">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div><h3 className="font-semibold text-white">{selectedPlan.name}</h3><p className="text-sm text-gray-400">Monthly subscription</p></div>
                    <div className="text-right"><div className="font-bold text-white">${selectedPlan.price}</div><div className="text-sm text-gray-400">/month</div></div>
                  </div>
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>${selectedPlan.price}</span></div>
                    <div className="flex justify-between text-gray-300"><span>Tax (8.5%)</span><span>${(selectedPlan.price * 0.085).toFixed(2)}</span></div>
                    <div className="flex justify-between text-lg font-bold text-white border-t border-gray-600 mt-2 pt-2"><span>Total</span><span>${(selectedPlan.price * 1.085).toFixed(2)}</span></div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <h4 className="font-semibold text-green-400 mb-2">What is Included:</h4>
                  <ul className="space-y-1">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="text-sm text-green-400/80 flex items-center"><span className="mr-2">✓</span>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:order-1">
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Payment Information</h2>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Payment Method</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button type="button" onClick={() => setPaymentMethod('card')} className={`p-3 border rounded-xl text-center transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-600 text-gray-300 hover:border-gray-500'}`}>💳 Card</button>
                      <button type="button" onClick={() => setPaymentMethod('paypal')} className={`p-3 border rounded-xl text-center transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-600 text-gray-300 hover:border-gray-500'}`}>💰 PayPal</button>
                      <button type="button" onClick={() => setPaymentMethod('bank')} className={`p-3 border rounded-xl text-center transition-all ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-600 text-gray-300 hover:border-gray-500'}`}>🏦 Bank</button>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                          <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))} placeholder="1234 5678 9012 3456" className={inputClass} required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                          <input type="text" name="expiryDate" value={paymentData.expiryDate} onChange={handleInputChange} placeholder="MM/YY" className={inputClass} required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">CVV</label>
                          <input type="text" name="cvv" value={paymentData.cvv} onChange={handleInputChange} placeholder="123" className={inputClass} required />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-1">Name on Card</label>
                          <input type="text" name="nameOnCard" value={paymentData.nameOnCard} onChange={handleInputChange} placeholder="John Doe" className={inputClass} required />
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Billing Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                            <input type="text" name="billingAddress" value={paymentData.billingAddress} onChange={handleInputChange} placeholder="123 Main Street" className={inputClass} required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                            <input type="text" name="city" value={paymentData.city} onChange={handleInputChange} placeholder="New York" className={inputClass} required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">ZIP Code</label>
                            <input type="text" name="zipCode" value={paymentData.zipCode} onChange={handleInputChange} placeholder="10001" className={inputClass} required />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">💰</div>
                      <p className="text-gray-400 mb-4">You will be redirected to PayPal to complete your payment securely.</p>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"><p className="text-yellow-400 text-sm">Click "Complete Payment" to proceed to PayPal.</p></div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🏦</div>
                      <p className="text-gray-400 mb-4">Pay directly from your bank account with ACH transfer.</p>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"><p className="text-blue-400 text-sm">Bank transfers typically take 1-3 business days.</p></div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-center mb-4">
                    <input type="checkbox" id="terms" required className="mr-2 rounded bg-gray-700 border-gray-600" />
                    <label htmlFor="terms" className="text-sm text-gray-400">I agree to the <span className="text-blue-400 underline">Terms of Service</span> and <span className="text-blue-400 underline">Privacy Policy</span></label>
                  </div>
                  <button type="submit" disabled={isProcessing} className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${isProcessing ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25'} text-white`}>
                    {isProcessing ? 'Processing...' : `Complete Payment - $${(selectedPlan.price * 1.085).toFixed(2)}`}
                  </button>
                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <span>🔒 Secure Payment</span><span>•</span><span>SSL Encrypted</span><span>•</span><span>Money Back Guarantee</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;