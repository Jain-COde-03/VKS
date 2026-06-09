import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ProductCard from '../../../shared/ui/ProductCard'
import { products } from '../../../data'

const freshPicks = products
    .filter((product) => product.tags.includes('fresh'))
    .sort((first, second) => second.rating - first.rating)
    .slice(0, 4)

const FreshPicksSection = () => {
    return (
        <section className='px-3 py-6 sm:px-4 lg:px-6'>
            <div className='mx-auto max-w-350'>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Fresh Picks</p>
                        <h2 className='mt-1 text-2xl font-black text-slate-900'>Popular essentials for today</h2>
                        <p className='mt-1 text-sm font-medium text-slate-500'>Frequently bought items your customers can add quickly.</p>
                    </div>

                    <Link to='/products' className='inline-flex w-fit items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-800'>
                        Browse products
                        <FiArrowRight />
                    </Link>
                </div>

                <div className='mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {freshPicks.map((product) => (
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

export default FreshPicksSection
