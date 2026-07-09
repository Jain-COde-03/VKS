import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiCheckCircle, FiHeart, FiMinus, FiPlus, FiRotateCcw, FiShield, FiShoppingCart, FiStar, FiTruck } from 'react-icons/fi'
import PageShell from '../../../shared/layout/PageShell'
import ProductCard from '../../../shared/ui/ProductCard'
import { products } from '../../../data'
import { useAppContext } from '../../../hooks'

const ProductDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart, toggleWishlist, wishlistItems } = useAppContext()
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)
    const [deliveryTimestamp] = useState(() => Date.now() + 24 * 60 * 60 * 1000)

    const product = products.find((item) => item.id === Number(id))
    const relatedProducts = useMemo(() => {
        if (!product) return []

        return products
            .filter((item) => item.id !== product.id && item.category === product.category)
            .slice(0, 4)
    }, [product])

    if (!product) {
        return (
            <PageShell>
                <main className='px-3 py-10 sm:px-4 lg:px-6'>
                    <section className='mx-auto max-w-xl rounded-[30px] border border-emerald-100 bg-white p-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Product</p>
                        <h1 className='mt-2 text-3xl font-black text-slate-900'>Product not found</h1>
                        <p className='mt-2 text-sm font-semibold text-slate-500'>This item is not available in the catalog.</p>
                        <Link to='/products' className='mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white'>Back to products</Link>
                    </section>
                </main>
            </PageShell>
        )
    }

    const isWishlisted = wishlistItems.some((item) => item.id === product.id)
    const savings = Math.max(0, product.originalPrice - product.price)
    const deliveryDate = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(deliveryTimestamp))
    const bullets = [
        `${product.brand} quality checked before packing`,
        `${product.stock} units currently available`,
        product.tags.length ? `Best for ${product.tags.join(', ')}` : 'Freshly packed for daily use',
        'Eligible for free delivery above Rs 499',
    ]

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setIsAdding(true)
        window.setTimeout(() => setIsAdding(false), 850)
    }

    const handleBuyNow = () => {
        addToCart(product, quantity)
        navigate('/checkout')
    }

    return (
        <PageShell>
            <main className='px-3 py-6 sm:px-4 lg:px-6'>
                <div className='mx-auto max-w-350'>
                    <div className='mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500'>
                        <Link to='/' className='hover:text-emerald-700'>Home</Link>
                        <span>/</span>
                        <Link to='/products' className='hover:text-emerald-700'>Products</Link>
                        <span>/</span>
                        <span className='text-slate-900'>{product.title}</span>
                    </div>

                    <section className='grid gap-5 lg:grid-cols-[minmax(20rem,34rem)_1fr_22rem] lg:items-start'>
                        <div className='rounded-[30px] border border-emerald-100 bg-white p-4 shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                            <div className='relative flex aspect-square items-center justify-center rounded-[26px] bg-[linear-gradient(180deg,#f7fff8_0%,#eefbf1_100%)] p-6'>
                                <span className='absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-black tracking-[0.12em] text-white'>{product.discountLabel}</span>
                                <button
                                    type='button'
                                    onClick={() => toggleWishlist(product)}
                                    aria-label={`Save ${product.title}`}
                                    className={`absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-sm transition-colors hover:text-rose-500 ${isWishlisted ? 'text-rose-500' : 'text-slate-600'}`}
                                >
                                    <FiHeart className={`text-lg ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                                <img src={product.imageSrc} alt={product.title} className='h-[72%] w-[72%] object-contain drop-shadow-[0_22px_36px_rgba(15,23,42,0.12)]' />
                            </div>

                            <div className='mt-3 grid grid-cols-4 gap-2'>
                                {[product.imageSrc, product.imageSrc, product.imageSrc, product.imageSrc].map((image, index) => (
                                    <button key={index} type='button' className='flex aspect-square items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-2'>
                                        <img src={image} alt={`${product.title} view ${index + 1}`} className='h-full w-full object-contain' />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='space-y-5'>
                            <section className='rounded-[30px] border border-emerald-100 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>{product.category}</p>
                                <h1 className='mt-2 text-3xl font-black leading-tight text-slate-900 sm:text-4xl'>{product.title}</h1>
                                <p className='mt-2 text-sm font-bold text-slate-500'>Brand: <span className='text-emerald-700'>{product.brand}</span></p>

                                <div className='mt-4 flex flex-wrap items-center gap-3'>
                                    <div className='inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-black text-amber-500'>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <FiStar key={index} className={index < Math.round(product.rating) ? 'fill-current' : ''} />
                                        ))}
                                        <span className='ml-1 text-slate-700'>{product.rating}</span>
                                    </div>
                                    <span className='rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-black text-emerald-700'>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
                                </div>

                                <div className='mt-5 border-y border-emerald-100 py-5'>
                                    <div className='flex flex-wrap items-end gap-3'>
                                        <p className='text-4xl font-black text-slate-900'>Rs {product.price}</p>
                                        <p className='pb-1 text-lg font-bold text-slate-400 line-through'>Rs {product.originalPrice}</p>
                                        <p className='pb-1 text-sm font-black text-emerald-700'>Save Rs {savings}</p>
                                    </div>
                                    <p className='mt-2 text-sm font-semibold text-slate-500'>Inclusive of all taxes · {product.unit}</p>
                                </div>

                                <ul className='mt-5 grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-2'>
                                    {bullets.map((bullet) => (
                                        <li key={bullet} className='flex gap-2 rounded-2xl bg-emerald-50 p-3'>
                                            <FiCheckCircle className='mt-0.5 shrink-0 text-emerald-700' />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className='rounded-[30px] border border-emerald-100 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                                <h2 className='text-xl font-black text-slate-900'>Product details</h2>
                                <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                                    {[
                                        ['Category', product.category],
                                        ['Brand', product.brand],
                                        ['Pack size', product.unit],
                                        ['Freshness', 'Packed today'],
                                        ['Storage', product.category === 'Dairy' ? 'Keep refrigerated' : 'Store in a cool dry place'],
                                        ['Country of origin', 'India'],
                                    ].map(([label, value]) => (
                                        <div key={label} className='rounded-2xl border border-emerald-100 bg-white p-3'>
                                            <p className='text-xs font-bold uppercase tracking-[0.14em] text-slate-400'>{label}</p>
                                            <p className='mt-1 text-sm font-black text-slate-800'>{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside className='rounded-[30px] border border-emerald-100 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] lg:sticky lg:top-5'>
                            <p className='text-sm font-semibold text-slate-500'>Delivery by</p>
                            <p className='mt-1 text-xl font-black text-slate-900'>{deliveryDate}</p>
                            <p className='mt-1 text-sm font-semibold text-emerald-700'>Free delivery above Rs 499</p>

                            <div className='mt-5 flex items-center justify-between rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2'>
                                <button type='button' onClick={() => setQuantity((count) => Math.max(1, count - 1))} className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm' aria-label='Decrease quantity'>
                                    <FiMinus />
                                </button>
                                <span className='text-base font-black text-slate-900'>{quantity}</span>
                                <button type='button' onClick={() => setQuantity((count) => count + 1)} className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm' aria-label='Increase quantity'>
                                    <FiPlus />
                                </button>
                            </div>

                            <button
                                type='button'
                                onClick={handleAddToCart}
                                className={`relative mt-4 flex h-12 w-full items-center justify-center overflow-hidden rounded-full px-4 text-sm font-black text-white transition-all duration-200 hover:bg-emerald-700 ${isAdding ? 'scale-[0.98] bg-emerald-700 shadow-[0_12px_26px_rgba(34,197,94,0.22)]' : 'bg-emerald-600'}`}
                            >
                                <span className={`absolute left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm ${isAdding ? 'animate-cart-slide' : '-translate-x-14 opacity-0'}`}>
                                    {isAdding ? <FiShoppingCart className='text-base' /> : null}
                                </span>
                                <span className={`inline-flex items-center gap-2 transition-all duration-200 ${isAdding ? 'translate-x-3 opacity-0' : 'translate-x-0 opacity-100'}`}>
                                    <FiShoppingCart className='text-base' />
                                    Add to cart
                                </span>
                                <span className={`absolute inline-flex items-center gap-2 transition-all duration-200 ${isAdding ? 'translate-x-0 opacity-100 delay-150' : '-translate-x-3 opacity-0'}`}>
                                    <FiCheckCircle className='text-base' />
                                    Added
                                </span>
                            </button>

                            <button type='button' onClick={handleBuyNow} className='mt-3 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-slate-800'>
                                Buy now
                            </button>

                            <div className='mt-5 space-y-3 text-sm font-semibold text-slate-600'>
                                {[
                                    [FiTruck, 'Fast delivery to your selected location'],
                                    [FiShield, 'Quality checked and safely packed'],
                                    [FiRotateCcw, 'Easy replacement for damaged items'],
                                ].map(([Icon, text]) => (
                                    <div key={text} className='flex gap-3 rounded-2xl bg-emerald-50 p-3'>
                                        <Icon className='mt-0.5 shrink-0 text-emerald-700' />
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </section>

                    {relatedProducts.length > 0 && (
                        <section className='mt-6'>
                            <div className='mb-4 flex items-center justify-between gap-3'>
                                <div>
                                    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Related</p>
                                    <h2 className='text-2xl font-black text-slate-900'>More from {product.category}</h2>
                                </div>
                                <Link to='/products' className='rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-black text-emerald-700'>View all</Link>
                            </div>
                            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                {relatedProducts.map((item) => (
                                    <ProductCard key={item.id} {...item} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </PageShell>
    )
}

export default ProductDetailPage
