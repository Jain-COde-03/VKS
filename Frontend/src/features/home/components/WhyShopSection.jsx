import { FiClock, FiRefreshCw, FiShield, FiTruck } from 'react-icons/fi'

const features = [
    {
        title: 'Fast delivery',
        text: 'Get daily essentials delivered quickly to your doorstep.',
        icon: FiTruck,
    },
    {
        title: 'Fresh quality',
        text: 'Products are carefully picked and checked before delivery.',
        icon: FiShield,
    },
    {
        title: 'Easy returns',
        text: 'Return damaged or wrong items without stress.',
        icon: FiRefreshCw,
    },
    {
        title: 'Flexible timing',
        text: 'Choose delivery slots that match your schedule.',
        icon: FiClock,
    },
]

const WhyShopSection = () => {
    return (
        <section className='px-3 py-6 sm:px-4 lg:px-6'>
            <div className='mx-auto max-w-350'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Why Shop With Us</p>
                    <h2 className='mt-1 text-2xl font-black text-slate-900'>Grocery shopping made easier</h2>
                    <p className='mt-1 text-sm font-medium text-slate-500'>Simple services that make every order smoother.</p>
                </div>

                <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {features.map((feature) => {
                        const Icon = feature.icon

                        return (
                            <div
                                key={feature.title}
                                className='rounded-[24px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1'
                            >
                                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700'>
                                    <Icon className='text-xl' />
                                </div>

                                <h3 className='mt-4 text-base font-black text-slate-900'>{feature.title}</h3>

                                <p className='mt-2 text-sm font-medium leading-6 text-slate-500'>{feature.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default WhyShopSection
