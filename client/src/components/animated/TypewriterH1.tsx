import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterH1Props {
    line1?: string;
    line2?: string;
    className?: string;
}

export function TypewriterH1({
    line1 = "How to Set Up Your",
    line2 = "Google Business Profile",
    className,
}: TypewriterH1Props) {
    const [displayText, setDisplayText] = useState("");
    const controls = useAnimation();

    useEffect(() => {
        const animateText = async () => {
            // Delay before starting
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Typewriter effect
            for (let i = 0; i <= line2.length; i++) {
                setDisplayText(line2.slice(0, i));
                // Random typing speed for realism
                await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 50));
            }

            // Blink cursor
            controls.start({
                opacity: [1, 0, 1],
                transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                },
            });
        };

        animateText();
    }, [line2, controls]);

    return (
        <div className={cn("text-center mb-2", className)}>
            {/* Line 1: Playfair Display Italic */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-serif font-semibold italic text-[38px] md:text-[50px] lg:text-[74px] tracking-[1px] text-black mb-0 leading-tight"
            >
                {line1}
            </motion.h1>

            {/* Line 2: Sans Serif Bold Typewriter */}
            <div className="relative inline-block">
                <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-8xl tracking-tight leading-tight min-h-[1.1em] bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#1e3a8a] to-[#4285F4] bg-[length:200%_auto] animate-shine">
                    {displayText}
                    <motion.span
                        animate={controls}
                        className="inline-block w-[3px] h-[0.8em] bg-[#4285F4] ml-1 align-baseline"
                    />
                </h2>
            </div>
        </div>
    );
}
