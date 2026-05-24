import Link from 'next/link';
import { Cake, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#110A07] border-t border-white/5 pt-16 pb-8 text-[#A3A3A3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Cake className="h-8 w-8 text-[#E5B887] group-hover:text-white transition-colors" />
                            <span className="text-2xl font-['Outfit'] font-bold text-[#FFFFFF]">
                                Tiramisu Shop
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Serving the finest artisanal cake blends. Where every sip defies gravity and elevates your day.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-[#E5B887] transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a href="#" className="hover:text-[#E5B887] transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a href="#" className="hover:text-[#E5B887] transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-['Outfit'] font-bold text-[#FFFFFF] mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/menu" className="hover:text-[#E5B887] transition-colors">Our Menu</Link></li>
                            <li><Link href="/about" className="hover:text-[#E5B887] transition-colors">About Us</Link></li>
                            <li><Link href="/gallery" className="hover:text-[#E5B887] transition-colors">Gallery</Link></li>
                            <li><Link href="/book" className="hover:text-[#E5B887] transition-colors">Book a Table</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-['Outfit'] font-bold text-[#FFFFFF] mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-[#E5B887] shrink-0" />
                                <span>123 Brew Lane, Cakeville<br />Cake State 12345</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-[#E5B887] shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-[#E5B887] shrink-0" />
                                <span>hello@tiramisushop.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-lg font-['Outfit'] font-bold text-[#FFFFFF] mb-6">Opening Hours</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Mon - Fri</span>
                                <span className="text-[#FFFFFF]">7:00 AM - 8:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Saturday</span>
                                <span className="text-[#FFFFFF]">8:00 AM - 9:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Sunday</span>
                                <span className="text-[#FFFFFF]">8:00 AM - 6:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} Tiramisu Shop. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="#" className="hover:text-[#E5B887] transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-[#E5B887] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
