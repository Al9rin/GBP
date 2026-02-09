import { ChevronLeft, ChevronRight } from "lucide-react";
import { STEPS } from "@/lib/steps-data";
import { motion } from "framer-motion";

interface MobileControlsProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
}

export function MobileControls({ currentStep, onNext, onPrev }: MobileControlsProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/50 p-4 lg:hidden z-40 pb-safe shadow-2xl shadow-slate-200/50">
      <div className="flex items-center gap-4 max-w-md mx-auto">
        {/* Previous Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          disabled={isFirst}
          className="rounded-full p-3 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </motion.button>

        {/* Progress */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex justify-between text-[10px] font-semibold text-slate-500">
            <span>Step {currentStep + 1}</span>
            <span>{STEPS.length} total</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#A2AD1A] to-[#c4d030]"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>

        {/* Next Button - Shimmer Style */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={onNext}
          disabled={isLast}
          className="relative rounded-full p-3 bg-gradient-to-r from-[#A2AD1A] to-[#c4d030] text-white shadow-lg shadow-[#A2AD1A]/20 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 animate-shimmer-slide bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <ChevronRight className="w-5 h-5 relative z-10" />
        </motion.button>
      </div>
    </div>
  );
}
