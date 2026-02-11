import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface ScrollIndicatorProps {
    scrollRef: React.RefObject<HTMLDivElement>;
}

export function ScrollIndicator({ scrollRef }: ScrollIndicatorProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [centerX, setCenterX] = useState<number | null>(null);

    // Calculate the horizontal center of the scrollable content area
    const updateCenterPosition = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setCenterX(rect.left + rect.width / 2);
    }, [scrollRef]);

    useEffect(() => {
        updateCenterPosition();
        window.addEventListener("resize", updateCenterPosition);
        return () => window.removeEventListener("resize", updateCenterPosition);
    }, [updateCenterPosition]);

    useEffect(() => {
        const handleScroll = () => {
            const el = scrollRef.current;
            if (!el) return;

            // Check if user is at the bottom (within 50px)
            const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
            // Check if there's enough content to scroll
            const hasScroll = el.scrollHeight > el.clientHeight + 50;

            setIsVisible(hasScroll && !isAtBottom);

            // Update horizontal center on scroll too (in case layout shifted)
            const rect = el.getBoundingClientRect();
            setCenterX(rect.left + rect.width / 2);
        };

        const element = scrollRef.current;
        if (element) {
            element.addEventListener("scroll", handleScroll, { passive: true });
            // Check initial state
            handleScroll();
        }

        return () => {
            if (element) {
                element.removeEventListener("scroll", handleScroll);
            }
        };
    }, [scrollRef]);

    if (centerX === null) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    style={{ left: centerX }}
                    className="fixed bottom-28 lg:bottom-8 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#A2AD1A] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-[#A2AD1A]/20">
                        Scroll for more
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#A2AD1A]/30 shadow-lg shadow-[#A2AD1A]/20 flex items-center justify-center text-[#A2AD1A]"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
