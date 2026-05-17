import { useState } from 'react'
import { Link } from 'react-router'

const Header = () => {
    const [currencyOpen, setCurrencyOpen] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState('USD')

    const [langOpen, setLangOpen] = useState(false)
    const [selectedLang, setSelectedLang] = useState('EN')

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-gray-100">
            <div className="text-sm text-gray-600">
                Get Upto 50% Off On Your First Order, Use Code: FIRST50
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="help"><Link to="/help" className='hover:text-amber-500 transition-all font-bold'>Help Center</Link></div>
                <div className="track"><Link to="/track" className='hover:text-amber-500 transition-all font-bold'>Order Tracking</Link></div>
                <div className="lang">
                    <button
                        type="button"
                        onClick={() => setLangOpen((open) => !open)}
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        {selectedLang}
                        <span>▼</span>
                    </button>
                    {langOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                            {['EN', 'ES', 'FR'].map((lang) => (
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
                        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
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
    )
}

export default Header
