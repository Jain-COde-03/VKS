import { useEffect, useMemo, useState, useCallback } from 'react'
import axios from 'axios'
import { carts, products, users, wishlists } from '../../data'
import { AppContext } from './AppContext'

const AppProvider = ({ children }) => {
    const defaultUser = users[0]
    const defaultCart = carts.find((cart) => cart.user === defaultUser.id)
    const defaultWishlist = wishlists.find((wishlist) => wishlist.user === defaultUser.id)
    const [countryList, setCountryList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [cityList, setCityList] = useState([])
    const [address, setAddress] = useState('')
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems')
        if (storedCart) return JSON.parse(storedCart)

        return (defaultCart?.items || []).map((item) => ({
            ...products.find((product) => product.id === item.product),
            quantity: item.quantity,
        })).filter(Boolean)
    })
    const [wishlistItems, setWishlistItems] = useState(() => {
        const storedWishlist = localStorage.getItem('wishlistItems')
        if (storedWishlist) return JSON.parse(storedWishlist)

        return (defaultWishlist?.products || []).map((productId) => products.find((product) => product.id === productId)).filter(Boolean)
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

    // Fetch countries on mount
    useEffect(() => {
        fetchCountries()
    }, [fetchCountries])

    // Fetch cities when country changes
    useEffect(() => {
        fetchCities(selectedCountry)
    }, [selectedCountry, fetchCities])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
    }, [wishlistItems])

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const wishlistCount = wishlistItems.length

    const cartSubtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }, [cartItems])

    const login = useCallback((email) => {
        const matchedUser = users.find((account) => account.email.toLowerCase() === email.toLowerCase()) || defaultUser
        setUser(matchedUser)
        localStorage.setItem('user', JSON.stringify(matchedUser))
        localStorage.setItem('authToken', 'demo-token')
        return matchedUser
    }, [defaultUser])

    const register = useCallback((profile) => {
        const newUser = {
            id: `user_${Date.now()}`,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            role: 'customer',
            isVerified: true,
        }
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
        localStorage.setItem('authToken', 'demo-token')
        return newUser
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
    }, [])

    const addToCart = useCallback((product, quantity = 1) => {
        setCartItems((items) => {
            const existingItem = items.find((item) => item.id === product.id)
            if (existingItem) {
                return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
            }

            return [...items, { ...product, quantity }]
        })
    }, [])

    const updateCartItem = useCallback((productId, quantity) => {
        setCartItems((items) => {
            if (quantity <= 0) return items.filter((item) => item.id !== productId)
            return items.map((item) => item.id === productId ? { ...item, quantity } : item)
        })
    }, [])

    const removeFromCart = useCallback((productId) => {
        setCartItems((items) => items.filter((item) => item.id !== productId))
    }, [])

    const clearCart = useCallback(() => {
        setCartItems([])
    }, [])

    const toggleWishlist = useCallback((product) => {
        setWishlistItems((items) => {
            const exists = items.some((item) => item.id === product.id)
            return exists ? items.filter((item) => item.id !== product.id) : [...items, product]
        })
    }, [])

    return (
        <AppContext.Provider
            value={{
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
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }
