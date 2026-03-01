import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders/history');
                setOrders(res.data);
            } catch (err) {
                console.error('Failed to fetch orders', err);
            }
            setLoading(false);
        };
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock className="text-amber-500" size={20} />;
            case 'Packed': return <Package className="text-blue-500" size={20} />;
            case 'Out for delivery': return <Truck className="text-purple-500" size={20} />;
            case 'Delivered': return <CheckCircle className="text-primary" size={20} />;
            default: return <Clock className="text-gray-500" size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-800';
            case 'Packed': return 'bg-blue-100 text-blue-800';
            case 'Out for delivery': return 'bg-purple-100 text-purple-800';
            case 'Delivered': return 'bg-emerald-100 text-emerald-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Please login to view your orders</h2>
                <Link to="/login" className="px-6 py-2 bg-primary text-white rounded-lg font-medium">Login</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {message && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center">
                    <CheckCircle className="mr-3" />
                    <span className="font-medium">{message}</span>
                </div>
            )}

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">My Orders</h1>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <Package className="mx-auto text-gray-300 mb-4" size={64} />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't placed an order yet.</p>
                    <Link to="/" className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">Start Shopping</Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: <span className="font-mono font-medium text-gray-900">#{order.id.toString().padStart(6, '0')}</span></p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(order.created_at).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="text-lg font-bold text-gray-900">₹{parseFloat(order.total_amount).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <ul className="divide-y divide-gray-50">
                                    {order.items?.map((item, idx) => (
                                        <li key={idx} className="py-4 flex items-center">
                                            <img src={item.image_url} alt={item.name} className="h-16 w-16 object-contain rounded-lg border border-gray-100 p-1" />
                                            <div className="ml-4 flex-1">
                                                <p className="font-semibold text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-500 tracking-wide mt-1">₹{item.price} x {item.quantity}</p>
                                            </div>
                                            <div className="font-medium text-gray-900">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
