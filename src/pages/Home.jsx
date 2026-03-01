import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/products/categories');
                setCategories(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // simple debounce could be implemented, but direct is fine for now
                const res = await api.get('/products', {
                    params: { keyword, category, sort }
                });
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };

        // rudimentary debounce
        const timer = setTimeout(fetchProducts, 300);
        return () => clearTimeout(timer);
    }, [keyword, category, sort]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">

                <div className="relative w-full md:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for groceries..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>

                <div className="w-full md:w-auto flex gap-4">
                    <select
                        className="block w-full pl-3 pr-10 py-3 text-base border-gray-200 border rounded-xl focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <select
                        className="block w-full pl-3 pr-10 py-3 text-base border-gray-200 border rounded-xl focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Default Sort</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
