'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CakeSlice, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const leftLinks = [
    { name: 'Takeaway', href: '/takeaway' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
];

const rightLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book', href: '/book' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { totalItems, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    
                    {/* Left Links */}
                    <div className="hidden md:flex flex-1 justify-end space-x-8 pr-12">
                        {leftLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-['Outfit'] tracking-widest uppercase transition-colors ${
                                    pathname === link.href ? 'text-[#E5B887] font-bold' : (scrolled ? 'text-[#FFFFFF] hover:text-[#E5B887]' : 'text-white hover:text-[#E5B887]')
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Center Logo */}
                    <Link href="/" className="flex flex-col items-center justify-center group flex-shrink-0">
                        <CakeSlice className={`h-8 w-8 transition-colors ${scrolled ? 'text-[#E5B887]' : 'text-white'}`} />
                        <span className={`text-2xl font-['Outfit'] font-bold tracking-widest mt-1 transition-colors ${scrolled ? 'text-[#FFFFFF]' : 'text-white'}`}>
                            TIRAMISU
                        </span>
                    </Link>

                    {/* Right Links & Cart */}
                    <div className="hidden md:flex flex-1 justify-start items-center space-x-8 pl-12">
                        {rightLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-['Outfit'] tracking-widest uppercase transition-colors ${
                                    pathname === link.href ? 'text-[#E5B887] font-bold' : (scrolled ? 'text-[#FFFFFF] hover:text-[#E5B887]' : 'text-white hover:text-[#E5B887]')
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className={`relative p-2 transition-colors group ${scrolled ? 'text-[#FFFFFF] hover:text-[#E5B887]' : 'text-white hover:text-[#E5B887]'}`}
                        >
                            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-[#E5B887] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 shadow-sm">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={() => setIsCartOpen(true)} className={`relative p-2 ${scrolled ? 'text-[#FFFFFF]' : 'text-white'}`}>
                            <ShoppingBag className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-[#E5B887] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${scrolled ? 'text-[#FFFFFF]' : 'text-white'}`}>
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0A0A0A] border-t border-gray-100 shadow-xl overflow-hidden absolute w-full"
                    >
                        <div className="px-4 py-6 flex flex-col space-y-4 items-center">
                            {[...leftLinks, ...rightLinks].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-['Outfit'] tracking-widest uppercase transition-colors ${
                                        pathname === link.href ? 'text-[#E5B887] font-bold' : 'text-[#FFFFFF] hover:text-[#E5B887]'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
