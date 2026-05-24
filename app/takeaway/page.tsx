'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cakeProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Plus, Cake } from 'lucide-react';

export default function TakeawayPage() {
    const { addToCart } = useCart();
    // Keep local states for each product
    const [selections, setSelections] = useState<Record<string, { size: string, customization: string }>>({});

    const handleSizeChange = (id: string, size: string) => {
        setSelections(prev => ({
            ...prev,
            [id]: { ...prev[id], size: size || 'Medium', customization: prev[id]?.customization || '' }
        }));
    };

    const handleCustomizationChange = (id: string, custom: string) => {
        setSelections(prev => ({
            ...prev,
            [id]: { ...prev[id], size: prev[id]?.size || 'Medium', customization: custom }
        }));
    };

    const handleAddToCart = (product: any) => {
        const selection = selections[product.id] || { size: 'Medium', customization: '' };
        
        // Calculate dynamic price based on size
        let finalPrice = product.basePrice;
        if (selection.size === 'Large') finalPrice += 1.5;
        if (selection.size === 'Small') finalPrice -= 0.5;

        // Customization
        if (selection.customization) finalPrice += 0.75; // Flat add-on fee

        addToCart({
            id: `${product.id}-${selection.size}-${selection.customization}`.toLowerCase().replace(/\s+/g, '-'),
            productId: product.id,
            name: product.name,
            price: finalPrice,
            quantity: 1,
            size: selection.size,
            customizations: selection.customization,
            image: product.image
        });

        // Reset product selection visually
        setSelections(prev => ({ ...prev, [product.id]: { size: 'Medium', customization: '' } }));
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
                    <h1 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-[#FFFFFF] mb-6 flex items-center justify-center gap-4">
                        <Cake className="w-10 h-10 md:w-16 md:h-16 text-[#E5B887]" />
                        Order Takeaway
                    </h1>
                    <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto font-['Lora']">
                        Skip the line. Customize your dessert and proceed to secure checkout.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cakeProducts.map((product, index) => {
                        const selection = selections[product.id] || { size: 'Medium', customization: '' };
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#171717] rounded-3xl overflow-hidden border border-white/5 flex flex-col hover:border-[#E5B887]/50 transition-colors"
                            >
                                <div className="h-64 relative overflow-hidden bg-black">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
                                </div>
                                
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-['Outfit'] font-bold text-[#FFFFFF]">
                                            {product.name}
                                        </h3>
                                        <span className="text-xl font-bold text-[#E5B887]">
                                            ${product.basePrice.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#A3A3A3] font-['Lora'] mb-6 flex-1">
                                        {product.description}
                                    </p>

                                    {/* Selectors */}
                                    <div className="space-y-4 mb-6">
                                        <div className="space-y-2">
                                            <label 
                                                htmlFor={`size-select-${product.id}`}
                                                className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider"
                                            >
                                                Size
                                            </label>
                                            <select 
                                                id={`size-select-${product.id}`}
                                                value={selection.size}
                                                onChange={(e) => handleSizeChange(product.id, e.target.value)}
                                                className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] text-sm"
                                            >
                                                <option value="Single Slice">Single Slice (-$0.50)</option>
                                                <option value="Double Slice">Double Slice</option>
                                                <option value="Whole Cake">Whole Cake (+$15.00)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label 
                                                htmlFor={`addon-select-${product.id}`}
                                                className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider"
                                            >
                                                Add-ons (+$0.75)
                                            </label>
                                            <select 
                                                id={`addon-select-${product.id}`}
                                                value={selection.customization}
                                                onChange={(e) => handleCustomizationChange(product.id, e.target.value)}
                                                className="w-full bg-[#0A0A0A] border border-[#E5B887]/30 rounded-lg px-3 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#E5B887] text-sm"
                                            >
                                                <option value="">None</option>
                                                <option value="Extra Mascarpone">Extra Mascarpone</option>
                                                <option value="Extra Cocoa Dusting">Extra Cocoa Dusting</option>
                                                <option value="Chocolate Shavings">Chocolate Shavings</option>
                                                <option value="Strawberry Topping">Strawberry Topping</option>
                                                <option value="Gold Leaf">Gold Leaf</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full py-3 bg-[#171717] hover:bg-[#E5B887] text-[#E5B887] hover:text-white border border-[#E5B887]/30 hover:border-transparent rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" /> Add to Order
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
