import { FiStar } from 'react-icons/fi'
import { addresses, reviews, users } from '../../../data'

const customerReviews = reviews.map((review) => {
    const user = users.find((item) => item.id === review.user)
    const address = addresses.find((item) => item.user === review.user && item.isDefault)

    return {
        ...review,
        name: user?.name || 'VKS Customer',
        location: address?.city || 'India',
    }
})
const averageRating = reviews.length
    ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

const CustomerReviewsSection = () => {
    return (
        <section className='px-3 pb-8 pt-6 sm:px-4 lg:px-6'>
            <div className='mx-auto max-w-350'>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Customer Reviews</p>
                        <h2 className='mt-1 text-2xl font-black text-slate-900'>Loved by everyday shoppers</h2>
                        <p className='mt-1 text-sm font-medium text-slate-500'>Simple feedback from people ordering daily essentials.</p>
                    </div>

                    <div className='inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700'>
                        <FiStar className='fill-current' />
                        {averageRating} average rating
                    </div>
                </div>

                <div className='mt-5 grid gap-4 md:grid-cols-3'>
                    {customerReviews.map((review) => (
                        <article
                            key={review.id}
                            className='rounded-[24px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]'
                        >
                            <div className='flex items-center gap-1 text-amber-400'>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <FiStar key={index} className={index < review.rating ? 'fill-current' : 'text-slate-200'} />
                                ))}
                            </div>

                            <p className='mt-4 text-sm font-medium leading-6 text-slate-600'>"{review.comment}"</p>

                            <div className='mt-5 border-t border-slate-100 pt-4'>
                                <h3 className='text-base font-black text-slate-900'>{review.name}</h3>
                                <p className='mt-0.5 text-sm font-medium text-slate-500'>{review.location}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CustomerReviewsSection
