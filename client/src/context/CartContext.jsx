import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [user]);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await api.get('/cart');
            setCartItems(res.data);
        } catch (err) {
            console.error('Failed to fetch cart', err);
        }
        setLoading(false);
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            await api.post('/cart', { productId, quantity });
            fetchCart();
        } catch (err) {
            console.error('Failed to add to cart', err);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;
        try {
            await api.put(`/cart/${itemId}`, { quantity });
            setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity } : item));
        } catch (err) {
            console.error('Failed to update quantity', err);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await api.delete(`/cart/${itemId}`);
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (err) {
            console.error('Failed to remove from cart', err);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, loading, fetchCart, addToCart, updateQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
