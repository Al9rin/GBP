import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/steps-data";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SidebarProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (id: number) => void;
  className?: string;
}

export function Sidebar({ currentStep, completedSteps, onStepClick, className }: SidebarProps) {
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active step into view whenever currentStep changes
  useEffect(() => {
    if (activeRef.current && listRef.current) {
      const list = listRef.current;
      const item = activeRef.current;
      const listRect = list.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Calculate desired scroll: place active item roughly 1/3 from the top of the list
      const targetOffset = listRect.height * 0.3;
      const currentOffsetInList = item.offsetTop - list.offsetTop;
      const scrollTo = currentOffsetInList - targetOffset;

      list.scrollTo({
        top: Math.max(0, scrollTo),
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  return (
    <aside className={cn(
      "w-80 h-screen flex flex-col sticky top-0",
      "bg-gradient-to-b from-white/80 via-white/60 to-white/70",
      "backdrop-blur-3xl",
      "border-r border-white/50",
      "shadow-[4px_0_24px_-2px_rgba(0,0,0,0.08)]",
      className
    )}>
      {/* Header */}
      <div className="p-5 pb-4 border-b border-white/30">
        {/* Logo + Title Row */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/08/cropped-GT-Logo-icon.png"
            alt="GoodTherapy"
            className="w-8 h-8 rounded-xl shadow-md shadow-[#A2AD1A]/20 object-cover"
          />
          <div>
            <h2 className="text-sm font-bold text-slate-800 leading-tight">Setup Guide</h2>
            <p className="text-[10px] text-slate-400 font-medium">Google Business Profile</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <motion.span
              key={currentStep}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold text-[#E06D00] bg-[#E06D00]/10 px-2 py-0.5 rounded-full"
            >
              Step {currentStep + 1} of {STEPS.length}
            </motion.span>
            <span className="text-[10px] font-bold text-slate-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100/80 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#A2AD1A] to-[#c4d030] relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-slide" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div ref={listRef} className="flex-1 py-2 px-2 overflow-y-auto custom-scrollbar scroll-smooth">
        <div className="space-y-0.5">
          {STEPS.map((step, index) => {
            const isCurrent = currentStep === index;
            const isPast = index < currentStep;

            return (
              <motion.div
                key={step.id}
                ref={isCurrent ? activeRef : undefined}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                onClick={() => onStepClick(index)}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium cursor-pointer transition-all duration-300",
                  isCurrent
                    ? "bg-white shadow-md shadow-slate-200/50 border border-slate-200"
                    : isPast
                      ? "bg-white/40 hover:bg-white/70 text-slate-600 border border-transparent hover:border-white/50"
                      : "bg-transparent hover:bg-white/50 text-slate-400 hover:text-slate-600 border border-transparent"
                )}
              >
                {/* Active indicator bar */}
                {isCurrent && (
                  <motion.div
                    layoutId="sidebar-active-bar"
                    className="absolute left-0 top-0 bottom-0 my-auto w-[3px] h-5 rounded-full bg-[#A2AD1A]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Step Number / Check */}
                <div className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-200",
                  isCurrent
                    ? "bg-gradient-to-br from-[#A2AD1A] to-[#8e9915] text-white shadow-sm shadow-[#A2AD1A]/30"
                    : isPast
                      ? "bg-[#A2AD1A]/10 text-[#A2AD1A]"
                      : "bg-slate-100/80 text-slate-400"
                )}>
                  {isPast ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    step.id
                  )}
                </div>

                {/* Step Title */}
                <span className={cn(
                  "flex-1 truncate leading-tight transition-colors",
                  isCurrent ? "text-slate-900 font-semibold" : ""
                )}>
                  {step.title}
                </span>

                {/* Active dot indicator */}
                {isCurrent && (
                  <motion.div
                    layoutId="sidebar-dot"
                    className="w-2 h-2 rounded-full bg-[#A2AD1A] flex-shrink-0 self-center"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/30">
        <div className="flex items-center justify-center">
          <span className="text-[10px] text-slate-400 font-medium">
            © 2026 GoodTherapy, LLC
          </span>
        </div>
      </div>
    </aside>
  );
}
