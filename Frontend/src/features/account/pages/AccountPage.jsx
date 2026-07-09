import { Link } from 'react-router-dom'
import { FiMapPin, FiPackage, FiUser } from 'react-icons/fi'
import PageShell from '../../../shared/layout/PageShell'
import { addresses } from '../../../data'
import API from '../../../services/api'
import { useAppContext } from '../../../hooks'

const AccountPage = () => {
    const { user } = useAppContext()
    const account = user || { id: 'guest', name: 'Guest shopper', email: 'Not signed in', phone: 'Login to save your profile' }
    const userAddresses = addresses.filter((address) => !user || address.user === user.id)
    const [userOrders, setUserOrders] = React.useState([])

    React.useEffect(() => {
        const loadOrders = async () => {
            if (!user) return
            try {
                const res = await API.get('/orders')
                setUserOrders(res.data.orders || [])
            } catch (err) {
                // ignore
            }
        }
        loadOrders()
    }, [user])

    return (
        <PageShell>
            <main className='px-3 py-6 sm:px-4 lg:px-6'>
                <div className='mx-auto grid max-w-350 gap-5 lg:grid-cols-[22rem_1fr]'>
                    <aside className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]'>
                        <FiUser className='text-3xl text-emerald-600' />
                        <h1 className='mt-3 text-3xl font-black text-slate-900'>{account.name}</h1>
                        <p className='mt-2 text-sm font-semibold text-slate-500'>{account.email}</p>
                        <p className='mt-1 text-sm font-semibold text-slate-500'>{account.phone}</p>
                        {!user && <Link to='/auth/login' className='mt-5 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white'>Login</Link>}
                    </aside>

                    <section className='space-y-5'>
                        <div className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]'>
                            <div className='flex items-center gap-2'>
                                <FiPackage className='text-emerald-600' />
                                <h2 className='text-2xl font-black text-slate-900'>Recent orders</h2>
                            </div>
                            <div className='mt-4 space-y-3'>
                                {userOrders.map((order) => (
                                    <article key={order.id} className='rounded-3xl border border-emerald-100 bg-emerald-50/40 p-4'>
                                        <div className='flex flex-wrap items-center justify-between gap-3'>
                                            <div>
                                                <p className='font-black text-slate-900'>{order.orderNumber}</p>
                                                <p className='text-sm font-semibold capitalize text-slate-500'>{order.orderStatus} · {order.paymentStatus}</p>
                                            </div>
                                            <p className='text-lg font-black text-slate-900'>Rs {order.totalAmount}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]'>
                            <div className='flex items-center gap-2'>
                                <FiMapPin className='text-emerald-600' />
                                <h2 className='text-2xl font-black text-slate-900'>Saved addresses</h2>
                            </div>
                            <div className='mt-4 grid gap-3 md:grid-cols-2'>
                                {userAddresses.map((address) => (
                                    <article key={address.id} className='rounded-3xl border border-emerald-100 bg-white p-4'>
                                        <p className='font-black text-slate-900'>{address.label}</p>
                                        <p className='mt-2 text-sm font-semibold leading-6 text-slate-500'>{address.addressLine1}, {address.city}, {address.state} {address.pincode}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </PageShell>
    )
}

export default AccountPage
