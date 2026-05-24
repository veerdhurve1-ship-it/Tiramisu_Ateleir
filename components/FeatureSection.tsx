'use client';

import { motion } from 'framer-motion';
import { features } from '@/data/products';

export default function FeatureSection() {
    return (
        <section className="py-32 px-4 md:px-8 bg-[#0A0A0A] relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-[#FFFFFF] mb-4">
                        The Tiramisu Promise
                    </h2>
                    <p className="text-[#A3A3A3] font-['Lora'] max-w-2xl mx-auto text-lg">
                        We don't just bake; we craft experiences. Discover what makes our dessert truly exceptional.
                    </p>
                </div>

                <div className="space-y-24">
                    {features.map((feature, i) => (
                        <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                            {/* Image Placeholder - Alternating */}
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-1/2 flex justify-center"
                            >
                                <div className="relative w-72 h-72 rounded-full bg-gradient-to-tr from-[#171717] to-[#0A0A0A] shadow-2xl flex items-center justify-center p-8">
                                    <div className="absolute inset-0 rounded-full border-4 border-[#171717] shadow-inner" />
                                    <img
                                        src="/cake/cup-centered.png"
                                        alt={feature.title}
                                        className="relative z-10 w-full h-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                                    />
                                </div>
                            </motion.div>

                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full md:w-1/2 space-y-4 text-center md:text-left"
                            >
                                <span className="text-[#E5B887] font-['Outfit'] font-bold tracking-widest text-sm uppercase">
                                    Quality Standard {i + 1}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-['Outfit'] font-semibold text-[#FFFFFF]">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-[#A3A3A3] font-['Lora'] leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
