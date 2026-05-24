import type { Metadata } from 'next';
import { Outfit, Lora } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit'
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora'
});

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Tiramisu Shop | Premium Artisan Cake',
  description: 'Experience excellence with our premium cake blends and artisan atmosphere.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${lora.variable} scroll-smooth`}>
      <body className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen flex flex-col overflow-x-hidden">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
