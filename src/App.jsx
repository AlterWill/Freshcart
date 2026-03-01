import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-grow bg-gray-50">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/admin" element={<AdminDashboard />} />
                            </Routes>
                        </main>
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
