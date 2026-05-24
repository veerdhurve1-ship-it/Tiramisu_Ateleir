'use client';

import { motion } from 'framer-motion';
import { cakeProducts } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductShowcase() {
    return (
        <section className="py-32 px-4 md:px-8 bg-[#0A0A0A] relative">
            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header section with left-aligned text and right-aligned button */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#E5B887] font-bold tracking-widest uppercase text-sm mb-2 block"
                        >
                            Our Menu
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-['Outfit'] font-bold text-[#FFFFFF]"
                        >
                            Signature Creations
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 md:mt-0"
                    >
                        <a href="/menu" className="inline-block border-b-2 border-[#E5B887] text-[#FFFFFF] font-['Outfit'] font-semibold pb-1 hover:text-[#E5B887] transition-colors">
                            View Full Menu &rarr;
                        </a>
                    </motion.div>
                </div>

                {/* Grid Layout - Modern airy grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {cakeProducts.map((product, index) => (
                        <div key={product.id}>
                            <ProductCard product={product} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#171717] to-transparent opacity-50 pointer-events-none" />
        </section>
    );
}
