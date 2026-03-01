import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { TrendingUp, ShoppingBag, Package, AlertOctagon } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchAdminData = async () => {
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
        fetchAdminData();
    }, [user, navigate]);

    const handleStatusUpdate = async (orderId, status) => {
        try {
            await api.put(`/admin/orders/${orderId}/status`, { status });
            // Update local state without full refetch
            setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20 animate-spin"><TrendingUp className="text-primary" /></div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Admin Dashboard</h1>

            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Sales</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">₹{parseFloat(stats.totalSales).toFixed(2)}</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-xl text-primary"><TrendingUp size={24} /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><ShoppingBag size={24} /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalProducts}</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-xl text-purple-600"><Package size={24} /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-red-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Low Stock Alerts</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">{stats.lowStockProducts.length}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-xl text-red-600"><AlertOctagon size={24} /></div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id.toString().padStart(6, '0')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{order.user_name}</div>
                                        <div className="text-sm text-gray-500">{order.user_email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ₹{parseFloat(order.total_amount).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                                                order.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                            className="text-sm border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-1"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Out for delivery">Out for delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
