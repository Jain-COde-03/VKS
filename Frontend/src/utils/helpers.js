// Format price with currency
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)
}

// Calculate discount percentage
export const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100
    return Math.round(discount)
}

// Format date
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date))
}

// Validate email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Validate phone
export const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
}

// Truncate text
export const truncateText = (text, length = 50) => {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
}

// Debounce function
export const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}

// Throttle function
export const throttle = (func, limit) => {
    let inThrottle
    return (...args) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

// Get initials from name
export const getInitials = (name) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
}

// Check if string is empty
export const isEmpty = (str) => {
    return !str || str.trim().length === 0
}

// Local storage helpers
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(`Error storing ${key}:`, error)
        }
    },
    get: (key) => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch (error) {
            console.error(`Error retrieving ${key}:`, error)
            return null
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.error(`Error removing ${key}:`, error)
        }
    },
    clear: () => {
        try {
            localStorage.clear()
        } catch (error) {
            console.error('Error clearing storage:', error)
        }
    },
}
