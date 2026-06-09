// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        PROFILE: '/auth/profile',
    },
    PRODUCTS: {
        LIST: '/products',
        DETAIL: (id) => `/products/${id}`,
        SEARCH: '/products/search',
        BY_CATEGORY: (category) => `/products/category/${category}`,
    },
    CART: {
        GET: '/cart',
        ADD: '/cart/add',
        UPDATE: (itemId) => `/cart/${itemId}`,
        REMOVE: (itemId) => `/cart/${itemId}`,
        CLEAR: '/cart/clear',
    },
    WISHLIST: {
        GET: '/wishlist',
        ADD: '/wishlist/add',
        REMOVE: (productId) => `/wishlist/${productId}`,
    },
    ORDERS: {
        LIST: '/orders',
        CREATE: '/orders/create',
        DETAIL: (id) => `/orders/${id}`,
        STATUS: (id) => `/orders/${id}/status`,
    },
    USERS: {
        PROFILE: '/users/profile',
        UPDATE: '/users/profile',
        ADDRESSES: '/users/addresses',
    },
    PAYMENTS: {
        CREATE: '/payments/create',
        VERIFY: '/payments/verify',
    },
}

// App Routes
export const ROUTES = {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    CART: '/cart',
    CHECKOUT: '/checkout',
    WISHLIST: '/wishlist',
    PROFILE: '/profile',
    ORDERS: '/orders',
    ORDER_DETAIL: '/orders/:id',
    AUTH_LOGIN: '/auth/login',
    AUTH_REGISTER: '/auth/register',
    HELP: '/help',
    TRACK: '/track',
}

// Product Categories
export const CATEGORIES = [
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'bakery', name: 'Bakery', icon: '🍞' },
    { id: 'breakfast', name: 'Breakfast', icon: '🥣' },
    { id: 'drinks', name: 'Drinks', icon: '🧃' },
    { id: 'snacks', name: 'Snacks', icon: '🍪' },
    { id: 'household', name: 'Household', icon: '🧹' },
]

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please login to continue.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'Resource not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Logged in successfully!',
    LOGOUT_SUCCESS: 'Logged out successfully!',
    ADD_CART_SUCCESS: 'Item added to cart!',
    ADD_WISHLIST_SUCCESS: 'Item added to wishlist!',
    ORDER_CREATED: 'Order created successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
}

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 12,
    PAGE_SIZES: [12, 24, 48],
}

// Price Range Filter
export const PRICE_RANGE = {
    MIN: 0,
    MAX: 1000,
    STEP: 50,
}

// Sort Options
export const SORT_OPTIONS = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
]
