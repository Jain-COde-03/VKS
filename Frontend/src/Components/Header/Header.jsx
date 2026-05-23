import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiHeadphones, FiShield, FiTruck } from 'react-icons/fi'

const Header = () => {
    const [helpOpen, setHelpOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)
    const [currencyOpen, setCurrencyOpen] = useState(false)
    const [selectedLang, setSelectedLang] = useState('English')
    const [selectedCurrency, setSelectedCurrency] = useState('USD')

    const topLinks = [
        { label: 'About Us', to: '/about' },
        { label: 'My Account', to: '/account' },
        { label: 'Wishlist', to: '/wishlist' },
        { label: 'Order Tracking', to: '/track' },
    ]

    const closeMenus = () => {
        setHelpOpen(false)
        setLangOpen(false)
        setCurrencyOpen(false)
    }

    const renderMenu = (items, onSelect) => (
        <div className='absolute right-0 z-20 mt-3 w-44 overflow-hidden rounded-2xl border border-emerald-100 bg-white p-1 shadow-[0_24px_60px_rgba(15,23,42,0.16)]'>
            {items.map((item) => (
                <button
                    key={item}
                    type='button'
                    onClick={() => onSelect(item)}
                    className='w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-primary'
                >
                    {item}
                </button>
            ))}
        </div>
    )

    return (
        <div className='relative z-30 hidden md:flex flex-col'>
            <header className='relative overflow-hidden bg-[radial-gradient(circle_at_left,_rgba(255,255,255,0.18),_transparent_35%),linear-gradient(90deg,_#1b5e20,_#2e7d32,_#66bb6a)] px-4 py-2 text-white'>
                <div className='mx-auto flex max-w-[1400px] items-center justify-center gap-2 text-center text-[11px] font-medium tracking-[0.02em] sm:text-[12px]'>
                    <FiTruck className='shrink-0 text-sm' />
                    <span>Fresh essentials delivered fast. Peak-hour orders may take a little longer today.</span>
                </div>
            </header>

            <header className='relative border-b border-emerald-100 bg-white/90 px-4 py-3 backdrop-blur-sm' onMouseLeave={closeMenus}>
                <div className='mx-auto flex max-w-[1400px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between xl:relative'>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-gray-600'>
                        {topLinks.map((link) => (
                            <Link key={link.label} to={link.to} className='transition-colors hover:text-primary'>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className='hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-4 py-2 text-sm font-medium text-gray-700 xl:absolute xl:left-1/2 xl:top-1/2 xl:flex xl:-translate-x-1/2 xl:-translate-y-1/2'>
                        <FiShield className='shrink-0 text-primary' />
                        <span>100% genuine products and safe delivery</span>
                    </div>

                    <div className='flex flex-wrap items-center gap-2 lg:justify-end'>
                        <div className='relative'>
                            <button
                                type='button'
                                onClick={() => {
                                    setHelpOpen((open) => !open)
                                    setLangOpen(false)
                                    setCurrencyOpen(false)
                                }}
                                className='flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:text-primary sm:px-4'
                            >
                                <FiHeadphones className='text-primary' />
                                <span>Need Help?</span>
                            </button>
                            {helpOpen && (
                                <div className='absolute right-0 top-full z-20 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-emerald-100 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.16)]'>
                                    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>Support</p>
                                    <p className='mt-2 text-lg font-bold text-gray-900'>+91 1234567890</p>
                                    <p className='mt-1 text-sm text-gray-500'>support@vicky.com</p>
                                    <p className='mt-3 text-sm text-gray-600'>We are here every day from 8:00 AM to 10:00 PM.</p>
                                </div>
                            )}
                        </div>

                        <div className='relative'>
                            <button
                                type='button'
                                onClick={() => {
                                    setLangOpen((open) => !open)
                                    setHelpOpen(false)
                                    setCurrencyOpen(false)
                                }}
                                className='flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:text-primary sm:px-4'
                            >
                                <span>{selectedLang}</span>
                                <FiChevronDown className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {langOpen &&
                                renderMenu(['English', 'Spanish', 'French'], (lang) => {
                                    setSelectedLang(lang)
                                    setLangOpen(false)
                                })}
                        </div>

                        <div className='relative'>
                            <button
                                type='button'
                                onClick={() => {
                                    setCurrencyOpen((open) => !open)
                                    setHelpOpen(false)
                                    setLangOpen(false)
                                }}
                                className='flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:text-primary sm:px-4'
                            >
                                <span>{selectedCurrency}</span>
                                <FiChevronDown className={`transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {currencyOpen &&
                                renderMenu(['USD', 'EUR', 'GBP'], (currency) => {
                                    setSelectedCurrency(currency)
                                    setCurrencyOpen(false)
                                })}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
