/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AppContext = createContext(null)

const AppProvider = ({ children }) => {
    const [countryList, setCountryList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [cityList, setCityList] = useState([])
    const [address, setAddress] = useState('')

    const apiKey = import.meta.env.VITE_POSITIONSTACK_API_KEY

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
            const countries = response.data.data.map((country) => ({
                flag: country.flag,
                name: country.name,
            }))
            setCountryList(countries)
        } catch (error) {
            console.error('Error fetching countries:', error)
        }
    }

    const fetchCity = async (country) => {
        try {
            const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country })
            setCityList(response.data.data)
        } catch (error) {
            console.error('Error fetching cities:', error)
            return []
        }
    }

    const fetchAdress = async (long, lat) => {
        const storedLocation = localStorage.getItem('userLocation')
        if (storedLocation) {
            try {
                const parsedStorage = JSON.parse(storedLocation)
                if (parsedStorage.address) {
                    setAddress(parsedStorage.address)
                    return parsedStorage.address
                }
            } catch (error) {
                console.error('Error reading stored userLocation', error)
            }
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

            if (data.country) {
                setSelectedCountry(data.country)
            }

            return label
        } catch (error) {
            console.error('Error fetching address:', error)
            return ''
        }
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    useEffect(() => {
        if (selectedCountry) {
            fetchCity(selectedCountry)
        } else {
            setCityList([])
        }
    }, [selectedCountry])

    return (
        <AppContext.Provider
            value={{
                address,
                cityList,
                countryList,
                fetchAdress,
                fetchCity,
                selectedCountry,
                setAddress,
                setCityList,
                setCountryList,
                setSelectedCountry,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }
