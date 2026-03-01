import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, MapPin, Search } from 'lucide-react';

const Checkout = () => {
    const { cartItems, fetchCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [showNewAddress, setShowNewAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({ address: '', city: '', pincode: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const finalAmount = totalAmount + (totalAmount > 500 ? 0 : 50);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (cartItems.length === 0) {
            navigate('/cart');
            return;
        }

        const fetchAddresses = async () => {
            try {
                const res = await api.get('/addresses');
                setAddresses(res.data);
                if (res.data.length > 0) {
                    setSelectedAddress(res.data[0].id);
                } else {
                    setShowNewAddress(true);
                }
            } catch (err) {
                console.error('Failed to fetch addresses', err);
            }
        };
        fetchAddresses();
    }, [user, cartItems, navigate]);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/addresses', newAddress);
            setAddresses([...addresses, res.data]);
            setSelectedAddress(res.data.id);
            setShowNewAddress(false);
            setNewAddress({ address: '', city: '', pincode: '' });
        } catch (err) {
            setError('Failed to add address');
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            setError('Please select a delivery address');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/orders/place');
            await fetchCart(); // will clear the local cart because it was cleared in DB
            navigate('/orders', { state: { message: 'Order placed successfully!' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Checkout</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 p-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
                    <MapPin className="mr-2 text-primary" /> Delivery Address
                </h2>

                {error && <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-lg text-sm">{error}</div>}

                {!showNewAddress && addresses.length > 0 && (
                    <div className="space-y-4 relative">
                        {addresses.map((addr) => (
                            <label key={addr.id} className={`flex p-4 border rounded-xl cursor-pointer transition-all ${selectedAddress === addr.id ? 'border-primary ring-1 ring-primary bg-emerald-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="address"
                                    value={addr.id}
                                    checked={selectedAddress === addr.id}
                                    onChange={() => setSelectedAddress(addr.id)}
                                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <div className="ml-4">
                                    <p className="font-medium text-gray-900">{addr.address}</p>
                                    <p className="text-sm text-gray-500 mt-1">{addr.city} - {addr.pincode}</p>
                                </div>
                            </label>
                        ))}
                        <button
                            type="button"
                            onClick={() => setShowNewAddress(true)}
                            className="mt-4 text-sm font-medium text-primary hover:text-emerald-600"
                        >
                            + Add a new address
                        </button>
                    </div>
                )}

                {showNewAddress && (
                    <form onSubmit={handleAddAddress} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-4">Add New Address</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                <textarea required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" rows="2" value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input type="text" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                    <input type="text" required className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">Save Address</button>
                                {addresses.length > 0 && (
                                    <button type="button" onClick={() => setShowNewAddress(false)} className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                                )}
                            </div>
                        </div>
                    </form>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
                <div className="p-4 border border-primary bg-emerald-50/50 rounded-xl flex items-center">
                    <CheckCircle className="text-primary mr-3" />
                    <div>
                        <p className="font-bold text-gray-900">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-600">Pay when your order arrives.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                    <p className="text-gray-500">Total Amount to Pay</p>
                    <p className="text-3xl font-black text-gray-900">₹{finalAmount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-1">{cartItems.length} items</p>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    disabled={loading || showNewAddress}
                    className="w-full sm:w-auto bg-primary text-white py-4 px-10 rounded-xl shadow-md shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all font-bold text-lg disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                        </>
                    ) : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
