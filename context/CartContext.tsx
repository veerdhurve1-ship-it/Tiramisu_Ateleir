'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type CartItem = {
    id: string; // Combine product id + customizations for unique key
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    customizations?: string;
    image: string;
};

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Load state from local storage
    useEffect(() => {
        const storedCart = localStorage.getItem('tiramisushop_cart');
        if (storedCart) {
            try {
                setItems(JSON.parse(storedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('tiramisushop_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = useCallback((newItem: CartItem) => {
        setItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(i => i.id === newItem.id);
            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += newItem.quantity;
                return updatedItems;
            }
            return [...prevItems, newItem];
        });
        setIsCartOpen(true);
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
