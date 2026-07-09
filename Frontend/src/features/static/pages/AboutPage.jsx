import { FiAward, FiClock, FiTruck } from 'react-icons/fi'
import PageShell from '../../../shared/layout/PageShell'

const stats = [
    ['1,200+', 'daily orders'],
    ['45 min', 'average dispatch'],
    ['98%', 'freshness score'],
]

const AboutPage = () => (
    <PageShell>
        <main className='px-3 py-6 sm:px-4 lg:px-6'>
            <section className='mx-auto max-w-350 rounded-[30px] border border-emerald-100 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>About VKS</p>
                <h1 className='mt-2 max-w-3xl text-4xl font-black text-slate-900'>Fresh vegetables, fruits, and kitchen essentials delivered with care.</h1>
                <p className='mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-500'>
                    VKS is built for everyday grocery runs: quick discovery, clear prices, reliable location selection, and a checkout flow that keeps fresh essentials moving.
                </p>
                <div className='mt-8 grid gap-4 md:grid-cols-3'>
                    {[FiTruck, FiClock, FiAward].map((Icon, index) => (
                        <article key={stats[index][1]} className='rounded-3xl border border-emerald-100 bg-emerald-50 p-5'>
                            <Icon className='text-3xl text-emerald-700' />
                            <p className='mt-4 text-2xl font-black text-slate-900'>{stats[index][0]}</p>
                            <p className='text-sm font-bold text-slate-500'>{stats[index][1]}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    </PageShell>
)

export default AboutPage
