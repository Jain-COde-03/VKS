import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi'
import Header from '../../navigation/components/Header'
import Navbar from '../../navigation/components/Navbar'
import { useAppContext } from '../../../hooks'

const CartPage = () => {
    const { cartItems, cartSubtotal, updateCartItem, removeFromCart } = useAppContext()
    const deliveryFee = cartSubtotal > 499 || cartSubtotal === 0 ? 0 : 30
    const total = cartSubtotal + deliveryFee

    return (
        <div className='min-h-screen bg-[linear-gradient(180deg,#f7fff8_0%,#ffffff_42%)]'>
            <Header />
            <Navbar />

            <main className='px-3 py-6 sm:px-4 lg:px-6'>
                <div className='mx-auto grid max-w-350 gap-5 lg:grid-cols-[1fr_22rem]'>
                    <section className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]'>
                        <div className='flex items-center justify-between gap-3'>
                            <div>
                                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Cart</p>
                                <h1 className='mt-1 text-3xl font-black text-slate-900'>Your basket</h1>
                            </div>
                            <FiShoppingBag className='text-3xl text-emerald-600' />
                        </div>

                        {cartItems.length > 0 ? (
                            <div className='mt-5 space-y-3'>
                                {cartItems.map((item) => (
                                    <article key={item.id} className='grid gap-4 rounded-3xl border border-emerald-100 bg-emerald-50/40 p-3 sm:grid-cols-[5rem_1fr_auto] sm:items-center'>
                                        <img src={item.imageSrc} alt={item.title} className='h-20 w-20 rounded-2xl bg-white object-contain p-2' />
                                        <div>
                                            <h2 className='text-base font-black text-slate-900'>{item.title}</h2>
                                            <p className='mt-1 text-sm font-semibold text-slate-500'>{item.unit}</p>
                                            <p className='mt-2 text-lg font-black text-slate-900'>Rs {item.price * item.quantity}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <button type='button' onClick={() => updateCartItem(item.id, item.quantity - 1)} className='flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm'>
                                                <FiMinus />
                                            </button>
                                            <span className='min-w-6 text-center text-sm font-black text-slate-800'>{item.quantity}</span>
                                            <button type='button' onClick={() => updateCartItem(item.id, item.quantity + 1)} className='flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm'>
                                                <FiPlus />
                                            </button>
                                            <button type='button' onClick={() => removeFromCart(item.id)} className='ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600'>
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className='mt-8 rounded-[28px] border border-dashed border-emerald-200 p-8 text-center'>
                                <h2 className='text-xl font-black text-slate-900'>Your cart is empty</h2>
                                <p className='mt-2 text-sm font-medium text-slate-500'>Add fresh picks from the products page.</p>
                                <Link to='/products' className='mt-5 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white'>Shop products</Link>
                            </div>
                        )}
                    </section>

                    <aside className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] lg:sticky lg:top-5'>
                        <h2 className='text-xl font-black text-slate-900'>Order summary</h2>
                        <div className='mt-5 space-y-3 text-sm font-semibold text-slate-600'>
                            <div className='flex justify-between'><span>Subtotal</span><span>Rs {cartSubtotal}</span></div>
                            <div className='flex justify-between'><span>Delivery</span><span>{deliveryFee ? `Rs ${deliveryFee}` : 'Free'}</span></div>
                            <div className='border-t border-emerald-100 pt-3 text-lg font-black text-slate-900 flex justify-between'><span>Total</span><span>Rs {total}</span></div>
                        </div>
                        <Link to='/checkout' className={`mt-6 flex w-full justify-center rounded-full px-5 py-3 text-sm font-black text-white ${cartItems.length ? 'bg-emerald-600 hover:bg-emerald-700' : 'pointer-events-none bg-slate-300'}`}>
                            Continue to checkout
                        </Link>
                    </aside>
                </div>
            </main>
        </div>
    )
}

export default CartPage
