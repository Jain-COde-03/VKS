import { useEffect, useState } from 'react'
import API from '../../../services/api'

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminDashboard() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const resp = await API.get('/admin/orders')
            setOrders(resp.data.orders || [])
        } catch (err) {
            console.error(err)
            alert('Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const updateStatus = async (orderNumber, updates) => {
        try {
            const resp = await API.patch(`/admin/orders/${orderNumber}`, updates)
            setOrders((prev) => prev.map((o) => (o.orderNumber === orderNumber ? resp.data.order : o)))
        } catch (err) {
            console.error(err)
            alert('Failed to update order')
        }
    }

    if (loading) return <div className='p-4'>Loading orders...</div>

    return (
        <div className='p-4'>
            <h2 className='text-2xl mb-4'>Admin — Orders</h2>
            <table className='w-full table-auto border-collapse'>
                <thead>
                    <tr className='text-left'>
                        <th className='border px-2 py-1'>Order#</th>
                        <th className='border px-2 py-1'>Customer</th>
                        <th className='border px-2 py-1'>Total</th>
                        <th className='border px-2 py-1'>Order Status</th>
                        <th className='border px-2 py-1'>Payment</th>
                        <th className='border px-2 py-1'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o) => (
                        <tr key={o._id} className='align-top'>
                            <td className='border px-2 py-1'>{o.orderNumber}</td>
                            <td className='border px-2 py-1'>{o.userName || o.shippingAddress?.name || o.userKey}</td>
                            <td className='border px-2 py-1'>₹{o.total.toFixed(2)}</td>
                            <td className='border px-2 py-1'>
                                <select
                                    value={o.orderStatus}
                                    onChange={(e) => updateStatus(o.orderNumber, { orderStatus: e.target.value })}
                                >
                                    {STATUSES.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className='border px-2 py-1'>
                                <select
                                    value={o.paymentStatus || 'pending'}
                                    onChange={(e) => updateStatus(o.orderNumber, { paymentStatus: e.target.value })}
                                >
                                    <option value='pending'>pending</option>
                                    <option value='paid'>paid</option>
                                    <option value='failed'>failed</option>
                                </select>
                            </td>
                            <td className='border px-2 py-1'>
                                <button
                                    className='bg-blue-600 text-white px-2 py-1 rounded'
                                    onClick={() => navigator.clipboard.writeText(o.orderNumber)}
                                >
                                    Copy Order#
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
