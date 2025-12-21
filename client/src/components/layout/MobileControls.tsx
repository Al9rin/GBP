import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { STEPS } from "@/lib/steps-data";
import { motion } from "framer-motion";

interface MobileControlsProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  isCompleted: boolean;
}

export function MobileControls({ currentStep, onNext, onPrev, isCompleted }: MobileControlsProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 lg:hidden z-40 pb-safe">
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrev}
          disabled={isFirst}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Step {currentStep + 1}</span>
            <span>{STEPS.length}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full">
            <motion.div 
              className="h-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>

        <Button
          onClick={onNext}
          className={`rounded-full shadow-lg ${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-secondary hover:bg-secondary/90'}`}
          size="icon"
        >
          {isLast ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
}
