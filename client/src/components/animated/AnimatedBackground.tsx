"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const AnimatedBackground = ({ className }: { className?: string }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {/* Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] z-[1] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3Csvg%3E")`,
                }}
            />

            {/* Orb 1: White (Replacing Green) */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white opacity-40 blur-[80px]"
                animate={{
                    x: ["0%", "70%", "-20%", "50%", "0%"],
                    y: ["0%", "50%", "80%", "20%", "0%"],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Orb 2: Orange (hsl(26,100%,44%)) */}
            <motion.div
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[hsl(26,100%,44%)] opacity-30 blur-[100px]"
                animate={{
                    x: ["0%", "-50%", "20%", "-60%", "0%"],
                    y: ["0%", "60%", "-20%", "40%", "0%"],
                    scale: [1, 1.2, 0.8, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Orb 3: Yellow (Replacing Blue) */}
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[hsl(45,100%,50%)] opacity-30 blur-[100px]"
                animate={{
                    x: ["0%", "40%", "-50%", "20%", "0%"],
                    y: ["0%", "-70%", "30%", "-50%", "0%"],
                    scale: [1, 1.1, 0.9, 1.2, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            {/* Orb 4: White (Extra) */}
            <motion.div
                className="absolute bottom-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-white opacity-30 blur-[90px]"
                animate={{
                    x: ["0%", "-30%", "40%", "-20%", "0%"],
                    y: ["0%", "-40%", "20%", "50%", "0%"],
                    scale: [1, 1.15, 0.95, 1.1, 1],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                }}
            />

            {/* Orb 6: Yellow (Extra) */}
            <motion.div
                className="absolute top-[10%] right-[30%] w-[55vw] h-[55vw] rounded-full bg-[hsl(45,100%,50%)] opacity-25 blur-[90px]"
                animate={{
                    x: ["0%", "-40%", "30%", "-50%", "0%"],
                    y: ["0%", "40%", "-20%", "50%", "0%"],
                    scale: [1, 1.1, 0.95, 1.2, 1],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />
        </div>
    );
};
