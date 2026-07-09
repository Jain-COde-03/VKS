import { useEffect, useState, useRef } from 'react'
import { FiCheckCircle, FiPackage, FiTruck } from 'react-icons/fi'
import PageShell from '../../../shared/layout/PageShell'
import { useSearchParams } from 'react-router-dom'
import API from '../../../services/api'

const TrackOrderPage = () => {
    const [searchParams] = useSearchParams()
    const orderNumber = searchParams.get('orderNumber')
    const [order, setOrder] = useState(null)
    const [error, setError] = useState(null)
    const esRef = useRef(null)

    useEffect(() => {
        if (!orderNumber) return

        const fetchOrder = async () => {
            try {
                const res = await API.get(`/orders/${orderNumber}`)
                setOrder(res.data.order)
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to fetch order')
            }
        }

        fetchOrder()

        // Subscribe to SSE stream for real-time updates
        const url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/${orderNumber}/stream`
        try {
            const es = new EventSource(url)
            esRef.current = es
            es.addEventListener('order-updated', (e) => {
                try {
                    const payload = JSON.parse(e.data)
                    setOrder(payload)
                } catch (err) {
                    console.warn('Invalid SSE payload', err)
                }
            })
            es.onerror = () => {
                // ignore errors silently; connection may retry
            }
        } catch (err) {
            console.warn('SSE not available', err)
        }

        return () => {
            if (esRef.current) esRef.current.close()
        }
    }, [orderNumber])

    return (
        <PageShell>
            <main className='px-3 py-6 sm:px-4 lg:px-6'>
                <section className='mx-auto max-w-4xl rounded-[30px] border border-emerald-100 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]'>
                    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600'>Tracking</p>
                    <h1 className='mt-2 text-3xl font-black text-slate-900'>Track your order</h1>
                    {error && <p className='mt-2 text-sm font-semibold text-rose-600'>{error}</p>}
                    {!order && !error && <p className='mt-2 text-sm font-semibold text-slate-500'>Loading order status…</p>}
                    {order && (
                        <>
                            <p className='mt-2 text-sm font-semibold text-slate-500'>Order number: {order.orderNumber}</p>
                            <div className='mt-7 grid gap-3 md:grid-cols-3'>
                                {[
                                    [FiCheckCircle, 'Placed', 'Order confirmed', order.orderStatus === 'placed' || order.orderStatus !== 'cancelled'],
                                    [FiPackage, 'Packed', 'Fresh items selected', order.orderStatus === 'packed' || order.orderStatus === 'out_for_delivery' || order.orderStatus === 'delivered'],
                                    [FiTruck, 'Delivered', 'Completed successfully', order.orderStatus === 'delivered'],
                                ].map(([Icon, title, detail, active]) => (
                                    <article key={title} className={`rounded-3xl border p-5 ${active ? 'border-emerald-100 bg-emerald-50' : 'border-emerald-100 bg-white'}`}>
                                        <Icon className='text-3xl text-emerald-700' />
                                        <p className='mt-4 font-black text-slate-900'>{title}</p>
                                        <p className='text-sm font-semibold text-slate-500'>{detail}</p>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </main>
        </PageShell>
    )
}

export default TrackOrderPage

