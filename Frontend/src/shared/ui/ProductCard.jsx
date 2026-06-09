import { useState } from 'react'
import { FiHeart, FiMinus, FiPlus, FiStar } from 'react-icons/fi'

const ProductCard = ({
    title = 'Organic Farm Fresh Tomatoes',
    imageSrc = '/images/categories/fruits/thumbnail.png',
    price = 145,
    originalPrice = 199,
    unit = '500 g',
    rating = 4.6,
    discountLabel = '30% OFF',
}) => {
    const [quantity, setQuantity] = useState(0)

    return (
        <article className='group min-w-55 rounded-[26px] border border-emerald-100 bg-white p-3 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(34,197,94,0.12)] sm:min-w-0'>
            <div className='relative overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#f7fff8_0%,#eefbf1_100%)] p-3'>
                <div className='absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white'>
                    {discountLabel}
                </div>

                <button
                    type='button'
                    aria-label={`Save ${title}`}
                    className='absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-600 shadow-sm transition-colors hover:text-rose-500'
                >
                    <FiHeart className='text-sm' />
                </button>

                <div className='flex h-38 items-center justify-center'>
                    <img
                        src={imageSrc}
                        alt={title}
                        className='h-30 w-30 object-contain transition-transform duration-300 group-hover:scale-105'
                    />
                </div>
            </div>

            <div className='mt-3'>
                <div className='flex items-center gap-1 text-amber-400'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FiStar key={index} className={`text-[13px] ${index < Math.round(rating) ? 'fill-current' : ''}`} />
                    ))}
                    <span className='ml-1 text-xs font-semibold text-slate-500'>{rating}</span>
                </div>

                <h3 className='mt-2 line-clamp-2 text-base font-bold leading-5 text-slate-900'>{title}</h3>
                <p className='mt-1 text-sm font-medium text-slate-500'>{unit}</p>

                <div className='mt-3 flex items-end justify-between gap-3'>
                    <div>
                        <p className='text-lg font-black text-slate-900'>Rs {price}</p>
                        <p className='text-sm font-medium text-slate-400 line-through'>Rs {originalPrice}</p>
                    </div>

                    <div className='flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 shadow-sm'>
                        <button
                            type='button'
                            onClick={() => setQuantity((count) => Math.max(0, count - 1))}
                            aria-label={`Decrease ${title} quantity`}
                            className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm transition-colors hover:bg-emerald-100'
                        >
                            <FiMinus className='text-sm' />
                        </button>

                        <span className='min-w-5 text-center text-sm font-bold text-emerald-800'>{quantity}</span>

                        <button
                            type='button'
                            onClick={() => setQuantity((count) => count + 1)}
                            aria-label={`Increase ${title} quantity`}
                            className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition-colors hover:bg-emerald-700'
                        >
                            <FiPlus className='text-sm' />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ProductCard
