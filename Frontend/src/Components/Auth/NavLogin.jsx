import { Link } from 'react-router-dom'

const NavLogin = () => {
    const isLoggedIn = false

    return (
        <div>
            {isLoggedIn ? (
                <p className='rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-primary'>Welcome back!</p>
            ) : (
                <div className='flex flex-wrap items-center gap-2'>
                    <Link
                        to='/login'
                        className='rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-50 sm:px-4'
                    >
                        Login
                    </Link>
                    <Link
                        to='/register'
                        className='rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(34,197,94,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primaryDark sm:px-4'
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    )
}

export default NavLogin
