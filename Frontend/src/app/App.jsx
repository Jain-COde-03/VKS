import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../App.css'
import { AppProvider } from './providers/AppProvider'
import HomePage from '../features/home/pages/HomePage'
import ProductListingPage from '../features/products/pages/ProductListingPage'
import ProductDetailPage from '../features/products/pages/ProductDetailPage'
import CartPage from '../features/cart/pages/CartPage'
import CheckoutPage from '../features/checkout/pages/CheckoutPage'
import WishlistPage from '../features/wishlist/pages/WishlistPage'
import AuthPage from '../features/auth/pages/AuthPage'
import AccountPage from '../features/account/pages/AccountPage'
import AdminDashboard from '../features/admin/pages/AdminDashboard'
import AboutPage from '../features/static/pages/AboutPage'
import HelpPage from '../features/static/pages/HelpPage'
import TrackOrderPage from '../features/static/pages/TrackOrderPage'
import NotFoundPage from '../features/static/pages/NotFoundPage'

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/products' element={<ProductListingPage />} />
                    <Route path='/products/:id' element={<ProductDetailPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/checkout' element={<CheckoutPage />} />
                    <Route path='/wishlist' element={<WishlistPage />} />
                    <Route path='/account' element={<AccountPage />} />
                    <Route path='/admin' element={<AdminDashboard />} />
                    <Route path='/auth/login' element={<AuthPage mode='login' />} />
                    <Route path='/auth/register' element={<AuthPage mode='register' />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/help' element={<HelpPage />} />
                    <Route path='/track' element={<TrackOrderPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </AppProvider>
        </BrowserRouter>
    )
}

export default App
