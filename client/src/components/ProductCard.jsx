import React, { useContext, useState } from 'react';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product.id);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="aspect-square w-full relative bg-gray-50 overflow-hidden">
                <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 left-2 bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Only {product.stock} left
                    </span>
                )}
                {product.stock === 0 && (
                    <span className="absolute top-2 left-2 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Out of stock
                    </span>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                        {product.name}
                    </h3>
                    <span className="text-lg font-bold text-green-600 shrink-0">
                        ${Number(product.price).toFixed(2)}
                    </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                    {product.description || 'Fresh and high-quality grocery item from our carefully selected suppliers. Perfect for your daily needs.'}
                </p>

                <button
                    onClick={handleAdd}
                    disabled={product.stock === 0 || added}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${product.stock === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : added
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-sm'
                        }`}
                >
                    {added ? (
                        <>
                            <Check className="w-5 h-5" />
                            Added
                        </>
                    ) : product.stock === 0 ? (
                        'Out of Stock'
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
