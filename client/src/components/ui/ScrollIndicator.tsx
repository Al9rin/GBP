import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
    scrollRef: React.RefObject<HTMLDivElement>;
}

export function ScrollIndicator({ scrollRef }: ScrollIndicatorProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                // Hide if scrolled more than 50px
                setIsVisible(scrollRef.current.scrollTop < 50);
            }
        };

        const element = scrollRef.current;
        if (element) {
            element.addEventListener("scroll", handleScroll);
            // Check initial scroll position
            handleScroll();
        }

        return () => {
            if (element) {
                element.removeEventListener("scroll", handleScroll);
            }
        };
    }, [scrollRef]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-28 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2"
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
