import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ProductCard from '../../../shared/ui/ProductCard'
import { products } from '../../../data'

const dealProducts = products
    .filter((product) => product.discountLabel)
    .sort((first, second) => second.originalPrice - second.price - (first.originalPrice - first.price))
    .slice(0, 4)

const endTime = new Date(Date.now() + 2 * 60 * 60 * 1000 + 3 * 60 * 1000 + 18 * 1000)

const getTimeLeft = () => {
    const difference = endTime.getTime() - Date.now()

    if (difference <= 0) {
        return { hours: '00', minutes: '00', seconds: '00' }
    }

    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
    }
}

const InstantDealsSection = () => {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft)

    useEffect(() => {
        const timer = window.setInterval(() => {
            setTimeLeft(getTimeLeft())
        }, 1000)

        return () => window.clearInterval(timer)
    }, [])

    return (
        <section className='px-3 py-5 sm:px-4 sm:py-6 lg:px-6'>
            <div className='mx-auto max-w-350 rounded-4xl border border-emerald-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fff9_100%)] p-4 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-5'>
                <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Limited Time Offers</p>
                        <h2 className='mt-1 text-2xl font-black text-slate-900'>Instant Deals</h2>
                        <p className='mt-1 text-sm font-medium text-slate-500'>Fresh discounts on daily picks before the timer runs out.</p>
                    </div>

                    <div className='flex flex-wrap items-center gap-3'>
                        <div className='flex items-center gap-2 rounded-[20px] border border-emerald-100 bg-white px-3 py-2 shadow-sm'>
                            {[
                                { label: 'Hrs', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Sec', value: timeLeft.seconds },
                            ].map((item) => (
                                <div key={item.label} className='flex items-center gap-2'>
                                    <div className='flex min-w-14 flex-col items-center rounded-2xl bg-emerald-600 px-2 py-2 text-white'>
                                        <span className='text-lg font-black leading-none'>{item.value}</span>
                                        <span className='mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80'>{item.label}</span>
                                    </div>
                                    {item.label !== 'Sec' && <span className='text-lg font-black text-emerald-700'>:</span>}
                                </div>
                            ))}
                        </div>

                        <Link to='/products' className='inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-800'>
                            See all
                            <FiArrowRight />
                        </Link>
                    </div>
                </div>

                <div className='mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {dealProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            imageSrc={product.imageSrc}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            unit={product.unit}
                            rating={product.rating}
                            discountLabel={product.discountLabel}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InstantDealsSection
