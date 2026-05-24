'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/contact', {
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
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-[#FFFFFF] mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto font-['Lora']">
                        Have a question about our beans, or just want to say hello? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#171717] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl"
                    >
                        <h2 className="text-3xl font-['Outfit'] font-semibold text-[#E5B887] mb-8">
                            Send a Message
                        </h2>
                        
                        {status === 'success' ? (
                            <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
                                <h3 className="text-xl font-medium text-green-400 mb-2">Message Sent Successfully!</h3>
                                <p className="text-[#A3A3A3]">Thank you for reaching out. We will get back to you shortly.</p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 px-6 py-2 bg-transparent border border-green-500/50 text-green-400 rounded-lg hover:bg-green-900/30 transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 form-control">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-medium text-[#A3A3A3]">First Name</label>
                                        <input required type="text" name="firstName" id="firstName" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887] transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-medium text-[#A3A3A3]">Last Name</label>
                                        <input required type="text" name="lastName" id="lastName" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887] transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-[#A3A3A3]">Email Address</label>
                                    <input required type="email" name="email" id="email" className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887] transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-[#A3A3A3]">Message</label>
                                    <textarea required name="message" id="message" rows={5} className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] focus:ring-1 focus:ring-[#E5B887] transition-colors resize-none"></textarea>
                                </div>
                                
                                {status === 'error' && (
                                    <p className="text-red-400 text-sm">There was an error sending your message. Please try again later.</p>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={status === 'loading'}
                                    className="w-full py-4 bg-gradient-to-r from-[#E5B887] to-[#C08A56] hover:from-[#E5B584] hover:to-[#E5B887] text-white rounded-lg text-lg font-semibold shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-12 flex flex-col justify-center"
                    >
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-[#171717] rounded-2xl border border-white/5">
                                <MapPin className="h-8 w-8 text-[#E5B887]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-['Outfit'] font-semibold text-[#FFFFFF] mb-2">Visit Us</h3>
                                <p className="text-[#A3A3A3] leading-relaxed font-['Lora']">
                                    123 Brew Lane, Cakeville<br />
                                    Cake State 12345
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-[#171717] rounded-2xl border border-white/5">
                                <Phone className="h-8 w-8 text-[#E5B887]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-['Outfit'] font-semibold text-[#FFFFFF] mb-2">Call Us</h3>
                                <p className="text-[#A3A3A3] leading-relaxed font-['Lora']">
                                    +1 (555) 123-4567<br />
                                    Mon-Fri, 7am to 8pm
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-[#171717] rounded-2xl border border-white/5">
                                <Mail className="h-8 w-8 text-[#E5B887]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-['Outfit'] font-semibold text-[#FFFFFF] mb-2">Email Us</h3>
                                <p className="text-[#A3A3A3] leading-relaxed font-['Lora']">
                                    hello@tiramisushop.com<br />
                                    support@tiramisushop.com
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
