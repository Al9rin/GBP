import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
    scrollRef: React.RefObject<HTMLDivElement>;
}

export function ScrollIndicator({ scrollRef }: ScrollIndicatorProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const checkVisibility = () => {
            const scrollEl = scrollRef.current;
            if (!scrollEl) return;

            // Check if there's enough content to scroll
            const hasScroll = scrollEl.scrollHeight > scrollEl.clientHeight + 50;
            // Check if user is at the bottom (within 50px)
            const isAtBottom = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight < 50;

            setIsVisible(hasScroll && !isAtBottom);
        };

        el.addEventListener("scroll", checkVisibility, { passive: true });

        // Delay initial check to allow content to render after step transitions
        const timer = setTimeout(checkVisibility, 150);

        // Re-check when scroll container content size changes (step transitions)
        const resizeObserver = new ResizeObserver(() => {
            setTimeout(checkVisibility, 200);
        });
        resizeObserver.observe(el);

        return () => {
            el.removeEventListener("scroll", checkVisibility);
            clearTimeout(timer);
            resizeObserver.disconnect();
        };
    }, [scrollRef]);

    return (
        <div className="sticky bottom-28 lg:bottom-8 h-0 overflow-visible pointer-events-none z-30">
            <div className="w-full max-w-5xl mx-auto px-4 lg:px-8">
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-2"
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
            </div>
        </div>
    );
}
