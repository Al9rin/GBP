import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Star } from "lucide-react";
import { useLocation } from "wouter";

export function GoogleMockup() {
    const [, navigate] = useLocation();

    return (
        <div className="h-full w-full bg-white flex flex-col">
            {/* Google Search Bar */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value="therapist near me"
                            readOnly
                            className="flex-1 outline-none text-sm text-gray-700"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-gray-50 p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Business Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                        {/* Header with Logo */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A2AD1A] to-[#8e9915] flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-2xl font-bold">GT</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                        Your Practice Name
                                    </h2>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">4.9 (127 reviews)</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Mental Health Service • Therapy & Counseling
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 text-center space-y-6">
                            <div className="space-y-3">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Get found by therapy seekers in your area. This step-by-step guide will help you
                                    claim and optimize your Google Business Profile in under 25 minutes.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                                <Button
                                    size="lg"
                                    onClick={() => navigate("/guide")}
                                    className="bg-[#A2AD1A] hover:bg-[#8e9915] text-white flex items-center gap-2 shadow-md"
                                >
                                    Get Started <ArrowRight className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-gray-50 p-4 border-t border-gray-100">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-[#A2AD1A]">17</p>
                                    <p className="text-xs text-gray-600 mt-1">Easy Steps</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#A2AD1A]">25</p>
                                    <p className="text-xs text-gray-600 mt-1">Minutes</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#A2AD1A]">100%</p>
                                    <p className="text-xs text-gray-600 mt-1">Free</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Search Results - for visual context */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 opacity-50"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-gray-200" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-100 rounded w-1/2" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
