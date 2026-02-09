import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { StepRenderer } from "@/components/steps/StepRenderer";
import { MobileControls } from "@/components/layout/MobileControls";
import { STEPS } from "@/lib/steps-data";
import { Home, Mail, List, UserPlus, ExternalLink } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { AnimatedBackground } from "@/components/animated/AnimatedBackground";

export default function GuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

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

  const navItems = [
    {
      name: 'Home',
      url: '/',
      icon: Home,
      action: () => window.location.href = '/'
    },
    {
      name: 'Contact us',
      url: '#',
      icon: Mail,
      action: () => window.location.href = "mailto:editor@goodtherapy.org"
    },
    {
      name: 'Navigate to',
      url: '#',
      icon: List,
      children: STEPS.map(step => ({
        name: step.title,
        url: `/guide#step-${step.id}`
      }))
    },
    {
      name: 'Sign up for Google Business Profile',
      url: 'https://business.google.com/create',
      icon: UserPlus,
      iconRight: ExternalLink,
      action: () => window.open('https://business.google.com/create', '_blank'),
      className: "text-[#1a73e8] font-bold hover:text-[#1557b0]"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background Animated Effect */}
      <AnimatedBackground />

      {/* Tubelight Navbar */}
      <NavBar items={navItems} />

      {/* Header Logo - Top Left */}
      <header className="absolute top-6 left-6 z-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/11/GoodTherapy-Logo.png"
            alt="GoodTherapy"
            className="h-6 w-auto pointer-events-auto"
          />
        </motion.div>
      </header>

      {/* Main Guide Content */}
      <div className="flex-1 flex overflow-hidden pt-20 relative z-10">
        {/* Desktop Sidebar */}
        <Sidebar
          currentStep={currentStep}
          completedSteps={[]}
          onStepClick={setCurrentStep}
          className="hidden lg:flex"
        />

        {/* Main Content Area - No white background, just AnimatedBackground shows through */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div className="w-full h-full p-4 lg:p-8">
            <StepRenderer
              stepIndex={currentStep}
              onNext={handleNext}
            />
          </div>
        </main>
      </div>

      <MobileControls
        currentStep={currentStep}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
