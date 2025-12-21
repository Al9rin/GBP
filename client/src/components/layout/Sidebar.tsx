import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/steps-data";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (id: number) => void;
  className?: string;
}

export function Sidebar({ currentStep, completedSteps, onStepClick, className }: SidebarProps) {
  const activeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll sidebar to keep active step in view
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStep]);

  const progress = Math.round((completedSteps.length / STEPS.length) * 100);

  return (
    <aside className={cn("w-80 bg-white border-r border-border h-screen flex flex-col sticky top-0", className)}>
      <div className="p-6 border-b border-border bg-gradient-to-br from-white to-gray-50">
        <h2 className="text-xl font-display font-bold text-secondary mb-1">Setup Guide</h2>
        <p className="text-sm text-muted-foreground mb-4">Google Business Profile</p>
        
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>{progress}% Complete</span>
            <span>{completedSteps.length}/{STEPS.length} Steps</span>
          </div>
          <div className="h-2 w-full bg-secondary/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
        <div className="space-y-1 px-3">
          {STEPS.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === index;
            const isLocked = !isCompleted && !isCurrent && index > 0 && !completedSteps.includes(STEPS[index - 1].id);

            // Allow navigation to any completed step or the immediate next step
            // For demo purposes, we might allow clicking any step, but let's stick to a logical flow logic
            // Actually, for a guide, users often skip around. Let's allow clicking unless heavily restricted.
            const canClick = true; 

            return (
              <div
                key={step.id}
                ref={isCurrent ? activeRef : null}
                onClick={() => canClick && onStepClick(index)}
                className={cn(
                  "group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border border-transparent",
                  isCurrent 
                    ? "bg-secondary/5 text-secondary border-secondary/10 shadow-sm" 
                    : "text-muted-foreground hover:bg-slate-50 hover:text-slate-900",
                  isCompleted && !isCurrent && "text-slate-700"
                )}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted flex items-center justify-center text-[10px] text-muted-foreground font-bold">
                      {step.id}
                    </div>
                  )}
                </div>
                
                <span className="flex-1 truncate">{step.title}</span>
                
                {isCurrent && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="w-1.5 h-1.5 rounded-full bg-secondary"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-border bg-slate-50 text-xs text-center text-muted-foreground">
        © 2024 GoodTherapy, LLC
      </div>
    </aside>
  );
}
