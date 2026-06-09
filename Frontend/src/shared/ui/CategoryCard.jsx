const CategoryCard = ({ title = 'Fruits & Vegetables', imageSrc = '/images/categories/fruits/thumbnail.png', accentClass = 'from-green-100 via-lime-50 to-white' }) => {
    return (
        <button
            type='button'
            className='group flex min-w-26 flex-col items-center gap-2 rounded-[20px] px-2 py-2.5 transition-all duration-300 hover:-translate-y-0.5'
        >
            <div
                className={`flex h-17 w-17 items-center justify-center rounded-[20px] bg-linear-to-br ${accentClass} shadow-[0_10px_24px_rgba(34,197,94,0.08)] transition-transform duration-300 group-hover:scale-105`}
            >
                <img
                    src={imageSrc}
                    alt={title}
                    height='44'
                    width='44'
                    className='h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-110'
                />
            </div>

            <div className='w-full whitespace-nowrap text-center text-[0.8rem] font-bold tracking-[-0.01em] text-slate-800'>
                {title}
            </div>
        </button>
    )
}

export default CategoryCard
