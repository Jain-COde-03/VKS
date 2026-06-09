import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../App.css'
import { AppProvider } from './providers/AppProvider'
import HomePage from '../features/home/pages/HomePage'
<<<<<<< HEAD
import ProductListingPage from '../features/products/pages/ProductListingPage'
=======
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path='/' element={<HomePage />} />
<<<<<<< HEAD
                    <Route path='/products' element={<ProductListingPage />} />
=======
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981
                    <Route path='/help' element={<div>Help Center Page</div>} />
                    <Route path='/track' element={<div>Order Tracking Page</div>} />
                </Routes>
            </AppProvider>
        </BrowserRouter>
    )
}

export default App
