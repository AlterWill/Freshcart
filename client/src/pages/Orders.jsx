import React, { useState, useEffect, useContext } from 'react';
import { Package, Clock, Truck, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

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
            case 'Pending': return <Clock className="w-5 h-5 text-amber-500" />;
            case 'Packed': return <Package className="w-5 h-5 text-blue-500" />;
            case 'Out for delivery': return <Truck className="w-5 h-5 text-purple-500" />;
            case 'Delivered': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            default: return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Packed': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Out for delivery': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100 flex items-center gap-3">
                <Package className="text-green-600" /> My Orders
            </h1>

            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                    <div className="bg-gray-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="h-8 w-8 text-gray-300" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        You haven't placed any orders yet. Explore our catalog and start shopping!
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                        Order #{order.id}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(order.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </div>
                            </div>

                            <div className="p-6">
                                <ul className="divide-y divide-gray-100 mb-6">
                                    {order.items?.map((item, index) => (
                                        <li key={index} className="py-4 flex justify-between items-center sm:items-start group">
                                            <div className="flex-1 pr-6">
                                                <p className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                                                    {item.name}
                                                </p>
                                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                                    <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-700">
                                                        Qty: {item.quantity}
                                                    </span>
                                                    <span className="hidden sm:inline text-gray-300">|</span>
                                                    <span className="hidden sm:inline">
                                                        ${Number(item.price).toFixed(2)} each
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="font-bold text-gray-900 text-right shrink-0 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 mt-1 sm:mt-0">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-gray-100 pt-6 flex justify-between items-center relative">
                                    <div className="absolute top-0 right-0 h-10 w-10 border-t border-r border-gray-100 opacity-50 transform -translate-y-1/2 translate-x-1/2 rotate-45"></div>
                                    <div className="absolute top-0 left-0 h-10 w-10 border-t border-l border-gray-100 opacity-50 transform -translate-y-1/2 -translate-x-1/2 -rotate-45"></div>
                                    <p className="text-gray-500 font-medium">Total Amount</p>
                                    <p className="text-2xl font-black text-green-600 tracking-tight">
                                        ${Number(order.total_amount).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
