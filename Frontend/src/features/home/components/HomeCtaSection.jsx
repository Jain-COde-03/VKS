import { Link } from 'react-router-dom'
import { FiArrowRight, FiMapPin, FiShoppingBag } from 'react-icons/fi'

const HomeCtaSection = () => {
    return (
        <section className='px-3 pb-10 pt-4 sm:px-4 lg:px-6'>
            <div className='mx-auto max-w-350 overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#123524_0%,#2e7d32_58%,#f59e0b_100%)] px-5 py-6 text-white shadow-[0_24px_60px_rgba(21,128,61,0.18)] sm:px-8 sm:py-8'>
                <div className='grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center'>
                    <div>
                        <div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90'>
                            <FiMapPin />
                            Fresh delivery near you
                        </div>

                        <h2 className='mt-4 max-w-2xl text-2xl font-black leading-tight sm:text-3xl'>
                            Ready to fill your basket with fresh daily essentials?
                        </h2>

                        <p className='mt-3 max-w-xl text-sm font-medium leading-6 text-white/82 sm:text-base'>
                            Choose your location, browse categories, and build your order in minutes.
                        </p>
                    </div>

                    <div className='flex flex-wrap gap-3 lg:justify-end'>
                        <Link
                            to='/products'
                            className='inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-emerald-700 shadow-lg transition-transform duration-300 hover:-translate-y-0.5'
                        >
                            <FiShoppingBag />
                            Start shopping
                        </Link>

                        <button
                            type='button'
                            className='inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-white/15'
                        >
                            Check delivery
                            <FiArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeCtaSection
