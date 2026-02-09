import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StepRenderer } from "@/components/steps/StepRenderer";
import { MobileControls } from "@/components/layout/MobileControls";
import { useProgress, useUpdateProgress } from "@/hooks/use-progress";
import { STEPS } from "@/lib/steps-data";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function GuidePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { data: progressData, isLoading } = useProgress();
  const { mutate: updateProgress, isPending } = useUpdateProgress();
  const { user } = useAuth();
  const { toast } = useToast();

  const completedStepIds = progressData
    ? progressData.filter(p => p.status === 'completed').map(p => p.stepId)
    : [];

  // Initialize current step to first incomplete step on load
  useEffect(() => {
    if (progressData && progressData.length > 0) {
      const lastCompleted = Math.max(...progressData.filter(p => p.status === 'completed').map(p => p.stepId), 0);
      const nextStepIndex = STEPS.findIndex(s => s.id > lastCompleted);
      if (nextStepIndex !== -1) {
        setCurrentStep(nextStepIndex);
      } else if (lastCompleted === STEPS[STEPS.length - 1].id) {
        // All done
        setCurrentStep(STEPS.length - 1);
      }
    }
  }, [isLoading]); // Only run once when data loads

  const handleStepComplete = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to save your progress.",
        variant: "destructive",
      });
      return;
    }

    const currentStepId = STEPS[currentStep].id;

    updateProgress({ stepId: currentStepId, status: "completed" }, {
      onSuccess: () => {
        toast({
          title: "Step Completed!",
          description: "Progress saved.",
          className: "bg-green-50 border-green-200 text-green-800",
        });

        // Auto advance after short delay
        if (currentStep < STEPS.length - 1) {
          setTimeout(() => setCurrentStep(prev => prev + 1), 500);
        }
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to save progress. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const isCurrentStepCompleted = completedStepIds.includes(STEPS[currentStep].id);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        currentStep={currentStep}
        completedSteps={completedStepIds}
        onStepClick={setCurrentStep}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar
          currentStep={currentStep}
          completedSteps={completedStepIds}
          onStepClick={setCurrentStep}
          className="hidden lg:flex"
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/50 via-white to-white">
          <div className="w-full h-full p-4 lg:p-8">
            <StepRenderer
              stepIndex={currentStep}
              onComplete={handleStepComplete}
              isCompleted={isCurrentStepCompleted}
              isPending={isPending}
            />
          </div>
        </main>
      </div>

      <MobileControls
        currentStep={currentStep}
        onNext={handleNext}
        onPrev={handlePrev}
        isCompleted={isCurrentStepCompleted}
      />
    </div>
  );
}
