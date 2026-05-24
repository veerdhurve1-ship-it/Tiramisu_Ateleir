import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cake: {
                    bg: {
                        primary: "#0A0A0A",
                        secondary: "#3D2820",
                    },
                    border: "#2A2A2A",
                    text: {
                        primary: "#FFFFFF",
                        secondary: "#C9B39D",
                    },
                    accent: "#E5B887",
                    gold: "#FFD700",
                },
            },
            backgroundImage: {
                "cake-gradient": "linear-gradient(135deg, #0A0A0A 0%, #1C120E 100%)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            animation: {
                float: "float 3s ease-in-out infinite",
                glow: "glow 2s ease-in-out infinite",
                "slide-up": "slide-up 0.5s ease-out forwards",
            },
        },
    },
    plugins: [],
};

export default config;
