'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const TOTAL_FRAMES = 300; // High FPS 300 frames
const FRAME_PATH = '/frames'; // Upgraded folder

export default function HeroCanvasAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll progress tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    // Smooth spring animation for buttery scroll
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Anti-gravity effect based on scroll velocity
    const scrollVelocity = useVelocity(scrollYProgress);
    const yOffset = useTransform(
        scrollVelocity,
        [-1, 0, 1],
        [15, 0, -15] // Floats up when scrolling down
    );

    // Map scroll to frame index (bi-directional)
    const frameIndex = useTransform(
        smoothProgress,
        [0, 1],
        [0, TOTAL_FRAMES - 1]
    );

    // Preload all frames
    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            try {
                const imagePromises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
                    return new Promise<HTMLImageElement>((resolve, reject) => {
                        const img = new Image();
                        const paddedIndex = String(i + 1).padStart(3, '0');
                        img.src = `${FRAME_PATH}/ezgif-frame-${paddedIndex}.jpg`;
                        img.onload = () => {
                            if (isMounted) setLoadProgress((prev) => prev + (100 / TOTAL_FRAMES));
                            resolve(img);
                        };
                        img.onerror = () => {
                            // Graceful degradation: return a blank image or handle error
                            const fallbackConfigured = new Image();
                            resolve(fallbackConfigured);
                        };
                    });
                });

                const loadedImages = await Promise.all(imagePromises);
                if (isMounted) {
                    setImages(loadedImages);
                    setImagesLoaded(true);
                }
            } catch (error) {
                console.error("Error preloading images", error);
                if (isMounted) setImagesLoaded(true); // Don't block indefinitely
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, []);

    // Canvas rendering
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const renderFrame = () => {
            const currentFrame = Math.round(frameIndex.get());
            const img = images[Math.max(0, Math.min(currentFrame, TOTAL_FRAMES - 1))];
            if (img && img.width > 0) {
                // Responsive canvas sizing
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // Responsive full-cover sizing without losing the center subject
                const scale = Math.max(
                    canvas.width / img.width,
                    canvas.height / img.height
                );
                const x = (canvas.width - img.width * scale) / 2;
                const y = (canvas.height - img.height * scale) / 2;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const unsubscribe = frameIndex.on('change', renderFrame);
        renderFrame(); // Initial render

        // Handle window resize
        const handleResize = () => renderFrame();
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [imagesLoaded, images, frameIndex]);

    // Text overlay animations
    const section1Opacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
    const section2Opacity = useTransform(smoothProgress, [0.3, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
    const section3Opacity = useTransform(smoothProgress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
    const section4Opacity = useTransform(smoothProgress, [0.9, 0.92, 0.98, 1], [0, 1, 1, 0]);
    const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const showLoading = !isMounted || !imagesLoaded;

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            {showLoading && (
                <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center z-50">
                    <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#E5B887] to-[#4F9C8F]"
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.min(100, loadProgress)}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-[#A3A3A3] text-lg font-['Lora']">
                        Loading Experience... {Math.round(Math.min(100, loadProgress))}%
                    </p>
                </div>
            )}

            <div className={`sticky top-0 h-screen w-full overflow-hidden ${showLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <motion.div style={{ y: yOffset }} className="w-full h-full">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                    />
                </motion.div>

                {/* Text Overlays */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div
                        style={{ opacity: section1Opacity }}
                        className="absolute text-center px-4"
                    >
                        <h1 className="text-7xl md:text-9xl font-['Outfit'] font-bold text-[#FFFFFF] mb-4 tracking-tight">
                            Experience Tiramisu
                        </h1>
                        <p className="text-xl md:text-2xl text-[#A3A3A3] font-['Lora']">
                            Where every bite is a luxury
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: section2Opacity }}
                        className="absolute text-left px-8 md:px-16 max-w-2xl"
                    >
                        <h2 className="text-5xl md:text-7xl font-['Outfit'] font-semibold text-[#FFFFFF] mb-3">
                            Crafted to Perfection
                        </h2>
                        <p className="text-lg md:text-xl text-[#A3A3A3] font-['Lora']">
                            From authentic mascarpone to premium cocoa dust
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: section3Opacity }}
                        className="absolute text-right px-8 md:px-16 max-w-2xl"
                    >
                        <h2 className="text-5xl md:text-7xl font-['Outfit'] font-semibold text-[#FFFFFF] mb-3">
                            Anti-Gravity Flavor
                        </h2>
                        <p className="text-lg md:text-xl text-[#A3A3A3] font-['Lora']">
                            Luxurious layers defying expectations
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: section4Opacity }}
                        className="absolute text-center px-4"
                    >
                        <h2 className="text-6xl md:text-8xl font-['Outfit'] font-bold text-[#FFFFFF] mb-6">
                            Discover Your Favorite
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold shadow-2xl pointer-events-auto"
                        >
                            Explore Collection ↓
                        </motion.button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <p className="text-[#A3A3A3] text-sm font-['Lora'] tracking-wider uppercase">
                        Scroll to Explore
                    </p>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
                    >
                        <div className="w-1 h-3 bg-white/60 rounded-full" />
                    </motion.div>
                </motion.div>

                {/* Gradient transition to light theme */}
                <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
