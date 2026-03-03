import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, LayoutDashboard, Store } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-700 transition-colors">
                                <Store className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">
                                Smart<span className="text-green-600">Mart</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-1 sm:space-x-4">
                        <Link
                            to="/cart"
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all relative flex items-center justify-center h-10 w-10"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white transform translate-x-1 -translate-y-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-2 sm:gap-4 ml-2 pl-2 sm:ml-4 sm:pl-4 border-l border-gray-200">
                                {user.role === 'admin' ? (
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span className="hidden sm:inline">Admin</span>
                                    </Link>
                                ) : (
                                    <Link
                                        to="/orders"
                                        className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors hidden sm:block"
                                    >
                                        Orders
                                    </Link>
                                )}

                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <div className="bg-green-100 p-1 rounded-full">
                                        <User className="h-4 w-4 text-green-700" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                                        {user.name.split(' ')[0]}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-1"
                                    aria-label="Log out"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3 ml-2 pl-2 sm:ml-4 sm:pl-4 border-l border-gray-200">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md shadow-sm transition-colors"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
