import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Please login to view your cart</h2>
                <Link to="/login" className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">Login</Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/" className="px-6 py-3 bg-primary text-white rounded-xl font-medium shadow-md hover:bg-emerald-600 transition-transform hover:-translate-y-1">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <ul className="divide-y divide-gray-100 p-2">
                            {cartItems.map((item) => (
                                <li key={item.cart_item_id} className="flex items-center py-6 px-4 hover:bg-gray-50 transition-colors rounded-xl">
                                    <img src={item.image_url} alt={item.name} className="h-24 w-24 object-contain rounded-lg bg-gray-50 p-2 border border-gray-100" />
                                    <div className="ml-6 flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                                <p className="mt-1 text-sm text-gray-500">₹{parseFloat(item.price).toFixed(2)}/unit</p>
                                            </div>
                                            <p className="text-lg font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                                <button
                                                    onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-4 font-semibold text-gray-900 w-12 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.cart_item_id)}
                                                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
                        <div className="space-y-4 text-gray-600 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span className="font-medium text-gray-900">₹{totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-medium text-gray-900">₹{totalAmount > 500 ? '0.00' : '50.00'}</span>
                            </div>
                            {totalAmount > 500 && (
                                <p className="text-xs text-primary bg-primary/10 py-1 px-2 rounded font-medium inline-block">Free delivery above ₹500 applied!</p>
                            )}
                        </div>
                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-black text-primary">₹{(totalAmount + (totalAmount > 500 ? 0 : 50)).toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-primary text-white py-3.5 px-4 rounded-xl shadow-md shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all flex justify-center items-center font-bold text-lg"
                        >
                            Proceed to Checkout
                            <ArrowRight className="ml-2" size={20} />
                        </button>
                        <div className="mt-4 flex items-center justify-center text-gray-400 text-sm gap-2">
                            <CreditCard size={16} /> Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
