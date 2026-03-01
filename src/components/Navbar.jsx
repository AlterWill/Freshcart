import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Store } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-primary font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity">
                            <Store className="mr-2" size={28} />
                            SmartMart
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-gray-600 hover:text-primary font-medium transition-colors">Admin</Link>
                                )}
                                <Link to="/orders" className="text-gray-600 hover:text-primary font-medium transition-colors">Orders</Link>

                                <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors group">
                                    <ShoppingCart size={24} />
                                    {totalCartItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {totalCartItems}
                                        </span>
                                    )}
                                </Link>

                                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                    <User size={18} />
                                    <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                                </div>
                                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-200">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
