'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Cake } from 'lucide-react';

export default function BookPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [bookingType, setBookingType] = useState<'table' | 'order'>('table');

    const handleTableSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-[#FFFFFF] mb-6">
                        Reserve Your Experience
                    </h1>
                    <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto font-['Lora']">
                        Whether you need a table for a meeting or want to pre-order your morning brew, we've got you covered.
                    </p>
                </motion.div>

                <div className="flex justify-center mb-12">
                    <div className="inline-flex rounded-xl bg-[#171717] p-2 border border-white/5">
                        <button
                            onClick={() => setBookingType('table')}
                            className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                                bookingType === 'table' 
                                    ? 'bg-[#E5B887] text-white shadow-md' 
                                    : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
                            }`}
                        >
                            Book a Table
                        </button>
                        <button
                            onClick={() => setBookingType('order')}
                            className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                                bookingType === 'order' 
                                    ? 'bg-[#E5B887] text-white shadow-md' 
                                    : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
                            }`}
                        >
                            Pre-Order Cake
                        </button>
                    </div>
                </div>

                <motion.div
                    key={bookingType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#171717] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl"
                >
                    {status === 'success' ? (
                        <div className="p-8 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
                            <h3 className="text-2xl font-['Outfit'] text-green-400 mb-4">Request Confirmed!</h3>
                            <p className="text-[#A3A3A3] mb-8 font-['Lora']">
                                {bookingType === 'table' 
                                    ? 'Your table reservation request has been received. We will send a confirmation email shortly.' 
                                    : 'Your prep order has been received! It will be ready at the requested time.'}
                            </p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="px-8 py-3 bg-transparent border border-green-500/50 text-green-400 rounded-lg hover:bg-green-900/30 transition-colors font-semibold"
                            >
                                Make Another Request
                            </button>
                        </div>
                    ) : (
                        bookingType === 'table' ? (
                            <form onSubmit={handleTableSubmit} className="space-y-6">
                                <h2 className="text-2xl font-['Outfit'] font-semibold text-[#E5B887] mb-8 border-b border-white/5 pb-4">
                                    Table Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="table-name" className="text-sm font-medium text-[#A3A3A3]">Full Name</label>
                                        <input id="table-name" required type="text" name="name" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="table-email" className="text-sm font-medium text-[#A3A3A3]">Email Address</label>
                                        <input id="table-email" required type="email" name="email" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887]" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="table-date" className="text-sm font-medium text-[#A3A3A3] flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#E5B887]" /> Date
                                        </label>
                                        <input id="table-date" required type="date" name="date" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887] [color-scheme:dark]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="table-time" className="text-sm font-medium text-[#A3A3A3] flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[#E5B887]" /> Time
                                        </label>
                                        <input id="table-time" required type="time" name="time" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887] [color-scheme:dark]" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="table-guests" className="text-sm font-medium text-[#A3A3A3] flex items-center gap-2">
                                            <Users className="w-4 h-4 text-[#E5B887]" /> Number of Guests
                                        </label>
                                        <select id="table-guests" required name="guests" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887]">
                                            <option value="1">1 Person</option>
                                            <option value="2">2 People</option>
                                            <option value="3">3 People</option>
                                            <option value="4">4 People</option>
                                            <option value="5+">5+ People</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="table-requests" className="text-sm font-medium text-[#A3A3A3]">Special Requests</label>
                                        <input id="table-requests" type="text" name="requests" placeholder="Optional" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887]" />
                                    </div>
                                </div>

                                {status === 'error' && <p className="text-red-400 text-sm pt-4">There was an error processing your request. Please try again.</p>}

                                <div className="pt-6">
                                    <button 
                                        type="submit" 
                                        disabled={status === 'loading'}
                                        className="w-full py-4 bg-[#E5B887] hover:bg-[#E5B584] text-white rounded-lg text-lg font-semibold shadow-lg transition-colors disabled:opacity-70"
                                    >
                                        {status === 'loading' ? 'Processing...' : 'Request Reservation'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleOrderSubmit} className="space-y-6">
                                <h2 className="text-2xl font-['Outfit'] font-semibold text-[#E5B887] mb-8 border-b border-white/5 pb-4">
                                    Order Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="order-name" className="text-sm font-medium text-[#A3A3A3]">Full Name</label>
                                        <input id="order-name" required type="text" name="name" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="order-email" className="text-sm font-medium text-[#A3A3A3]">Email Address</label>
                                        <input id="order-email" required type="email" name="email" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887]" />
                                    </div>
                                    
                                    <div className="space-y-2 md:col-span-2">
                                        <label htmlFor="order-cake" className="text-sm font-medium text-[#A3A3A3] flex items-center gap-2">
                                            <Cake className="w-4 h-4 text-[#E5B887]" /> Select Cake
                                        </label>
                                        <select id="order-cake" required name="cake" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887]">
                                            <option value="">Choose a blend...</option>
                                            <option value="cappuccino">Anti-Gravity Cappuccino</option>
                                            <option value="latte">Cloud 9 Latte</option>
                                            <option value="mocha">Meteor Mocha</option>
                                            <option value="espresso">Stellar Espresso</option>
                                            <option value="coldbrew">Galactic Cold Brew</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="order-pickup" className="text-sm font-medium text-[#A3A3A3] flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[#E5B887]" /> Pickup Time today
                                        </label>
                                        <input id="order-pickup" required type="time" name="pickupTime" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887] [color-scheme:dark]" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="order-customizations" className="text-sm font-medium text-[#A3A3A3]">Customizations</label>
                                        <input id="order-customizations" type="text" name="customizations" placeholder="Extra mascarpone, chocolate curls, etc." className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887]" />
                                    </div>
                                </div>

                                {status === 'error' && <p className="text-red-400 text-sm pt-4">There was an error processing your request. Please try again.</p>}

                                <div className="pt-6">
                                    <button 
                                        type="submit" 
                                        disabled={status === 'loading'}
                                        className="w-full py-4 bg-[#E5B887] hover:bg-[#E5B584] text-white rounded-lg text-lg font-semibold shadow-lg transition-colors disabled:opacity-70"
                                    >
                                        {status === 'loading' ? 'Processing...' : 'Place Pre-Order'}
                                    </button>
                                </div>
                            </form>
                        )
                    )}
                </motion.div>
            </div>
        </div>
    );
}
