'use client';

import { motion } from 'framer-motion';
import { cakeProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function MenuPage() {
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
                        Our Full Menu
                    </h1>
                    <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto font-['Lora']">
                        Explore our complete selection of artisanal cakes, crafted with precision to elevate your daily ritual.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cakeProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
