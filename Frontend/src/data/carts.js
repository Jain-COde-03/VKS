const carts = [
    {
        id: 'cart_1001',
        user: 'user_1001',
        items: [
            {
                product: 1,
                quantity: 2,
                priceAtAdd: 42,
            },
            {
                product: 9,
                quantity: 1,
                priceAtAdd: 145,
            },
            {
                product: 19,
                quantity: 1,
                priceAtAdd: 95,
            },
        ],
        coupon: 'coupon_fresh20',
        updatedAt: '2026-06-09T08:15:00.000Z',
    },
    {
        id: 'cart_1002',
        user: 'user_1002',
        items: [
            {
                product: 3,
                quantity: 1,
                priceAtAdd: 120,
            },
            {
                product: 13,
                quantity: 2,
                priceAtAdd: 45,
            },
        ],
        coupon: null,
        updatedAt: '2026-06-08T18:45:00.000Z',
    },
]

export default carts
