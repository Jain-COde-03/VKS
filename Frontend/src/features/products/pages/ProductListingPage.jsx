import { useMemo, useState } from 'react'
import { FiRefreshCw, FiSearch, FiSliders, FiTag } from 'react-icons/fi'
import Header from '../../navigation/components/Header'
import Navbar from '../../navigation/components/Navbar'
import ProductCard from '../../../shared/ui/ProductCard'
import Search from '../../../shared/ui/Search'
import ProductFilters from '../components/ProductFilters'
import { categories, products } from '../../../data'

const categoryOptions = ['All', ...categories.filter((category) => category.isActive).map((category) => category.name)]
const totalSavings = products.reduce((total, product) => total + Math.max(0, product.originalPrice - product.price), 0)
const inStockProducts = products.filter((product) => product.stock > 0).length
const discountedProducts = products.filter((product) => product.discountLabel).length

const ProductListingPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('popular')
    const [searchQuery, setSearchQuery] = useState('')

    const categoryCounts = useMemo(() => {
        return categoryOptions.reduce((counts, category) => {
            counts[category] = category === 'All'
                ? products.length
                : products.filter((product) => product.category === category).length

            return counts
        }, {})
    }, [])

    const filteredProducts = useMemo(() => {
        const categoryProducts = selectedCategory === 'All'
            ? products
            : products.filter((product) => product.category === selectedCategory)

        const searchedProducts = categoryProducts.filter((product) => {
            const query = searchQuery.trim().toLowerCase()
            if (!query) return true

            return [
                product.title,
                product.brand,
                product.category,
                product.unit,
                ...product.tags,
            ].some((value) => value.toLowerCase().includes(query))
        })

        return [...searchedProducts].sort((first, second) => {
            if (sortBy === 'price-low') return first.price - second.price
            if (sortBy === 'price-high') return second.price - first.price
            if (sortBy === 'rating') return second.rating - first.rating

            return second.id - first.id
        })
    }, [selectedCategory, sortBy, searchQuery])

    const resetFilters = () => {
        setSelectedCategory('All')
        setSortBy('popular')
        setSearchQuery('')
    }

    return (
        <div className='min-h-screen bg-[linear-gradient(180deg,#f7fff8_0%,#ffffff_42%)]'>
            <Header />
            <Navbar />

            <main className='px-3 py-6 sm:px-4 lg:px-6'>
                <div className='mx-auto max-w-350'>
                    <div className='rounded-[30px] border border-emerald-100 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-6'>
                        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                            <div>
                                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>All Products</p>
                                <h1 className='mt-1 text-3xl font-black text-slate-900'>Shop fresh groceries</h1>
                                <p className='mt-2 text-sm font-medium text-slate-500'>
                                    Browse fresh produce, pantry staples, and daily essentials in one place.
                                </p>
                            </div>

                            <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[32rem]'>
                                <div className='rounded-2xl bg-emerald-50 p-3'>
                                    <p className='text-xs font-bold uppercase tracking-[0.14em] text-emerald-600'>Products</p>
                                    <p className='mt-1 text-xl font-black text-slate-900'>{products.length}</p>
                                </div>
                                <div className='rounded-2xl bg-amber-50 p-3'>
                                    <p className='text-xs font-bold uppercase tracking-[0.14em] text-amber-600'>Offers</p>
                                    <p className='mt-1 text-xl font-black text-slate-900'>{discountedProducts}</p>
                                </div>
                                <div className='rounded-2xl bg-sky-50 p-3'>
                                    <p className='text-xs font-bold uppercase tracking-[0.14em] text-sky-600'>In stock</p>
                                    <p className='mt-1 text-xl font-black text-slate-900'>{inStockProducts}</p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 grid gap-3 lg:grid-cols-[1fr_16rem_auto] lg:items-end'>
                            <div>
                                <p className='mb-2 text-sm font-bold text-slate-700'>Search products</p>
                                <Search
                                    width='w-full'
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder='Search by product, brand, tag, or category'
                                />
                            </div>

                            <label className='flex w-full flex-col gap-2 text-sm font-bold text-slate-700'>
                                Sort by
                                <select
                                    value={sortBy}
                                    onChange={(event) => setSortBy(event.target.value)}
                                    className='rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-colors focus:border-emerald-400'
                                >
                                    <option value='popular'>Popular</option>
                                    <option value='rating'>Highest rated</option>
                                    <option value='price-low'>Price: low to high</option>
                                    <option value='price-high'>Price: high to low</option>
                                </select>
                            </label>

                            <button
                                type='button'
                                onClick={resetFilters}
                                className='inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-black text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50'
                            >
                                <FiRefreshCw />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className='mt-5 grid gap-5 lg:grid-cols-[250px_1fr] lg:items-start'>
                        <ProductFilters
                            categories={categoryOptions}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            categoryCounts={categoryCounts}
                        />

                        <section>
                            <div className='mb-4 flex flex-col gap-3 rounded-[24px] border border-emerald-100 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between'>
                                <div>
                                    <p className='text-sm font-bold text-slate-600'>
                                        Showing <span className='text-slate-900'>{filteredProducts.length}</span> items
                                    </p>
                                    <p className='mt-1 text-xs font-semibold text-slate-400'>Total possible savings: Rs {totalSavings}</p>
                                </div>

                                <div className='flex flex-wrap gap-2'>
                                    <span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700'>
                                        <FiSliders />
                                        {selectedCategory}
                                    </span>
                                    {searchQuery && (
                                        <span className='inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700'>
                                            <FiSearch />
                                            {searchQuery}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {filteredProducts.length > 0 ? (
                                <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                                    {filteredProducts.map((product) => (
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
                            ) : (
                                <div className='rounded-[28px] border border-dashed border-emerald-200 bg-white p-8 text-center shadow-[0_14px_34px_rgba(15,23,42,0.04)]'>
                                    <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700'>
                                        <FiTag className='text-2xl' />
                                    </div>
                                    <h2 className='mt-4 text-xl font-black text-slate-900'>No products found</h2>
                                    <p className='mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500'>
                                        Try another category, clear the search, or reset filters to see all groceries.
                                    </p>
                                    <button
                                        type='button'
                                        onClick={resetFilters}
                                        className='mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-emerald-700'
                                    >
                                        <FiRefreshCw />
                                        Reset filters
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductListingPage
