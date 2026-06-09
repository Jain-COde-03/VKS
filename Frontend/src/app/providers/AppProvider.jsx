import { createContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'

export const AppContext = createContext(null)

const AppProvider = ({ children }) => {
    const [countryList, setCountryList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [cityList, setCityList] = useState([])
    const [address, setAddress] = useState('')
    const [cartCount, setCartCount] = useState(0)
    const [wishlistCount, setWishlistCount] = useState(0)
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

    return (
        <AppContext.Provider
            value={{
                address,
                cityList,
                countryList,
                selectedCountry,
                cartCount,
                wishlistCount,
                error,
                fetchAddress,
                fetchCities,
                fetchCountries,
                setAddress,
                setCityList,
                setCountryList,
                setSelectedCountry,
                setCartCount,
                setWishlistCount,
                setError,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }
