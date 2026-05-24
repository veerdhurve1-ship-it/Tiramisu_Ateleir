'use client';

import { motion } from 'framer-motion';
import { CakeProduct } from '@/data/products';
import { Plus, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: CakeProduct;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.basePrice || parseFloat(product.price.replace('$', '')),
            quantity: 1,
            size: 'Single Slice',
            customizations: '',
            image: product.image
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative bg-[#171717] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col border border-white/5"
        >
            {/* Image Container */}
            <div className="relative h-72 w-full overflow-hidden bg-[#171717]">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4 bg-[#0A0A0A]/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white/10">
                    <Star className="w-4 h-4 text-[#E5B887] fill-[#E5B887]" />
                    <span className="text-sm font-bold text-[#FFFFFF]">{product.rating}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow bg-[#171717] relative">
                {/* Floating Add to Cart Button */}
                <button 
                    onClick={handleAddToCart}
                    className="absolute -top-6 right-8 bg-[#E5B887] hover:bg-[#C08A56] text-white p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-all z-10"
                >
                    <Plus className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-['Outfit'] font-bold text-[#FFFFFF] mb-2 pr-12">
                    {product.name}
                </h3>
                
                <p className="text-[#A3A3A3] font-['Lora'] text-sm leading-relaxed flex-grow mb-6">
                    {product.description}
                </p>

                <div className="flex items-end justify-between mt-auto">
                    <span className="text-2xl font-bold text-[#E5B887]">
                        {product.price}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-semibold">
                        Per Slice
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
