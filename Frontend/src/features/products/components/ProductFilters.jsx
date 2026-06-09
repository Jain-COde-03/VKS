const ProductFilters = ({ categories, selectedCategory, onCategoryChange, categoryCounts }) => {
    return (
        <aside className='rounded-[26px] border border-emerald-100 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] lg:sticky lg:top-5'>
            <div>
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Filters</p>
                <h2 className='mt-1 text-lg font-black text-slate-900'>Categories</h2>
            </div>

            <div className='mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0'>
                {categories.map((category) => (
                    <button
                        key={category}
                        type='button'
                        onClick={() => onCategoryChange(category)}
                        className={`flex shrink-0 items-center justify-between gap-3 rounded-full border px-4 py-2 text-sm font-bold transition-colors lg:w-full lg:text-left ${
                            selectedCategory === category
                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                : 'border-emerald-100 bg-emerald-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-100'
                        }`}
                    >
                        <span>{category}</span>
                        <span className={selectedCategory === category ? 'text-white/80' : 'text-slate-400'}>
                            {categoryCounts[category] || 0}
                        </span>
                    </button>
                ))}
            </div>
        </aside>
    )
}

export default ProductFilters
