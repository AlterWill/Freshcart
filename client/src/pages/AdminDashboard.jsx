import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, TrendingUp, Package, Users, ShoppingCart, RefreshCw, PackagePlus } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalProducts: 0 });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchDashboardData();
    }, [user, navigate]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, ordersRes] = await Promise.all([
                api.get('/admin/dashboard'),
                api.get('/admin/orders')
            ]);
            setStats(statsRes.data);
            setOrders(ordersRes.data);
        } catch (err) {
            console.error('Failed to fetch admin data', err);
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
            // Update local state to reflect change without full refetch
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl shadow-sm border border-red-100 max-w-2xl mx-auto mt-10">
                <div className="bg-red-50 p-6 rounded-full mb-6">
                    <ShieldAlert className="h-16 w-16 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                <p className="text-gray-500 max-w-md">
                    You do not have administrative privileges to view this page. Please return to the homepage or login with an admin account.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-black transition-colors"
                >
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <span className="bg-indigo-100 p-2 rounded-lg"><ShieldAlert className="text-indigo-600 w-8 h-8" /></span>
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2 ml-1">Manage shop operations, inventory, and fulfillment.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/add-product')}
                        className="flex items-center gap-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-indigo-100"
                    >
                        <PackagePlus className="w-4 h-4" /> Create New Item
                    </button>
                    <button
                        onClick={fetchDashboardData}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors bg-white border border-gray-200 hover:border-indigo-300 px-4 py-2.5 rounded-lg shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" /> Refresh Data
                    </button>
                </div>
            </div>

            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow group">
                    <div className="bg-emerald-100 p-4 rounded-xl group-hover:scale-110 group-hover:bg-emerald-200 transition-all">
                        <TrendingUp className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">
                            ${Number(stats.totalRevenue).toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow group">
                    <div className="bg-blue-100 p-4 rounded-xl group-hover:scale-110 group-hover:bg-blue-200 transition-all">
                        <ShoppingCart className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">
                            {stats.totalOrders}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow group">
                    <div className="bg-purple-100 p-4 rounded-xl group-hover:scale-110 group-hover:bg-purple-200 transition-all">
                        <Package className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Products in Catalog</p>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">
                            {stats.totalProducts}
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        Active Orders Fulfillment
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status & Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No orders found in the system.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded text-sm">
                                                #{order.id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{order.user_name}</div>
                                            <div className="text-xs text-gray-500">{order.user_email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            ${Number(order.total_amount).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(order.created_at).toLocaleDateString()}
                                            <br />
                                            <span className="text-xs">{new Date(order.created_at).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className={`appearance-none text-sm font-semibold rounded-lg border py-2 pl-4 pr-10 focus:outline-none focus:ring-2 cursor-pointer transition-all CustomSelectIcon ${order.status === 'Pending' ? 'bg-amber-50 border-amber-200 text-amber-700 focus:ring-amber-500' :
                                                            order.status === 'Packed' ? 'bg-blue-50 border-blue-200 text-blue-700 focus:ring-blue-500' :
                                                                order.status === 'Out for delivery' ? 'bg-purple-50 border-purple-200 text-purple-700 focus:ring-purple-500' :
                                                                    'bg-green-50 border-green-200 text-green-700 focus:ring-green-500'
                                                        }`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Packed">Packed</option>
                                                    <option value="Out for delivery">Out for delivery</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                                {/* Hidden arrow provided by css, fallback visual cue below */}
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
