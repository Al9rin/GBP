import { motion } from "framer-motion";
import { ArrowRight, Search, Star, Mic, Globe, Clock, TrendingUp, Eye, MousePointerClick } from "lucide-react";
import { useLocation } from "wouter";
import { ShimmerButton } from "@/components/ui/shimmer-button"; // Updated import
import { useEffect, useState } from "react";

export function GoogleMockup() {
    const [, navigate] = useLocation();
    const [searchText, setSearchText] = useState("");
    const [stage, setStage] = useState<'idle' | 'cursor-move' | 'clicking' | 'typing' | 'completed' | 'results'>('idle');
    const fullText = "Therapist near me...";

    useEffect(() => {
        // Timeline configuration
        const START_DELAY = 1500; // Wait a bit after mount
        const CURSOR_MOVE_DURATION = 1000;
        const CLICK_DURATION = 300;
        const TYPE_SPEED = 80;

        let timeouts: NodeJS.Timeout[] = [];
        let typeInterval: NodeJS.Timeout | undefined;

        // 1. Start Cursor Move
        timeouts.push(setTimeout(() => setStage('cursor-move'), START_DELAY));

        // 2. Click
        timeouts.push(setTimeout(() => setStage('clicking'), START_DELAY + CURSOR_MOVE_DURATION));

        // 3. Start Typing
        timeouts.push(setTimeout(() => {
            setStage('typing');
            let currentIndex = 0;
            typeInterval = setInterval(() => {
                if (currentIndex <= fullText.length) {
                    setSearchText(fullText.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(typeInterval);
                    // 4. Typing Done -> Completed (Green Glow/Enter)
                    setStage('completed');
                    // 5. Show Results
                    timeouts.push(setTimeout(() => setStage('results'), 800));
                }
            }, TYPE_SPEED);
        }, START_DELAY + CURSOR_MOVE_DURATION + CLICK_DURATION + 500));

        return () => {
            timeouts.forEach(clearTimeout);
            if (typeInterval) clearInterval(typeInterval);
        };
    }, []);

    return (
        <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans overflow-hidden relative">
            {/* Cursor Animation */}
            <motion.div
                initial={{ opacity: 0, x: 200, y: 300, scale: 1 }}
                animate={{
                    opacity: stage === 'idle' ? 0 : stage === 'cursor-move' || stage === 'clicking' ? 1 : [1, 0], // Keep visible during move/click
                    x: stage === 'idle' ? 200 : stage === 'cursor-move' ? 0 : stage === 'clicking' ? 0 : 50, // Move to center then slightly away
                    y: stage === 'idle' ? 300 : stage === 'cursor-move' ? 10 : stage === 'clicking' ? 10 : 100,
                    scale: stage === 'clicking' ? 0.9 : 1,
                }}
                transition={{
                    opacity: { duration: 0.5, times: [0, 0.1, 0.9, 1] },
                    x: { duration: 1, ease: "easeOut" },
                    y: { duration: 1, ease: "easeOut" },
                    scale: { duration: 0.2 },
                }}
                className="absolute z-[60] pointer-events-none"
                style={{ left: "50%", top: "8%" }} // Approximate position over search bar
            >
                {/* Custom Cursor SVG for sharpness */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl filter">
                    <path d="M5.5 3.5L19 10.5L11.5 13L9 20.5L5.5 3.5Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </motion.div>

            {/* Google Search Bar - Modern Glassmorphism */}
            <div className="absolute top-0 left-0 right-0 z-30 pt-8 flex justify-center w-full pointer-events-none">
                <div className="max-w-xl w-full px-6 pointer-events-auto">
                    <motion.div
                        animate={{
                            borderColor: stage === 'completed' ? '#84CC16' : stage === 'typing' || stage === 'clicking' ? '#3B82F6' : 'rgba(255,255,255,0.5)',
                            boxShadow: stage === 'completed'
                                ? '0 0 0 4px rgba(132, 204, 22, 0.2), 0 8px 30px rgba(0,0,0,0.04)'
                                : stage === 'typing'
                                    ? '0 0 0 2px rgba(59, 130, 246, 0.2), 0 8px 30px rgba(0,0,0,0.04)'
                                    : '0 8px 30px rgba(0,0,0,0.04)'
                        }}
                        className="flex items-center gap-4 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full px-6 py-4 transition-all duration-300 ring-1 ring-black/5"
                    >
                        <Search className={cn("w-5 h-5 transition-colors", stage === 'completed' ? "text-lime-600" : "text-slate-400")} />
                        <div className="flex-1 text-lg text-slate-700 font-medium flex items-center antialiased tracking-tight">
                            {searchText}
                            {stage === 'typing' && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="w-0.5 h-5 bg-blue-500 ml-0.5 rounded-full"
                                />
                            )}
                        </div>
                        {/* Google Mic Icon Colors */}
                        <div className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 transition-colors cursor-pointer">
                            <Mic className="w-5 h-5 text-blue-500" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content - Unified & Centered */}
            <div className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
                {stage === 'results' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex-1 w-full min-h-full bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 relative flex flex-col justify-center items-center"
                    >
                        {/* Decorative background blob */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                        {/* Centered Content Container */}
                        <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center mt-16 md:mt-20"> {/* Adjusted margin-top */}

                            {/* Profile Header Block - Adjusted Scaling */}
                            <div className="flex flex-col items-center gap-3 mb-6 transform scale-90 origin-bottom">
                                {/* Rounded Profile Picture - No Border */}
                                <div className="w-28 h-28 rounded-full overflow-hidden bg-white shadow-lg flex-shrink-0 backface-hidden transform-gpu">
                                    <img
                                        src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/08/cropped-GT-Logo-icon.png"
                                        alt="GT Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col items-center space-y-2">
                                    <h2 className="text-3xl md:text-3xl font-bold text-[#202124] leading-tight tracking-tight antialiased">
                                        Your Practice Name
                                    </h2>

                                    <div className="flex items-center justify-center flex-wrap gap-2 text-sm md:text-base">
                                        <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1 rounded-full border border-white/60 shadow-sm backdrop-blur-sm">
                                            <span className="font-bold text-[#202124]">5.0</span>
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-3.5 h-3.5 fill-[#FBC02D] text-[#FBC02D]"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-500 ml-1">(225)</span>
                                        </div>
                                        <span className="text-gray-700 font-medium px-3 py-1 rounded-full bg-white/40 border border-white/40 shadow-sm backdrop-blur-sm">Mental Health Service</span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-3 text-[#202124] text-sm md:text-base items-center">
                                        <div className="flex items-center gap-2 bg-green-50/80 px-3 py-1 rounded-full text-[#188038] border border-green-100 shadow-sm backdrop-blur-sm">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="font-medium">Open</span>
                                            <span className="text-[#188038]/80">⋅ Closes at 6 PM</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer bg-white/60 px-3 py-1 rounded-full border border-white/60 shadow-sm backdrop-blur-sm">
                                            <Globe className="w-3.5 h-3.5" />
                                            <span>yourpractice.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Value Prop Text - LARGER & BOLD */}
                            <div className="max-w-3xl mx-auto space-y-6 mb-8 mt-2">
                                <p className="text-xl md:text-2xl text-[#202124] leading-snug font-light antialiased">
                                    Get found by therapy seekers in your area. This step-by-step guide will help you
                                    claim and optimize your <span className="font-bold text-[#4285F4]">Google Business Profile</span> in under 25 minutes.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col md:flex-row gap-4 justify-center items-center perspective-1000 w-full mb-2">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ShimmerButton
                                        onClick={() => navigate("/guide")}
                                        background="#A2AD1A"
                                        shimmerColor="#d4e600"
                                        className="text-lg px-8 py-4 font-semibold shadow-2xl tracking-wide min-w-[200px]" // Standardized size
                                        borderRadius="100px"
                                    >
                                        Start Step One <ArrowRight className="w-5 h-5 ml-2" />
                                    </ShimmerButton>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ShimmerButton
                                        onClick={() => window.open("https://business.google.com", "_blank")}
                                        background="linear-gradient(to right, #1a73e8, #1557b0)"
                                        shimmerColor="#8ab4f8"
                                        className="text-lg px-8 py-4 font-semibold shadow-2xl tracking-wide min-w-[200px]"
                                        borderRadius="100px"
                                    >
                                        Sign Up Now <ArrowRight className="w-5 h-5 ml-2" />
                                    </ShimmerButton>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

// Helper for class merging
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}
