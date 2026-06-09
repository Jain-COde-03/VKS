import { useContext } from 'react'
import { AppContext } from '../app/providers/AppProvider'

/**
 * Custom hook to access app context
 * @returns {Object} AppContext value
 */
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider')
    }
    return context
}
