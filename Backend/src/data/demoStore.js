const products = [
    { id: 1, title: 'Organic Bananas', category: 'Fruits', price: 42, unit: '6 pcs', stock: 38 },
    { id: 2, title: 'Alphonso Mangoes', category: 'Fruits', price: 95, unit: '1 kg', stock: 24 },
    { id: 3, title: 'Fresh Apples', category: 'Fruits', price: 120, unit: '1 kg', stock: 32 },
    { id: 9, title: 'Premium Cheese', category: 'Dairy', price: 145, unit: '200 g', stock: 18 },
    { id: 10, title: 'Fresh Milk', category: 'Dairy', price: 64, unit: '1 L', stock: 42 },
]

const users = [
    {
        id: 'user_1001',
        name: 'Dhairya Jain',
        email: 'dhairya@example.com',
        phone: '+919999999999',
        role: 'customer',
    },
]

const carts = new Map()
const wishlists = new Map()
const orders = []

module.exports = {
    carts,
    orders,
    products,
    users,
    wishlists,
}
