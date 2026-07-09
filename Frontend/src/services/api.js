import axios from 'axios'
import authTokenStore from './authTokenStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

// Add token to all requests
API.interceptors.request.use((config) => {
    const token = authTokenStore.getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle response errors
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const resp = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
                const newToken = resp.data?.token
                const user = resp.data?.user
                if (newToken) {
                    authTokenStore.setToken(newToken)
                    if (user) try { window.dispatchEvent(new CustomEvent('auth:user', { detail: user })) } catch (e) {}
                    API.defaults.headers.common.Authorization = `Bearer ${newToken}`
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    return API(originalRequest)
                }
            } catch (refreshErr) {
                // refresh failed — clear and redirect
                try { import('./authTokenStore').then(m => m.default.clearToken()) } catch (e) {}
                window.location.href = '/auth/login'
                return Promise.reject(refreshErr)
            }
        }
        return Promise.reject(error)
    }
)

export default API
