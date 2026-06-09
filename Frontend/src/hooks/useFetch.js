import { useState, useEffect } from 'react'
import API from '../services/api'

/**
 * Custom hook for fetching data
 * @param {string} endpoint - API endpoint
 * @param {Array} dependencies - Effect dependencies
 * @returns {Object} { data, loading, error }
 */
export const useFetch = (endpoint, dependencies = []) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await API.get(endpoint)
                setData(response.data)
            } catch (err) {
                setError(err.response?.data?.message || err.message)
                console.error('Fetch error:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [endpoint, ...dependencies])

    return { data, loading, error }
}
