import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdMenu, MdClose } from 'react-icons/md'
import Search from '../Common/Search'
import Location from '../Common/Location'
import NavLogin from '../Auth/NavLogin'
import UserDashboard from './UserDashboard'

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <>
<<<<<<< HEAD
            <div className='relative z-10 border-b border-emerald-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fff8_100%)] shadow-[0_12px_40px_rgba(15,23,42,0.04)]'>
=======
            <div className='relative z-10 border-b border-emerald-100 bg-[linear-gradient(180deg,_#ffffff_0%,_#f7fff8_100%)] shadow-[0_12px_40px_rgba(15,23,42,0.04)]'>
>>>>>>> 5afefde80985ea5867ad8afd7fac62287d09f7c9
                <div className='w-full px-3 py-3 sm:px-4 lg:px-5 xl:px-6'>
                    <div className='flex flex-col gap-3 md:hidden'>
                        <div className='flex items-center gap-3'>
                            <div className='min-w-0 flex-1'>
                                <img src='/images/logo2.png' alt='VKS' className='h-12 w-auto max-w-full object-contain' />
                            </div>
                            <UserDashboard compact />
                            <button
                                type='button'
                                onClick={() => setSidebarOpen(true)}
                                className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-50'
                                aria-label='Open sidebar'
                            >
                                <MdMenu size={24} />
                            </button>
                        </div>

                        <Search width='w-full' value={searchQuery} onChange={setSearchQuery} />
                        <Location />
                    </div>

                    <div className='hidden md:flex xl:hidden flex-col gap-4'>
                        <div className='flex items-center justify-between gap-4'>
                            <img src='/images/logo2.png' alt='VKS' className='h-16 w-auto shrink-0 object-contain' />
                            <div className='flex min-w-0 flex-1 items-center gap-3'>
                                <Search width='w-full' value={searchQuery} onChange={setSearchQuery} />
                                <UserDashboard compact />
                            </div>
                        </div>

                        <div className='flex flex-wrap items-center justify-between gap-3'>
<<<<<<< HEAD
                            <div className='min-w-65 flex-1'>
=======
                            <div className='min-w-[260px] flex-1'>
>>>>>>> 5afefde80985ea5867ad8afd7fac62287d09f7c9
                                <Location />
                            </div>
                            <div className='shrink-0'>
                                <NavLogin />
                            </div>
                        </div>
                    </div>

                    <div className='hidden xl:flex items-center gap-5 py-1 2xl:gap-6'>
                        <div className='shrink-0'>
                            <img src='/images/logo2.png' alt='VKS' className='h-20 w-auto object-contain' />
                        </div>

<<<<<<< HEAD
                        <div className='w-70 shrink-0'>
                            <Location />
                        </div>

                        <div className='min-w-0 max-w-190 flex-1'>
=======
                        <div className='w-[280px] shrink-0'>
                            <Location />
                        </div>

                        <div className='min-w-0 max-w-[760px] flex-1'>
>>>>>>> 5afefde80985ea5867ad8afd7fac62287d09f7c9
                            <Search width='w-full' value={searchQuery} onChange={setSearchQuery} />
                        </div>

                        <div className='ml-auto flex shrink-0 items-center gap-4'>
                            <NavLogin />
                            <UserDashboard />
                        </div>
                    </div>
                </div>
            </div>

            {sidebarOpen && <div className='fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-[2px] md:hidden' onClick={() => setSidebarOpen(false)}></div>}

            <div
<<<<<<< HEAD
                className={`fixed inset-y-0 left-0 z-50 w-[min(22rem,88vw)] overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#f4fff6_100%)] shadow-[0_30px_80px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
=======
                className={`fixed inset-y-0 left-0 z-50 w-[min(22rem,88vw)] overflow-y-auto bg-[linear-gradient(180deg,_#ffffff_0%,_#f4fff6_100%)] shadow-[0_30px_80px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
>>>>>>> 5afefde80985ea5867ad8afd7fac62287d09f7c9
            >
                <div className='border-b border-emerald-100 px-5 py-5'>
                    <div className='flex items-center justify-between gap-3'>
                        <div>
                            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>My Account</p>
                            <p className='mt-1 text-lg font-bold text-gray-900'>Manage your profile and orders</p>
                        </div>
                        <button
                            type='button'
                            onClick={() => setSidebarOpen(false)}
                            className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm hover:bg-emerald-50'
                            aria-label='Close menu'
                        >
                            <MdClose size={24} />
                        </button>
                    </div>
                </div>

                <div className='space-y-6 p-5'>
<<<<<<< HEAD
                    <div className='rounded-[28px] bg-[linear-gradient(135deg,#1b5e20,#2e7d32,#66bb6a)] p-5 text-white shadow-[0_20px_50px_rgba(34,197,94,0.25)]'>
=======
                    <div className='rounded-[28px] bg-[linear-gradient(135deg,_#1b5e20,_#2e7d32,_#66bb6a)] p-5 text-white shadow-[0_20px_50px_rgba(34,197,94,0.25)]'>
>>>>>>> 5afefde80985ea5867ad8afd7fac62287d09f7c9
                        <p className='text-sm text-white/80'>Hello Guest</p>
                        <p className='mt-1 text-xl font-bold'>Sign in for a better shopping experience</p>
                        <div className='mt-4 flex flex-col gap-2 min-[380px]:flex-row'>
                            <Link to='/login' className='flex-1 rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-primary'>
                                Sign In
                            </Link>
                            <Link to='/register' className='flex-1 rounded-full border border-white/30 px-4 py-2 text-center text-sm font-semibold text-white'>
                                Register
                            </Link>
                        </div>
                    </div>

                    <div className='space-y-3'>
                        {['Wishlist', 'Order History', 'Track Order', 'Saved Addresses', 'Help Center'].map((item) => (
                            <button
                                key={item}
                                className='w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-left text-base font-semibold text-gray-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-50'
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className='rounded-[28px] border border-emerald-100 bg-white p-4 shadow-sm'>
                        <div className='flex items-center justify-between text-sm text-gray-500'>
                            <span>Cart</span>
                            <span className='font-semibold text-gray-900'>3 items</span>
                        </div>
                        <div className='mt-4 flex flex-col gap-3 min-[380px]:flex-row'>
                            <button className='flex-1 rounded-full bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-200'>View Cart</button>
                            <button className='flex-1 rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
