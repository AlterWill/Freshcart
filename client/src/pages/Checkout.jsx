import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, CreditCard, Home, Phone, PackageCheck, Store } from 'lucide-react';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, fetchCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({ address: '', city: '', pincode: '' });
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (cartItems.length === 0 && !orderSuccess) {
            navigate('/cart');
            return;
        }
        fetchAddresses();
    }, [user, cartItems, navigate, orderSuccess]);

    const fetchAddresses = async () => {
        try {
            const res = await api.get('/addresses');
            setAddresses(res.data);
            if (res.data.length > 0 && !selectedAddress) {
                setSelectedAddress(res.data[0].id);
            }
        } catch (err) {
            console.error('Failed to fetch addresses', err);
        }
        setLoading(false);
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            await api.post('/addresses', newAddress);
            setNewAddress({ address: '', city: '', pincode: '' });
            setIsAddingAddress(false);
            fetchAddresses();
        } catch (err) {
            console.error('Failed to add address', err);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address');
            return;
        }
        setPlacingOrder(true);
        try {
            const res = await api.post('/orders/place', { addressId: selectedAddress });
            if (res.status === 201) {
                setOrderSuccess(true);
                fetchCart(); // Clear local cart context
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to place order');
        }
        setPlacingOrder(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (orderSuccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50 shadow-inner">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Order Placed Successfully!
                </h2>
                <p className="text-lg text-gray-500 max-w-md mb-8">
                    Thank you for shopping with SmartMart. Your order has been received and is currently being processed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <button
                        onClick={() => navigate('/orders')}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3.5 rounded-xl font-medium hover:bg-green-700 transition-all shadow-md shadow-green-200"
                    >
                        <PackageCheck className="h-5 w-5" /> View Orders
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                        <Store className="h-5 w-5 text-gray-400" /> Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const deliveryFee = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + tax + deliveryFee;

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center text-sm text-gray-500 mb-8 overflow-hidden">
                <span className="flex items-center hover:text-green-600 cursor-pointer transition-colors" onClick={() => navigate('/cart')}>Cart</span>
                <ChevronRight className="h-4 w-4 mx-2 shrink-0" />
                <span className="font-semibold text-gray-900 flex items-center">Checkout</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                Secure Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Addresses & Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Delivery Address Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Home className="h-5 w-5 text-gray-400" /> Delivery Address
                        </h2>

                        {addresses.length === 0 ? (
                            <p className="text-gray-500 mb-6 bg-yellow-50 p-4 rounded-xl text-sm border border-yellow-100 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span>
                                You don't have any saved addresses. Please add one to continue.
                            </p>
                        ) : (
                            <div className="space-y-4 mb-6">
                                {addresses.map((addr) => (
                                    <label
                                        key={addr.id}
                                        className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${selectedAddress === addr.id
                                                ? 'border-green-500 bg-green-50 ring-1 ring-green-500'
                                                : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="address"
                                            value={addr.id}
                                            checked={selectedAddress === addr.id}
                                            onChange={() => setSelectedAddress(addr.id)}
                                            className="mt-1 mr-4 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 mb-1">{addr.address}</p>
                                            <p className="text-gray-500 text-sm flex items-center gap-4">
                                                <span>{addr.city}</span>
                                                <span className="text-gray-300">|</span>
                                                <span>{addr.pincode}</span>
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}

                        {!isAddingAddress ? (
                            <button
                                onClick={() => setIsAddingAddress(true)}
                                className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1 transition-colors bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100"
                            >
                                + Add new delivery address
                            </button>
                        ) : (
                            <form onSubmit={handleAddAddress} className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 mt-4 relative overflow-hidden">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">New Address</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                                        value={newAddress.address}
                                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                        placeholder="123 Main St, Apt 4B"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                                            value={newAddress.city}
                                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            placeholder="Mumbai"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Pincode</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                                            value={newAddress.pincode}
                                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                            placeholder="400001"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingAddress(false)}
                                        className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-gray-900 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-black transition-colors shadow-sm"
                                    >
                                        Save Address
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Payment Method Section (Mock) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-75">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-gray-400" /> Payment Method
                        </h2>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center gap-4 cursor-not-allowed">
                            <input type="radio" checked readOnly className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300" />
                            <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-1 text-sm">Cash on Delivery (COD)</p>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Pay with cash upon delivery of your items.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm py-2">
                                    <div className="flex-1 pr-4">
                                        <p className="text-gray-900 font-medium truncate">{item.name}</p>
                                        <p className="text-gray-500 text-xs mt-0.5">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-gray-900 text-right whitespace-nowrap">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                <p>Subtotal</p>
                                <p className="font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <p>Delivery Fee</p>
                                <p className="font-medium text-gray-900">
                                    {deliveryFee === 0 ? <span className="text-green-600 text-xs font-bold px-2 py-0.5 bg-green-50 rounded">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                                </p>
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <p>Taxes (5%)</p>
                                <p className="font-medium text-gray-900">${tax.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200 border-dashed">
                                <p className="text-base font-bold text-gray-900">Total to Pay</p>
                                <p className="text-xl font-bold text-green-600">${total.toFixed(2)}</p>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={placingOrder || !selectedAddress || cartItems.length === 0}
                            className={`w-full mt-8 py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${placingOrder || !selectedAddress || cartItems.length === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                                    : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200 hover:-translate-y-0.5'
                                }`}
                        >
                            {placingOrder ? (
                                <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5 shrink-0" /> Confirm Order
                                </>
                            )}
                        </button>

                        {!selectedAddress && (
                            <p className="text-xs text-red-500 text-center mt-3 font-medium bg-red-50 py-2 rounded-lg">
                                Please select a delivery address to place order
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
