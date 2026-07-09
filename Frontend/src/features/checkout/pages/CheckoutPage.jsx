import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiCreditCard, FiMapPin } from 'react-icons/fi'
import Header from '../../navigation/components/Header'
import Navbar from '../../navigation/components/Navbar'
import { addresses, coupons } from '../../../data'
import { useAppContext } from '../../../hooks'
import API from '../../../services/api'
import loadRazorpay from '../../../utils/loadRazorpay'

const CheckoutPage = () => {    const { cartItems, cartSubtotal, clearCart, user } = useAppContext()
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id)
    const [guestAddress, setGuestAddress] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: '',
    })
    const [error, setError] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('upi')
    const [couponCode, setCouponCode] = useState('')
    const [placedOrder, setPlacedOrder] = useState(null)

    const coupon = coupons.find((item) => item.code === couponCode.trim().toUpperCase() && item.isActive)
    const discount = useMemo(() => {
        if (!coupon || cartSubtotal < coupon.minOrderAmount) return 0
        const rawDiscount = coupon.type === 'percentage' ? Math.round((cartSubtotal * coupon.value) / 100) : coupon.value
        return Math.min(rawDiscount, coupon.maxDiscount)
    }, [cartSubtotal, coupon])

    const deliveryFee = cartSubtotal > 499 || cartSubtotal === 0 ? 0 : 30
    const total = Math.max(0, cartSubtotal + deliveryFee - discount)
    const isGuestAddressComplete = Boolean(
        guestAddress.fullName.trim() &&
        guestAddress.phone.trim() &&
        guestAddress.addressLine1.trim() &&
        guestAddress.city.trim() &&
        guestAddress.state.trim() &&
        guestAddress.pincode.trim()
    )
    const canPlaceOrder = cartItems.length > 0 && (user || isGuestAddressComplete)
    const navigate = useNavigate()

    const updateGuestAddress = (field, value) => {
        setGuestAddress((current) => ({ ...current, [field]: value }))
    }

    const placeOrder = async () => {
        if (!canPlaceOrder) return

        const shippingAddress = user
            ? addresses.find((a) => a.id === selectedAddress) || {}
            : guestAddress

        try {
            // For online payment, create a payment order and open Razorpay
            if (paymentMethod !== 'cod') {
                const amountToPay = total
                const res = await API.post('/payments/create-order', { amount: amountToPay })
                const { order: razorOrder, keyId } = res.data

                const options = {
                    key: keyId,
                    amount: razorOrder.amount,
                    currency: razorOrder.currency,
                    name: 'VKS Store',
                    description: `Order payment for ${new Date().toISOString()}`,
                    order_id: razorOrder.id,
                    handler: async function (response) {
                        try {
                            // verify on server
                            await API.post('/payments/verify', {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            })

                            const orderNumber = await createOrder({ paymentMethod, shippingAddress })
                            setPlacedOrder(orderNumber)
                            clearCart()
                            navigate(`/track?orderNumber=${orderNumber}`)
                        } catch (err) {
                            setError(err.message)
                        }
                    },
                    prefill: { name: user?.name || shippingAddress.fullName, email: user?.email },
                }

                try {
                    await loadRazorpay()
                    if (window.Razorpay) {
                        const rzp = new window.Razorpay(options)
                        rzp.open()
                    } else {
                        setError('Razorpay SDK not available')
                    }
                } catch (err) {
                    setError('Failed to load payment SDK')
                }

                return
            }

            const orderNumber = await createOrder({ paymentMethod, shippingAddress })
            setPlacedOrder(orderNumber)
            clearCart()
            navigate(`/track?orderNumber=${orderNumber}`)
        } catch (err) {
            setError(err.message)
        }
    }

    if (placedOrder) {
        return (
            <div className='min-h-screen bg-[linear-gradient(180deg,#f7fff8_0%,#ffffff_42%)]'>
                <Header />
                <Navbar />
                <main className='px-3 py-10 sm:px-4 lg:px-6'>
                    <div className='mx-auto max-w-2xl rounded-[30px] border border-emerald-100 bg-white p-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                        <FiCheckCircle className='mx-auto text-6xl text-emerald-600' />
                        <h1 className='mt-4 text-3xl font-black text-slate-900'>Order placed</h1>
                        <p className='mt-2 text-sm font-semibold text-slate-500'>Your order number is {placedOrder}.</p>
                        <Link to={`/track?orderNumber=${placedOrder}`} className='mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white'>Track order</Link>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-[linear-gradient(180deg,#f7fff8_0%,#ffffff_42%)]'>
            <Header />
            <Navbar />
            <main className='px-3 py-6 sm:px-4 lg:px-6'>
                <div className='mx-auto grid max-w-350 gap-5 lg:grid-cols-[1fr_22rem]'>
                    <section className='space-y-5'>
                        <div className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]'>
                            <div className='flex items-center gap-2'>
                                <FiMapPin className='text-emerald-600' />
                                <h1 className='text-2xl font-black text-slate-900'>Delivery address</h1>
                            </div>
                            {user ? (
                                <div className='mt-4 grid gap-3 md:grid-cols-2'>
                                    {addresses.map((address) => (
                                        <button key={address.id} type='button' onClick={() => setSelectedAddress(address.id)} className={`rounded-3xl border p-4 text-left transition-colors ${selectedAddress === address.id ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-100 bg-white hover:bg-emerald-50'}`}>
                                            <p className='font-black text-slate-900'>{address.label}</p>
                                            <p className='mt-2 text-sm font-semibold leading-6 text-slate-500'>{address.addressLine1}, {address.city}, {address.state} {address.pincode}</p>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className='mt-4'>
                                    <p className='rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800'>
                                        Login is optional. Enter a delivery address so we can place this order as a guest.
                                    </p>
                                    <div className='mt-4 grid gap-3 md:grid-cols-2'>
                                        {[
                                            ['fullName', 'Full name'],
                                            ['phone', 'Phone number'],
                                            ['addressLine1', 'House / street / landmark'],
                                            ['city', 'City'],
                                            ['state', 'State'],
                                            ['pincode', 'Pincode'],
                                        ].map(([field, label]) => (
                                            <label key={field} className={`text-sm font-bold text-slate-700 ${field === 'addressLine1' ? 'md:col-span-2' : ''}`}>
                                                {label}
                                                <input
                                                    required
                                                    value={guestAddress[field]}
                                                    onChange={(event) => updateGuestAddress(field, event.target.value)}
                                                    className='mt-2 w-full rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-colors focus:border-emerald-400'
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]'>
                            <div className='flex items-center gap-2'>
                                <FiCreditCard className='text-emerald-600' />
                                <h2 className='text-2xl font-black text-slate-900'>Payment</h2>
                            </div>
                            <div className='mt-4 grid gap-3 sm:grid-cols-3'>
                                {['upi', 'card', 'cod'].map((method) => (
                                    <button key={method} type='button' onClick={() => setPaymentMethod(method)} className={`rounded-full border px-4 py-3 text-sm font-black uppercase ${paymentMethod === method ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-emerald-100 bg-emerald-50 text-slate-700'}`}>
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <aside className='rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] lg:sticky lg:top-5'>
                        <h2 className='text-xl font-black text-slate-900'>Checkout</h2>
                        <p className='mt-1 text-sm font-semibold text-slate-500'>{user ? `Ordering as ${user.name}` : 'Guest checkout'}</p>
                        <input value={couponCode} onChange={(event) => setCouponCode(event.target.value)} placeholder='Coupon code' className='mt-5 w-full rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold outline-none focus:border-emerald-400' />
                        <div className='mt-5 space-y-3 text-sm font-semibold text-slate-600'>
                            <div className='flex justify-between'><span>Items</span><span>{cartItems.length}</span></div>
                            <div className='flex justify-between'><span>Subtotal</span><span>Rs {cartSubtotal}</span></div>
                            <div className='flex justify-between'><span>Delivery</span><span>{deliveryFee ? `Rs ${deliveryFee}` : 'Free'}</span></div>
                            <div className='flex justify-between'><span>Discount</span><span>- Rs {discount}</span></div>
                            <div className='border-t border-emerald-100 pt-3 text-lg font-black text-slate-900 flex justify-between'><span>Total</span><span>Rs {total}</span></div>
                        </div>
                        {!user && !isGuestAddressComplete && (
                            <p className='mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700'>
                                Add your delivery address to place this guest order.
                            </p>
                        )}
                        <button type='button' onClick={placeOrder} disabled={!canPlaceOrder} className='mt-6 w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-emerald-700 disabled:bg-slate-300'>
                            Place order
                        </button>
                    </aside>
                </div>
            </main>
        </div>
    )
}

export default CheckoutPage
