import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import PageShell from '../../../shared/layout/PageShell'
import ProductCard from '../../../shared/ui/ProductCard'
import { useAppContext } from '../../../hooks'

const WishlistPage = () => {
    const { wishlistItems } = useAppContext()

    return (
        <PageShell>
            <main className='px-3 py-6 sm:px-4 lg:px-6'>
                <section className='mx-auto max-w-350'>
                    <div className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]'>
                        <div className='flex flex-wrap items-center justify-between gap-3'>
                            <div>
                                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Wishlist</p>
                                <h1 className='mt-1 text-3xl font-black text-slate-900'>Saved favorites</h1>
                            </div>
                            <FiHeart className='text-3xl text-rose-500' />
                        </div>

                        {wishlistItems.length > 0 ? (
                            <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                                {wishlistItems.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        ) : (
                            <div className='mt-8 rounded-[28px] border border-dashed border-emerald-200 p-8 text-center'>
                                <h2 className='text-xl font-black text-slate-900'>No saved products yet</h2>
                                <p className='mt-2 text-sm font-medium text-slate-500'>Tap the heart on any product to keep it here.</p>
                                <Link to='/products' className='mt-5 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white'>Browse products</Link>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </PageShell>
    )
}

export default WishlistPage
