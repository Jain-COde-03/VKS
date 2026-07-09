import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn, FiUserPlus } from 'react-icons/fi'
import PageShell from '../../../shared/layout/PageShell'
import { useAppContext } from '../../../hooks'

const AuthPage = ({ mode = 'login' }) => {
    const isRegister = mode === 'register'
    const navigate = useNavigate()
    const { login, register } = useAppContext()
    const [form, setForm] = useState({
        name: '',
        email: 'dhairya@example.com',
        phone: '',
    })

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (isRegister) {
            register(form)
        } else {
            login(form.email)
        }
        navigate('/account')
    }

    return (
        <PageShell>
            <main className='px-3 py-10 sm:px-4 lg:px-6'>
                <section className='mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1fr_24rem] lg:items-start'>
                    <div className='rounded-[30px] border border-emerald-100 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700'>
                            {isRegister ? <FiUserPlus /> : <FiLogIn />}
                        </div>
                        <p className='mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>{isRegister ? 'Create account' : 'Welcome back'}</p>
                        <h1 className='mt-1 text-3xl font-black text-slate-900'>{isRegister ? 'Register with VKS' : 'Login to VKS'}</h1>
                        <p className='mt-2 text-sm font-semibold leading-6 text-slate-500'>
                            This demo uses local profile data so you can test cart, wishlist, checkout, and account flows without a live backend.
                        </p>

                        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
                            {isRegister && (
                                <>
                                    <label className='block text-sm font-bold text-slate-700'>
                                        Name
                                        <input required value={form.name} onChange={(event) => updateField('name', event.target.value)} className='mt-2 w-full rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 outline-none focus:border-emerald-400' />
                                    </label>
                                    <label className='block text-sm font-bold text-slate-700'>
                                        Phone
                                        <input required value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className='mt-2 w-full rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 outline-none focus:border-emerald-400' />
                                    </label>
                                </>
                            )}
                            <label className='block text-sm font-bold text-slate-700'>
                                Email
                                <input required type='email' value={form.email} onChange={(event) => updateField('email', event.target.value)} className='mt-2 w-full rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 outline-none focus:border-emerald-400' />
                            </label>
                            <button type='submit' className='w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-emerald-700'>
                                {isRegister ? 'Create account' : 'Login'}
                            </button>
                        </form>
                    </div>

                    <aside className='rounded-[30px] border border-emerald-100 bg-emerald-50 p-6'>
                        <h2 className='text-xl font-black text-slate-900'>{isRegister ? 'Already shopping with us?' : 'New to VKS?'}</h2>
                        <p className='mt-2 text-sm font-semibold leading-6 text-slate-600'>
                            Use the demo email dhairya@example.com to load the sample customer, or register to create a local session.
                        </p>
                        <Link to={isRegister ? '/auth/login' : '/auth/register'} className='mt-5 inline-flex rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-black text-emerald-700'>
                            {isRegister ? 'Go to login' : 'Create account'}
                        </Link>
                    </aside>
                </section>
            </main>
        </PageShell>
    )
}

export default AuthPage
