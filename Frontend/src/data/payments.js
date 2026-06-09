const payments = [
    {
        id: 'payment_1001',
        order: 'order_1001',
        user: 'user_1001',
        provider: 'razorpay',
        providerPaymentId: 'pay_mock_1001',
        amount: 259,
        currency: 'INR',
        status: 'success',
        createdAt: '2026-06-01T12:22:00.000Z',
    },
    {
        id: 'payment_1002',
        order: 'order_1002',
        user: 'user_1002',
        provider: 'cash_on_delivery',
        providerPaymentId: null,
        amount: 328,
        currency: 'INR',
        status: 'pending',
        createdAt: '2026-06-09T07:30:00.000Z',
    },
]

export default payments
