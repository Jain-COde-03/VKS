import { useEffect, useState } from 'react'
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiClock, FiShoppingBag, FiTag } from 'react-icons/fi'
import CategoryCard from '../../../shared/ui/CategoryCard'
import { categories } from '../../../data'
=======
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiClock, FiShoppingBag, FiTag } from 'react-icons/fi'
import CategoryCard from '../../../shared/ui/CategoryCard'
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981

const bannerSlides = [
    {
        eyebrow: 'Everyday Fresh Picks',
        title: 'Groceries delivered fast, fresh, and right to your door.',
        description: 'Shop daily essentials, fruits, snacks, and home needs in one place with quick delivery and great offers.',
        stats: ['Delivery in 30 mins', '1000+ daily essentials'],
        accent: 'bg-[linear-gradient(135deg,#14532d_0%,#2e7d32_45%,#86efac_100%)]',
        glow: 'bg-emerald-200/25',
        image: '/images/categories/fruits/thumbnail.png',
    },
    {
        eyebrow: 'Seasonal Savings',
        title: 'Stock up on kitchen staples with weekly smart deals.',
        description: 'From fresh produce to pantry basics, discover value packs and daily discounts curated for your family.',
        stats: ['Up to 40% off', 'New offers every day'],
        accent: 'bg-[linear-gradient(135deg,#7c2d12_0%,#ea580c_48%,#fdba74_100%)]',
        glow: 'bg-orange-200/25',
<<<<<<< HEAD
        image: '/images/products/spices.png',
=======
        image: '/images/categories/fruits/thumbnail.png',
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981
    },
    {
        eyebrow: 'Morning Essentials',
        title: 'Breakfast favorites and dairy staples, ready before rush hour.',
        description: 'Order milk, bread, eggs, cereals, and healthy bites in minutes for a smoother start to your day.',
        stats: ['Breakfast-ready picks', 'Fresh stock every morning'],
        accent: 'bg-[linear-gradient(135deg,#1e3a8a_0%,#2563eb_48%,#93c5fd_100%)]',
        glow: 'bg-sky-200/25',
<<<<<<< HEAD
        image: '/images/categories/breakfast/thumbnail.png',
    },
]

const categoryAccents = {
    Vegetables: 'from-emerald-100 via-lime-50 to-white',
    Fruits: 'from-orange-100 via-amber-50 to-white',
    Dairy: 'from-sky-100 via-cyan-50 to-white',
    Bakery: 'from-amber-100 via-yellow-50 to-white',
    Snacks: 'from-rose-100 via-pink-50 to-white',
    Drinks: 'from-violet-100 via-fuchsia-50 to-white',
    Breakfast: 'from-lime-100 via-green-50 to-white',
    Household: 'from-slate-100 via-zinc-50 to-white',
    Pantry: 'from-orange-100 via-yellow-50 to-white',
}
=======
        image: '/images/categories/fruits/thumbnail.png',
    },
]

const categories = [
    { title: 'Vegetables', imageSrc: '/images/categories/vegetables/thumbnail.png', accentClass: 'from-emerald-100 via-lime-50 to-white' },
    { title: 'Fruits', imageSrc: '/images/categories/fruits/thumbnail.png', accentClass: 'from-orange-100 via-amber-50 to-white' },
    { title: 'Dairy', imageSrc: '/images/categories/dairy/thumbnail.png', accentClass: 'from-sky-100 via-cyan-50 to-white' },
    { title: 'Bakery', imageSrc: '/images/categories/bakery/thumbnail.png', accentClass: 'from-amber-100 via-yellow-50 to-white' },
    { title: 'Snacks', imageSrc: '/images/categories/snacks/thumbnail.png', accentClass: 'from-rose-100 via-pink-50 to-white' },
    { title: 'Drinks', imageSrc: '/images/categories/drinks/thumbnail.png', accentClass: 'from-violet-100 via-fuchsia-50 to-white' },
    { title: 'Breakfast', imageSrc: '/images/categories/breakfast/thumbnail.png', accentClass: 'from-lime-100 via-green-50 to-white' },
    { title: 'Household', imageSrc: '/images/categories/household/thumbnail.png', accentClass: 'from-slate-100 via-zinc-50 to-white' },
]
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981

const HeroSection = () => {
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % bannerSlides.length)
        }, 4500)

        return () => window.clearInterval(timer)
    }, [])

    const currentSlide = bannerSlides[activeSlide]

    const showPrevSlide = () => {
        setActiveSlide((current) => (current - 1 + bannerSlides.length) % bannerSlides.length)
    }

    const showNextSlide = () => {
        setActiveSlide((current) => (current + 1) % bannerSlides.length)
    }

    return (
        <section className='hero-section bg-[linear-gradient(180deg,#f7fff8_0%,#ffffff_72%)] px-3 py-5 sm:px-4 sm:py-6 lg:px-6'>
            <div className='mx-auto flex w-full max-w-350 flex-col gap-5'>
                <div className='relative overflow-hidden rounded-[32px]'>
                    <div className={`relative overflow-hidden px-5 py-6 text-white shadow-[0_24px_60px_rgba(34,197,94,0.18)] transition-all duration-500 sm:px-7 sm:py-8 ${currentSlide.accent}`}>
                        <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${currentSlide.glow}`} />
                        <div className='absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl' />
                        <div className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10 lg:block hidden' />

                        <div className='relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center'>
                            <div>
                                <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm'>
                                    <FiTag className='text-sm' />
                                    {currentSlide.eyebrow}
                                </div>

                                <h1 className='max-w-xl text-3xl font-black leading-tight sm:text-4xl'>
                                    {currentSlide.title}
                                </h1>

                                <p className='mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base'>
                                    {currentSlide.description}
                                </p>

                                <div className='mt-5 flex flex-wrap items-center gap-3 text-sm font-medium'>
                                    <div className='inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 backdrop-blur-sm'>
                                        <FiClock />
                                        {currentSlide.stats[0]}
                                    </div>
                                    <div className='inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 backdrop-blur-sm'>
                                        <FiShoppingBag />
                                        {currentSlide.stats[1]}
                                    </div>
                                </div>

                                <div className='mt-6 flex flex-wrap items-center gap-3'>
<<<<<<< HEAD
                                    <Link
                                        to='/products'
=======
                                    <button
                                        type='button'
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981
                                        className='inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-lg transition-transform duration-300 hover:-translate-y-0.5'
                                    >
                                        Shop now
                                        <FiArrowRight />
<<<<<<< HEAD
                                    </Link>
=======
                                    </button>
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981

                                    <div className='flex items-center gap-2'>
                                        {bannerSlides.map((slide, index) => (
                                            <button
                                                key={slide.title}
                                                type='button'
                                                aria-label={`Go to slide ${index + 1}`}
                                                onClick={() => setActiveSlide(index)}
                                                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='relative flex items-center justify-center'>
                                <div className='relative flex h-[220px] w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md sm:h-[260px] sm:w-[260px]'>
                                    <div className='absolute inset-4 rounded-full border border-dashed border-white/25' />
                                    <div className='absolute inset-10 rounded-full bg-white/12 blur-xl' />
                                    <img
                                        src={currentSlide.image}
                                        alt={currentSlide.eyebrow}
                                        className='relative h-36 w-36 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.2)] sm:h-44 sm:w-44'
                                    />
                                </div>

                                <button
                                    type='button'
                                    onClick={showPrevSlide}
                                    aria-label='Previous slide'
                                    className='absolute left-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:left-3'
                                >
                                    <FiChevronLeft className='text-lg' />
                                </button>

                                <button
                                    type='button'
                                    onClick={showNextSlide}
                                    aria-label='Next slide'
                                    className='absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-3'
                                >
                                    <FiChevronRight className='text-lg' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='rounded-[28px] border border-emerald-100 bg-white/90 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-5'>
                    <div className='mb-4 flex items-end justify-between gap-3'>
                        <div>
                            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Shop by Category</p>
                            <h2 className='mt-1 text-lg font-bold text-gray-900 sm:text-xl'>Pick what you need today</h2>
                        </div>
<<<<<<< HEAD
                        <Link to='/products' className='hidden text-sm font-semibold text-emerald-700 sm:inline-flex'>
                            View all
                        </Link>
=======
                        <button type='button' className='hidden text-sm font-semibold text-emerald-700 sm:inline-flex'>
                            View all
                        </button>
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981
                    </div>

                    <div className='flex gap-2 overflow-x-auto pb-1 sm:gap-3'>
                        {categories.map((item) => (
<<<<<<< HEAD
                            <CategoryCard key={item.id} title={item.name} imageSrc={item.image} accentClass={categoryAccents[item.name]} />
=======
                            <CategoryCard key={item.title} title={item.title} imageSrc={item.imageSrc} accentClass={item.accentClass} />
>>>>>>> dcb7e2bdec2154d2c39af246755c319267c84981
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
