'use client';

import { motion } from 'framer-motion';
import { XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CanceledPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] py-32 px-4 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#171717] p-12 rounded-3xl border border-red-500/30 text-center max-w-lg w-full shadow-2xl shadow-red-900/10"
            >
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XCircle className="w-12 h-12 text-red-500" />
                </div>
                
                <h1 className="text-4xl font-['Outfit'] font-bold text-[#FFFFFF] mb-4">
                    Order Cancelled
                </h1>
                
                <p className="text-[#A3A3A3] font-['Lora'] mb-10 leading-relaxed">
                    Your checkout process was cancelled. No charges were made. Your cake is still waiting for you in the cart.
                </p>

                <Link href="/takeaway" className="flex items-center justify-center gap-2 w-full py-4 bg-[#E5B887] hover:bg-[#E5B584] text-white rounded-xl font-semibold transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return to Cart
                </Link>
            </motion.div>
        </div>
    );
}
