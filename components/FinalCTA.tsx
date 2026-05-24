'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="py-32 px-4 md:px-8 bg-[#0A0A0A] relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#171717] rounded-[3rem] p-12 md:p-24 text-center shadow-2xl relative overflow-hidden border border-[#2A2A2A]"
                >
                    {/* Decorative Elements inside card */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0A0A0A] via-[#E5B887] to-[#0A0A0A]" />
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#E5B887] rounded-full blur-3xl opacity-10" />
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#E5B887] rounded-full blur-3xl opacity-10" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-6xl font-['Outfit'] font-bold text-[#FFFFFF] mb-6 leading-tight"
                        >
                            Discover Your Perfect Tiramisu
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-[#A3A3A3] font-['Lora'] mb-10"
                        >
                            Elevate your dessert experience. Order online for takeaway or reserve a table to enjoy our artisanal creations in house.
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <Link href="/menu">
                                <button className="w-full sm:w-auto px-10 py-4 bg-[#E5B887] hover:bg-[#D4A373] text-[#0A0A0A] rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                                    Explore Full Menu
                                </button>
                            </Link>
                            <Link href="/book">
                                <button className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-[#E5B887] text-[#E5B887] hover:bg-[#E5B887] hover:text-[#0A0A0A] rounded-full text-lg font-semibold transition-all">
                                    Book a Table
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
