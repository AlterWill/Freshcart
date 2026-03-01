import React, { useContext } from 'react';
import { Plus } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden p-4">
                <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'}
                    alt={product.name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <div className="text-xs text-gray-500 mb-1 font-medium">{product.category_name}</div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2 truncate" title={product.name}>{product.name}</h3>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900">₹{parseFloat(product.price).toFixed(2)}</span>
                        {product.stock < 10 && product.stock > 0 && (
                            <span className="text-xs text-red-500 font-medium capitalize">Only {product.stock} left</span>
                        )}
                        {product.stock === 0 && (
                            <span className="text-xs text-red-500 font-medium capitalize">Out of stock</span>
                        )}
                    </div>

                    <button
                        onClick={() => addToCart(product.id, 1)}
                        disabled={product.stock === 0}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${product.stock === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                            }`}
                        title="Add to cart"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
