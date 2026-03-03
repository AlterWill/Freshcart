import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, loading } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% tax
    const deliveryFee = subtotal > 50 ? 0 : 5.99; // Free delivery over $50
    const total = subtotal + tax + deliveryFee;

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <div className="bg-gray-100 p-6 rounded-full mb-6">
                    <ShoppingBag className="h-16 w-16 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    You need to be logged in to view your shopping cart and place orders.
                </p>
                <Link
                    to="/login"
                    className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors shadow-sm"
                >
                    Sign in to continue
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <ShoppingBag className="text-green-600" />
                Your Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                    <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="h-10 w-10 text-gray-300" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Looks like you haven't added anything to your cart yet. Let's find some fresh groceries!
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors shadow-sm"
                    >
                        Start Shopping <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="flex-grow lg:w-2/3 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:shadow-md transition-shadow">
                                <div className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                                    <img
                                        src={item.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300'}
                                        alt={item.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between h-full min-h-[120px]">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {item.name}
                                            </h3>
                                            <p className="text-lg font-bold text-green-600">
                                                ${Number(item.price).toFixed(2)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            title="Remove item"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="p-2 text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors disabled:opacity-50"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-4 py-1 font-medium text-gray-900 min-w-[3rem] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 text-gray-600 hover:bg-gray-200 rounded-r-lg transition-colors"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 mb-1">Total</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Form */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 text-gray-600">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <p>Subtotal ({cartItems.length} items)</p>
                                    <p className="font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <p>Delivery Fee</p>
                                    <p className="font-medium text-gray-900">
                                        {deliveryFee === 0 ? <span className="text-green-600 font-bold tracking-wide text-sm bg-green-50 px-2 py-1 rounded-md">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <p>Estimated Tax (5%)</p>
                                    <p className="font-medium text-gray-900">${tax.toFixed(2)}</p>
                                </div>

                                <div className="flex justify-between items-center pt-4 pb-2">
                                    <p className="text-lg font-semibold text-gray-900">Total Amount</p>
                                    <p className="text-2xl font-bold text-green-600">${total.toFixed(2)}</p>
                                </div>
                            </div>

                            {deliveryFee > 0 && (
                                <p className="text-sm text-amber-600 mt-4 mb-6 bg-amber-50 p-3 rounded-lg flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 block shrink-0"></span>
                                    Add ${(50 - subtotal).toFixed(2)} more to your cart for free delivery!
                                </p>
                            )}

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full mt-6 bg-green-600 text-white py-4 px-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md shadow-green-200 flex items-center justify-center gap-2 text-lg group"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
