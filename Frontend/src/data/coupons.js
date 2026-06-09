const coupons = [
    {
        id: 'coupon_fresh20',
        code: 'FRESH20',
        type: 'percentage',
        value: 20,
        minOrderAmount: 299,
        maxDiscount: 100,
        expiresAt: '2026-12-31T23:59:59.000Z',
        isActive: true,
    },
    {
        id: 'coupon_save50',
        code: 'SAVE50',
        type: 'fixed',
        value: 50,
        minOrderAmount: 499,
        maxDiscount: 50,
        expiresAt: '2026-10-31T23:59:59.000Z',
        isActive: true,
    },
    {
        id: 'coupon_first100',
        code: 'FIRST100',
        type: 'fixed',
        value: 100,
        minOrderAmount: 699,
        maxDiscount: 100,
        expiresAt: '2026-09-30T23:59:59.000Z',
        isActive: true,
    },
]

export default coupons
