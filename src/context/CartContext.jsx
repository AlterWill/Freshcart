import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchCart = async () => {
        if (!user) {
            setCartItems([]);
            return;
        }
        try {
            const res = await api.get('/cart');
            setCartItems(res.data);
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) return alert('Please login to add to cart');
        try {
            await api.post('/cart', { productId, quantity });
            fetchCart();
        } catch (error) {
            console.error('Add to cart failed', error);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            await api.put(`/cart/${itemId}`, { quantity });
            fetchCart();
        } catch (error) {
            console.error('Update quantity failed', error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await api.delete(`/cart/${itemId}`);
            fetchCart();
        } catch (error) {
            console.error('Remove from cart failed', error);
        }
    };

    const clearCartLocal = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, fetchCart, addToCart, updateQuantity, removeFromCart, clearCartLocal }}>
            {children}
        </CartContext.Provider>
    );
};
