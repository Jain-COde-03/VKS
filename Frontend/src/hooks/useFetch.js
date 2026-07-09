import { useState, useEffect } from 'react'
import API from '../services/api'

/**
 * Custom hook for fetching data
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Object} { data, loading, error }
 */
export const useFetch = (endpoint, options = {}) => {
    const { enabled = true } = options
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(() => Boolean(enabled && endpoint))
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!enabled || !endpoint) {
            return undefined
        }

        let isActive = true

        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await API.get(endpoint)
                if (isActive) setData(response.data)
            } catch (err) {
                if (isActive) setError(err.response?.data?.message || err.message)
                console.error('Fetch error:', err)
            } finally {
                if (isActive) setLoading(false)
            }
        }

        fetchData()

        return () => {
            isActive = false
        }
    }, [endpoint, enabled])

    return { data, loading, error }
}
