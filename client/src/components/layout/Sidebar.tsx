import React from "react";
import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/steps-data";
import { motion } from "framer-motion";

interface SidebarProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (id: number) => void;
  className?: string;
}

export function Sidebar({ currentStep, completedSteps, onStepClick, className }: SidebarProps) {
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <aside className={cn("w-72 bg-white/80 backdrop-blur-xl border-r border-border/50 h-screen flex flex-col sticky top-0 shadow-xl", className)}>
      {/* Header */}
      <div className="p-5 border-b border-border/50 bg-gradient-to-br from-white to-slate-50/50">
        <h2 className="text-lg font-display font-bold text-secondary mb-1">Setup Guide</h2>
        <p className="text-xs text-muted-foreground mb-3">Google Business Profile</p>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#A2AD1A] to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* All 17 Steps - Compact Grid View */}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="grid grid-cols-1 gap-0.5">
          {STEPS.map((step, index) => {
            const isCurrent = currentStep === index;
            const isPast = index < currentStep;

            return (
              <motion.div
                key={step.id}
                onClick={() => onStepClick(index)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200",
                  isCurrent
                    ? "bg-gradient-to-r from-[#A2AD1A]/10 to-green-50 text-secondary border border-[#A2AD1A]/20 shadow-sm"
                    : isPast
                      ? "text-slate-600 hover:bg-slate-50"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                )}
              >
                {/* Step Number */}
                <div className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors",
                  isCurrent
                    ? "bg-[#A2AD1A] text-white shadow-md"
                    : isPast
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-400"
                )}>
                  {isPast ? "✓" : step.id}
                </div>

                {/* Step Title - Truncated */}
                <span className="flex-1 truncate leading-tight">{step.title}</span>

                {/* Current Indicator */}
                {isCurrent && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="w-1 h-4 rounded-full bg-[#A2AD1A]"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border/50 bg-slate-50/50 text-[10px] text-center text-muted-foreground">
        © 2026 GoodTherapy, LLC
      </div>
    </aside>
  );
}
