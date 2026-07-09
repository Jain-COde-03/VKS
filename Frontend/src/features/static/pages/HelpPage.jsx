import { FiHeadphones, FiMail, FiPhone } from 'react-icons/fi'
import PageShell from '../../../shared/layout/PageShell'

const HelpPage = () => (
    <PageShell>
        <main className='px-3 py-6 sm:px-4 lg:px-6'>
            <section className='mx-auto max-w-4xl rounded-[30px] border border-emerald-100 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                <FiHeadphones className='text-4xl text-emerald-600' />
                <h1 className='mt-4 text-3xl font-black text-slate-900'>Help center</h1>
                <p className='mt-2 text-sm font-semibold leading-6 text-slate-500'>Need help with an order, delivery address, payment, or product freshness? Our support team is available every day from 8:00 AM to 10:00 PM.</p>
                <div className='mt-6 grid gap-4 sm:grid-cols-2'>
                    <article className='rounded-3xl border border-emerald-100 bg-emerald-50 p-5'>
                        <FiPhone className='text-2xl text-emerald-700' />
                        <p className='mt-3 font-black text-slate-900'>+91 1234567890</p>
                        <p className='text-sm font-semibold text-slate-500'>Call for urgent order support.</p>
                    </article>
                    <article className='rounded-3xl border border-emerald-100 bg-emerald-50 p-5'>
                        <FiMail className='text-2xl text-emerald-700' />
                        <p className='mt-3 font-black text-slate-900'>support@vicky.com</p>
                        <p className='text-sm font-semibold text-slate-500'>Email for account and payment queries.</p>
                    </article>
                </div>
            </section>
        </main>
    </PageShell>
)

export default HelpPage
