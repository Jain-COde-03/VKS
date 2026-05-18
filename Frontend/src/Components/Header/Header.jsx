import { useState } from 'react'
import { Link } from 'react-router'

const Header = () => {
    const [currencyOpen, setCurrencyOpen] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState('USD')

    const [langOpen, setLangOpen] = useState(false)
    const [selectedLang, setSelectedLang] = useState('English')

    return (
        <>
        <div className='flex flex-col gap-0'>
                <header className="flex items-center justify-center h-8 text-sm text-white px-4 py-2 bg-primary">
                    Due to high demand, delivery times may be longer than usual. We appreciate your patience and understanding.
                </header>
                <header className="flex items-center justify-between px-4 py-2 border-b-gray-100 border-b-2 bg-white h-10">
                    <div className="text-sm flex gap-3 text-gray-600 font-medium">
                        <div className="about"><a href="#About">About US</a></div><span>|</span>
                        <div className="account"><Link to="/account" className='hover:text-primary-light transition-all text-gray-600 '>My Account</Link></div><span>|</span>
                        <div className="wish"><Link to="/wishlist" className='hover:text-primary-light transition-all text-gray-600 '>Wishlist</Link></div><span>|</span>
                        <div className="track"><Link to="/track" className='hover:text-primary-light transition-all text-gray-600 '>Order Tracking</Link></div>

                    </div>

                    <div className="middle text-gray-500">
                        <span>👍</span>100% Genuine Products and Safe Delivery
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="help"><Link to="/help" className='hover:text-primary-light transition-all text-gray-600 font-bold'>Need Help? Call Us :<span className='text-primary-light hover:text-primary '>+91 1234567890</span></Link></div>
                        
                        <div className="lang">
                            <button
                                type="button"
                                onClick={() => setLangOpen((open) => !open)}
                                className="flex items-center gap-2 rounded-md  bg-white px-3 py-1 text-sm font-medium text-gray-500  hover:bg-gray-50"
                            >
                                {selectedLang}
                                <span>▼</span>
                            </button>
                            {langOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                                    {['English', 'Spanish', 'French'].map((lang) => (
                                        <button
                                            key={lang}
                                            type="button"
                                            onClick={() => {
                                                setSelectedLang(lang)
                                                setLangOpen(false)
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="currency">
                            <button
                                type="button"
                                onClick={() => setCurrencyOpen((open) => !open)}
                                className="flex items-center gap-2 rounded-md  bg-white px-3 py-1 text-sm font-medium text-gray-500  hover:bg-gray-50"
                            >
                                {selectedCurrency}
                                <span>▼</span>
                            </button>

                            {currencyOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                                    {['USD', 'EUR', 'GBP'].map((currency) => (
                                        <button
                                            key={currency}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCurrency(currency)
                                                setCurrencyOpen(false)
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {currency}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </header>
        </div>
        </>
    )
}

export default Header
