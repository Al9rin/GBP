import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Search, MapPin, Store, CheckCircle, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntroductionVisual() {
    const controls = useAnimation();

    useEffect(() => {
        let isMounted = true;
        const sequence = async () => {
            // Reset
            if (isMounted) await controls.start("hidden");

            // Stage 1: Card appears (Generic)
            if (isMounted) await controls.start("appear");

            // Stage 2: Google Foundation (Blue/Green)
            if (isMounted) await Promise.all([
                controls.start("googleIn"),
                controls.start("cardBlue")
            ]);

            // Stage 3: GoodTherapy Verification (Orange)
            if (isMounted) await Promise.all([
                controls.start("gtIn"),
                controls.start("cardVerified")
            ]);

            // Stage 4: Success / Growth (Leads)
            if (isMounted) await controls.start("growth");

            // Hold then loop
            if (isMounted) {
                await new Promise(r => setTimeout(r, 2000));
                if (isMounted) sequence();
            }
        };

        sequence();
        return () => { isMounted = false; controls.stop(); };
    }, [controls]);

    // Motion Variants
    const cardVariants = {
        hidden: { scale: 0.9, opacity: 0, y: 20 },
        appear: {
            scale: 1, opacity: 1, y: 0,
            transition: { duration: 0.6, type: "spring" }
        },
        cardBlue: {
            borderColor: "#3B82F6",
            boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.2)",
            transition: { duration: 0.8 }
        },
        cardVerified: {
            borderColor: "#F59E0B",
            boxShadow: "0 10px 40px -5px rgba(245, 158, 11, 0.3)",
            transition: { duration: 0.8 }
        },
        growth: {
            scale: 1.02,
            transition: { duration: 0.5, yoyo: Infinity }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
        pulse: { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 2 } }
    };

    return (
        <div className="w-full max-w-2xl mx-auto aspect-[4/3] md:aspect-[16/9] relative flex items-center justify-center p-6 md:p-12">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-[2rem] border border-slate-100/50 shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Floating background blobs */}
                <motion.div
                    animate={{
                        y: [0, -20, 0], x: [0, 10, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0], x: [0, -10, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-orange-100/40 rounded-full blur-3xl pointer-events-none"
                />
            </div>

            {/* Main Card: Profile Container */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                className="relative z-10 w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 flex flex-col items-center gap-6 shadow-xl"
            >
                {/* Header: Business Name & Avatar */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 relative overflow-visible">
                        <Store className="w-8 h-8 text-slate-300" />

                        {/* Success Checkmark */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate={controls}
                            custom="gtIn" // Logic handled via useAnimation names, simplifying here
                            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md border-2 border-white"
                            style={{ opacity: 0 }} // Controlled by animation variant override or manual logic below
                        >
                            <CheckCircle size={12} strokeWidth={3} />
                        </motion.div>
                    </div>

                    <div className="space-y-2 w-full">
                        <div className="h-4 w-32 bg-slate-100 rounded-full mx-auto" />
                        <div className="h-3 w-48 bg-slate-50 rounded-full mx-auto" />
                    </div>
                </div>

                {/* Integration Row */}
                <div className="w-full flex justify-center gap-4 py-2 relative">
                    {/* Connector Line */}
                    <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 -z-10" />

                    {/* Google Node */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate={controls}
                        custom="googleIn"
                        className="flex flex-col items-center gap-2 bg-white p-2 rounded-xl border border-slate-100 shadow-sm"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                            <Search size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Found</span>
                    </motion.div>

                    {/* Map Node */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate={controls}
                        custom="googleIn"
                        className="flex flex-col items-center gap-2 bg-white p-2 rounded-xl border border-slate-100 shadow-sm"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <MapPin size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Local</span>
                    </motion.div>

                    {/* GoodTherapy Node */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate={controls}
                        custom="gtIn"
                        className="flex flex-col items-center gap-2 bg-white p-2 rounded-xl border border-slate-100 shadow-sm ring-2 ring-orange-100"
                    >
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                            <CheckCircle size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-orange-500 uppercase">Verified</span>
                    </motion.div>
                </div>

                {/* Performance Footer */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, height: 0 },
                        growth: { opacity: 1, height: "auto", transition: { duration: 0.5 } }
                    }}
                    initial="hidden"
                    animate={controls}
                    className="w-full bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100 overflow-hidden"
                >
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 rounded-lg text-green-600">
                            <TrendingUp size={14} />
                        </div>
                        <div className="text-xs font-semibold text-slate-600">Profile Views</div>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-slate-800">+124%</span>
                        <Users size={12} className="text-slate-400" />
                    </div>
                </motion.div>

            </motion.div>

            {/* Floating Labels / Particles */}
            <ParticleSystem controls={controls} />
        </div>
    );
}

function ParticleSystem({ controls }: { controls: any }) {
    // Simple particle layers that activate on "growth"
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={controls}
                    variants={{
                        growth: {
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 1.2],
                            y: [0, -40 - Math.random() * 40],
                            x: [0, (Math.random() - 0.5) * 60],
                            transition: {
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeOut"
                            }
                        }
                    }}
                    className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                    style={{ marginLeft: (Math.random() - 0.5) * 100, marginTop: 20 }}
                />
            ))}
        </div>
    );
} 
