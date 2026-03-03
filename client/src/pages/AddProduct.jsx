import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackagePlus, ArrowLeft, Image, Tag, DollarSign, Database, FileText, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category_id: '',
        description: '',
        image_url: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchCategories();
    }, [user, navigate]);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/products/categories');
            setCategories(res.data);
            if (res.data.length > 0) {
                setFormData(prev => ({ ...prev, category_id: res.data[0].id }));
            }
        } catch (err) {
            console.error('Failed to fetch categories', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/admin/products', formData);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/admin');
            }, 2000);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add product');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-indigo-600 px-8 py-6 text-white">
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <PackagePlus className="w-8 h-8" />
                        Add New Product
                    </h1>
                    <p className="text-indigo-100 mt-1 opacity-90">Expand your inventory with fresh items.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {success && (
                        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center gap-3 animate-in slide-in-from-top-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Product added successfully! Redirecting...
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-gray-400" /> Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Organic Strawberries"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none border"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-400" /> Category
                            </label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none border"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-gray-400" /> Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none border"
                            />
                        </div>

                        {/* Stock */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-400" /> Initial Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                required
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="e.g. 50"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none border"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Image className="w-4 h-4 text-gray-400" /> Image URL
                        </label>
                        <input
                            type="url"
                            name="image_url"
                            required
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none border"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" /> Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell customers about the product..."
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none border resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Product...' : 'Publish Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
