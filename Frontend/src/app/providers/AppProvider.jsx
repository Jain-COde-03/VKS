import { useEffect, useMemo, useState, useCallback } from 'react'
import axios from 'axios'
import API from '../../services/api'
import authTokenStore from '../../services/authTokenStore'
import { AppContext } from './AppContext'

const normalizeProduct = (product = {}) => ({
    id: product.productId ?? product.id,
    productId: product.productId ?? product.id,
    title: product.title || 'Unknown product',
    brand: product.brand || 'VKS Select',
    category: product.category || 'General',
    imageSrc: product.imageSrc || product.image || '/images/categories/fruits/thumbnail.png',
    price: product.price ?? 0,
    originalPrice: product.originalPrice ?? product.price ?? 0,
    unit: product.unit || '1 pack',
    rating: product.rating ?? 0,
    discountLabel: product.discountLabel || '',
    stock: product.stock ?? 0,
    tags: product.tags || [],
})

const normalizeCartItem = (item = {}) => ({
    id: item.productId ?? item.id,
    productId: item.productId ?? item.id,
    title: item.title,
    brand: item.brand,
    category: item.category,
    imageSrc: item.imageSrc,
    price: item.price,
    originalPrice: item.originalPrice ?? item.price,
    unit: item.unit,
    rating: item.rating ?? 0,
    discountLabel: item.discountLabel ?? '',
    stock: item.stock ?? 0,
    tags: item.tags || [],
    quantity: item.quantity ?? 1,
})

const normalizeWishlistItem = (item = {}) => ({
    id: item.productId ?? item.id,
    productId: item.productId ?? item.id,
    title: item.title,
    brand: item.brand,
    category: item.category,
    imageSrc: item.imageSrc,
    price: item.price,
    originalPrice: item.originalPrice ?? item.price,
    unit: item.unit,
    rating: item.rating ?? 0,
    discountLabel: item.discountLabel ?? '',
    stock: item.stock ?? 0,
    tags: item.tags || [],
})

const AppProvider = ({ children }) => {
    const [countryList, setCountryList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [cityList, setCityList] = useState([])
    const [address, setAddress] = useState('')
    const [user, setUser] = useState(null)
    const [authToken, setAuthToken] = useState(null)
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState(() => {
        const storedOrders = localStorage.getItem('orders')
        return storedOrders ? JSON.parse(storedOrders) : []
    })
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems')
        return storedCart ? JSON.parse(storedCart) : []
    })
    const [wishlistItems, setWishlistItems] = useState(() => {
        const storedWishlist = localStorage.getItem('wishlistItems')
        return storedWishlist ? JSON.parse(storedWishlist) : []
    })
    const [error, setError] = useState(null)

    const apiKey = import.meta.env.VITE_POSITIONSTACK_API_KEY

    const fetchCountries = useCallback(async () => {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
            const countries = response.data.data.map((country) => ({
                flag: country.flag,
                name: country.name,
            }))
            setCountryList(countries)
            setError(null)
        } catch (err) {
            console.error('Error fetching countries:', err)
            setError('Failed to fetch countries')
        }
    }, [])

    const fetchCities = useCallback(async (country) => {
        if (!country) {
            setCityList([])
            return []
        }
        try {
            const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country })
            setCityList(response.data.data)
            setError(null)
            return response.data.data
        } catch (err) {
            console.error('Error fetching cities:', err)
            setError('Failed to fetch cities')
            return []
        }
    }, [])

    const fetchAddress = useCallback(async (long, lat) => {
        const storedLocation = localStorage.getItem('userLocation')
        if (storedLocation) {
            try {
                const parsedStorage = JSON.parse(storedLocation)
                if (parsedStorage.address) {
                    setAddress(parsedStorage.address)
                    return parsedStorage.address
                }
            } catch (err) {
                console.error('Error reading stored userLocation', err)
            }
        }

        if (!apiKey) {
            console.warn('VITE_POSITIONSTACK_API_KEY is not configured')
            return ''
        }

        try {
            const response = await axios.get('https://api.positionstack.com/v1/reverse', {
                params: {
                    access_key: apiKey,
                    query: `${lat},${long}`,
                    limit: 1,
                },
            })

            const data = response.data?.data?.[0]
            if (!data) {
                throw new Error('No reverse geocode data returned')
            }

            const label = data.label || `${data.locality || data.region || data.country}`
            setAddress(label)
            setError(null)

            if (data.country) {
                setSelectedCountry(data.country)
            }

            return label
        } catch (err) {
            console.error('Error fetching address:', err)
            setError('Failed to fetch address')
            return ''
        }
    }, [apiKey])

    useEffect(() => {
        API.defaults.headers.common.Authorization = authToken ? `Bearer ${authToken}` : ''
    }, [authToken])

    const loadProducts = useCallback(async () => {
        try {
            const response = await API.get('/products')
            setProducts((response.data.products || []).map(normalizeProduct))
        } catch (err) {
            console.warn('Product API unavailable, using local fallback')
        }
    }, [])

    const loadUserData = useCallback(async () => {
        if (!authToken) return

        try {
            const [cartResponse, wishlistResponse, ordersResponse] = await Promise.all([
                API.get('/cart'),
                API.get('/wishlist'),
                API.get('/orders'),
            ])

            setCartItems((cartResponse.data.items || []).map(normalizeCartItem))
            setWishlistItems((wishlistResponse.data.items || []).map(normalizeWishlistItem))
            setOrders(ordersResponse.data.orders || [])
        } catch (err) {
            console.error('Failed to load user data:', err)
        }
    }, [authToken])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    useEffect(() => {
        loadUserData()
    }, [loadUserData])

    // Subscribe to in-memory token changes so app state stays in sync
    useEffect(() => {
        const unsub = authTokenStore.subscribe((t) => setAuthToken(t))
        const userHandler = (e) => {
            if (e?.detail) setUser(e.detail)
        }
        window.addEventListener('auth:user', userHandler)
        return () => {
            if (unsub) unsub()
            window.removeEventListener('auth:user', userHandler)
        }
    }, [])

    // Attempt silent refresh on mount to restore session from refresh cookie
    useEffect(() => {
        let mounted = true
        const tryRefresh = async () => {
            try {
                const resp = await API.post('/auth/refresh')
                const newToken = resp.data?.token
                const newUser = resp.data?.user
                if (newToken) {
                    authTokenStore.setToken(newToken)
                }
                if (mounted && newUser) setUser(newUser)
            } catch (err) {
                // ignore — not authenticated
            }
        }

        tryRefresh()
        return () => { mounted = false }
    }, [])

    // Fetch countries on mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCountries()
    }, [fetchCountries])

    // Fetch cities when country changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCities(selectedCountry)
    }, [selectedCountry, fetchCities])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
    }, [wishlistItems])

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders))
    }, [orders])

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const wishlistCount = wishlistItems.length

    const cartSubtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }, [cartItems])

    const login = useCallback(async (email) => {
        try {
            const response = await API.post('/auth/login', { email })
            const { user: loggedInUser, token } = response.data
            setUser(loggedInUser)
            setAuthToken(token)
            authTokenStore.setToken(token)
            return loggedInUser
        } catch (err) {
            const message = err.response?.data?.message || 'Unable to login'
            setError(message)
            throw new Error(message)
        }
    }, [])

    const register = useCallback(async (profile) => {
        try {
            const response = await API.post('/auth/register', profile)
            const { user: registeredUser, token } = response.data
            setUser(registeredUser)
            setAuthToken(token)
            authTokenStore.setToken(token)
            return registeredUser
        } catch (err) {
            const message = err.response?.data?.message || 'Unable to register'
            setError(message)
            throw new Error(message)
        }
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        setAuthToken(null)
        authTokenStore.clearToken()
        API.post('/auth/logout').catch(() => {})
    }, [])

    const createOrder = useCallback(async ({ paymentMethod, shippingAddress }) => {
        const payload = {
            paymentMethod: paymentMethod || 'cod',
            shippingAddress,
        }

        try {
            const response = user && authToken
                ? await API.post('/orders', payload)
                : await API.post('/orders/guest', {
                    ...payload,
                    items: cartItems.map(normalizeCartItem),
                })

            const order = response.data.order
            setOrders((prevOrders) => [order, ...prevOrders])
            setCartItems([])
            return order.orderNumber
        } catch (err) {
            const message = err.response?.data?.message || 'Unable to create order'
            setError(message)
            throw new Error(message)
        }
    }, [authToken, cartItems, user])

    const addToCart = useCallback(async (product, quantity = 1) => {
        const item = normalizeCartItem({ ...product, quantity })

        setCartItems((items) => {
            const existingItem = items.find((current) => current.productId === item.productId)
            if (existingItem) {
                return items.map((current) => current.productId === item.productId ? { ...current, quantity: current.quantity + quantity } : current)
            }

            return [...items, item]
        })

        if (!authToken) return

        try {
            await API.post('/cart/add', { productId: item.productId, quantity })
        } catch (err) {
            console.error('Cart add failed:', err)
        }
    }, [authToken])

    const updateCartItem = useCallback(async (productId, quantity) => {
        setCartItems((items) => {
            if (quantity <= 0) return items.filter((item) => item.productId !== productId)
            return items.map((item) => item.productId === productId ? { ...item, quantity } : item)
        })

        if (!authToken) return

        try {
            await API.put(`/cart/${productId}`, { quantity })
        } catch (err) {
            console.error('Cart update failed:', err)
        }
    }, [authToken])

    const removeFromCart = useCallback(async (productId) => {
        setCartItems((items) => items.filter((item) => item.productId !== productId))

        if (!authToken) return

        try {
            await API.delete(`/cart/${productId}`)
        } catch (err) {
            console.error('Cart delete failed:', err)
        }
    }, [authToken])

    const clearCart = useCallback(async () => {
        setCartItems([])

        if (!authToken) return

        try {
            await API.delete('/cart/clear/all')
        } catch (err) {
            console.error('Cart clear failed:', err)
        }
    }, [authToken])

    const toggleWishlist = useCallback(async (product) => {
        const item = normalizeWishlistItem(product)

        setWishlistItems((items) => {
            const exists = items.some((current) => current.productId === item.productId)
            return exists ? items.filter((current) => current.productId !== item.productId) : [...items, item]
        })

        if (!authToken) return

        try {
            const exists = wishlistItems.some((current) => current.productId === item.productId)
            if (exists) {
                await API.delete(`/wishlist/${item.productId}`)
            } else {
                await API.post('/wishlist/add', { productId: item.productId })
            }
        } catch (err) {
            console.error('Wishlist update failed:', err)
        }
    }, [authToken, wishlistItems])

    const value = useMemo(() => ({
        address,
        cityList,
        countryList,
        selectedCountry,
        cartCount,
        cartItems,
        cartSubtotal,
        wishlistCount,
        wishlistItems,
        user,
        error,
        addToCart,
        clearCart,
        fetchAddress,
        fetchCities,
        fetchCountries,
        login,
        logout,
        register,
        removeFromCart,
        setAddress,
        setCityList,
        setCountryList,
        setSelectedCountry,
        setError,
        toggleWishlist,
        updateCartItem,
    }), [
        addToCart,
        address,
        cartCount,
        cartItems,
        cartSubtotal,
        cityList,
        clearCart,
        countryList,
        error,
        fetchAddress,
        fetchCities,
        fetchCountries,
        login,
        logout,
        register,
        removeFromCart,
        selectedCountry,
        toggleWishlist,
        updateCartItem,
        user,
        wishlistCount,
        wishlistItems,
    ])

    return (
        <AppContext.Provider
            value={value}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }
