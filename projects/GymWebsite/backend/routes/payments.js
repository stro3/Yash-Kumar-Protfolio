const express = require('express');
const router = express.Router();

// Mock payment data
let payments = [
  {
    id: 1,
    userId: 1,
    membershipPlan: 'Premium',
    amount: 59.99,
    status: 'completed',
    paymentMethod: 'card',
    transactionId: 'txn_123456789',
    createdAt: '2024-01-15T10:30:00Z',
    billingAddress: '123 Main St, New York, NY 10001'
  },
  {
    id: 2,
    userId: 2,
    membershipPlan: 'Basic',
    amount: 29.99,
    status: 'completed',
    paymentMethod: 'paypal',
    transactionId: 'txn_987654321',
    createdAt: '2024-01-20T14:15:00Z',
    billingAddress: '456 Oak Ave, Los Angeles, CA 90210'
  }
];

// Process payment
router.post('/', (req, res) => {
  try {
    const { membershipPlan, amount, paymentMethod, billingAddress, cardDetails } = req.body;

    // Validate required fields
    if (!membershipPlan || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment information'
      });
    }

    // Simulate payment processing
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newPayment = {
      id: payments.length + 1,
      userId: req.user?.userId || 1, // Use authenticated user or default for demo
      membershipPlan,
      amount: parseFloat(amount),
      status: 'completed',
      paymentMethod,
      transactionId,
      createdAt: new Date().toISOString(),
      billingAddress
    };

    payments.push(newPayment);

    res.status(201).json({
      success: true,
      data: {
        payment: newPayment,
        message: 'Payment processed successfully'
      },
      message: 'Payment completed successfully'
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment processing failed'
    });
  }
});

// Get payment history
router.get('/', (req, res) => {
  try {
    // In a real app, you'd filter by authenticated user
    const userPayments = payments.filter(p => p.userId === (req.user?.userId || 1));

    res.json({
      success: true,
      data: userPayments,
      message: 'Payment history retrieved successfully'
    });
  } catch (error) {
    console.error('Payment history fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history'
    });
  }
});

// Get specific payment
router.get('/:id', (req, res) => {
  try {
    const paymentId = parseInt(req.params.id);
    const payment = payments.find(p => p.id === paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check if user owns this payment (in real app)
    if (payment.userId !== (req.user?.userId || 1)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: payment,
      message: 'Payment retrieved successfully'
    });
  } catch (error) {
    console.error('Payment fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment'
    });
  }
});

module.exports = router;