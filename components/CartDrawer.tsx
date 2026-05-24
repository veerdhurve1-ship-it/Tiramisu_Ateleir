'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, totalPrice } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;
        setIsCheckingOut(true);
        
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items })
            });
            const data = await response.json();
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Failed to create checkout session");
                setIsCheckingOut(false);
            }
        } catch (error) {
            console.error(error);
            setIsCheckingOut(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/5 z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-2xl font-['Outfit'] font-bold text-[#FFFFFF] flex items-center gap-2">
                                <ShoppingBag className="text-[#E5B887]" /> Your Cart
                            </h2>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <span className="sr-only">Close cart</span>
                                <X className="w-6 h-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <ShoppingBag className="w-16 h-16 text-white/20" />
                                    <p className="text-[#A3A3A3] font-['Lora']">Your cart is empty.</p>
                                    <button 
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            router.push('/takeaway');
                                        }}
                                        className="text-[#E5B887] hover:text-[#E5B584] underline underline-offset-4"
                                    >
                                        Order Takeaway
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-[#24150D] rounded-2xl border border-white/5">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-black/50">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-['Outfit'] font-bold text-[#FFFFFF] leading-tight">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs text-[#A3A3A3] font-['Lora'] mt-1">
                                                        {item.size} {item.customizations && `• ${item.customizations}`}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-white/40 hover:text-red-400 transition-colors"
                                                >
                                                    <span className="sr-only">Remove item</span>
                                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                                </button>
                                            </div>
                                            
                                            <div className="mt-auto flex items-center justify-between pt-3">
                                                <div className="flex items-center gap-3 bg-[#0A0A0A] rounded-lg p-1 border border-white/5">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 rounded text-[#A3A3A3] hover:text-white hover:bg-white/10 disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <span className="sr-only">Decrease quantity</span>
                                                        <Minus className="w-3 h-3" aria-hidden="true" />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 rounded text-[#A3A3A3] hover:text-white hover:bg-white/10"
                                                    >
                                                        <span className="sr-only">Increase quantity</span>
                                                        <Plus className="w-3 h-3" aria-hidden="true" />
                                                    </button>
                                                </div>
                                                <span className="font-semibold text-[#E5B887]">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/5 bg-[#0A0A0A]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[#A3A3A3] font-['Lora']">Subtotal</span>
                                    <span className="text-2xl font-['Outfit'] font-bold text-[#FFFFFF]">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full py-4 bg-gradient-to-r from-[#E5B887] to-[#C08A56] hover:from-[#E5B584] hover:to-[#E5B887] text-[#0A0A0A] rounded-xl text-lg font-bold shadow-lg shadow-[#E5B887]/20 transition-all transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isCheckingOut ? 'Loading...' : 'Proceed to Checkout'}
                                </button>
                                <p className="text-center text-xs text-white/40 mt-4 flex justify-center gap-1">
                                    <span>Secure checkout powered by</span> <span className="font-semibold">Stripe</span>
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
