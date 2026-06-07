import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../App.css'
import { AppProvider } from './providers/AppProvider'
import HomePage from '../features/home/pages/HomePage'

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/help' element={<div>Help Center Page</div>} />
                    <Route path='/track' element={<div>Order Tracking Page</div>} />
                </Routes>
            </AppProvider>
        </BrowserRouter>
    )
}

export default App
