import { Link } from 'react-router-dom'
import PageShell from '../../../shared/layout/PageShell'

const NotFoundPage = () => (
    <PageShell>
        <main className='px-3 py-10 sm:px-4 lg:px-6'>
            <section className='mx-auto max-w-xl rounded-[30px] border border-emerald-100 bg-white p-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>404</p>
                <h1 className='mt-2 text-3xl font-black text-slate-900'>Page not found</h1>
                <p className='mt-2 text-sm font-semibold text-slate-500'>The page you opened is not available in this demo yet.</p>
                <Link to='/' className='mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white'>Go home</Link>
            </section>
        </main>
    </PageShell>
)

export default NotFoundPage
