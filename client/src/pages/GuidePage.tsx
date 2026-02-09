import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { StepRenderer } from "@/components/steps/StepRenderer";
import { MobileControls } from "@/components/layout/MobileControls";
import { STEPS } from "@/lib/steps-data";
import { Home, Mail, List, UserPlus, ExternalLink, ChevronDown } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { AnimatedBackground } from "@/components/animated/AnimatedBackground";

export default function GuidePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
    });
  }, []);

  // Read URL hash on mount to support deep linking from other pages
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#step-(\d+)$/);
    if (match) {
      const stepId = parseInt(match[1], 10);
      const index = STEPS.findIndex(s => s.id === stepId);
      if (index >= 0) setCurrentStep(index);
    }
  }, []);

  // Scroll to top whenever step changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Reset indicator on step change
    setShowScrollIndicator(true);
  }, [currentStep]);

  // IntersectionObserver: hide scroll indicator when sentinel (bottom of content) is visible
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const scrollContainer = mainRef.current;
    if (!sentinel || !scrollContainer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollIndicator(!entry.isIntersecting);
      },
      { root: scrollContainer, threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [currentStep]);

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
      iconRight: ExternalLink,
      showEmailPopup: true,
    },
    {
      name: 'Navigate to',
      url: '#',
      icon: List,
      children: STEPS.map((step, index) => ({
        name: step.title,
        url: `/guide#step-${step.id}`,
        action: () => setCurrentStep(index)
      }))
    },
    {
      name: 'Sign up for Google Business Profile',
      url: 'https://business.google.com/ca-en/business-profile/?ppsrc=GPDA2',
      icon: UserPlus,
      iconRight: ExternalLink,
      action: () => window.open('https://business.google.com/ca-en/business-profile/?ppsrc=GPDA2', '_blank'),
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
          <a href="https://www.goodtherapy.org" target="_blank" rel="noopener noreferrer" className="pointer-events-auto">
            <img
              src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/11/GoodTherapy-Logo.png"
              alt="GoodTherapy"
              className="h-6 w-auto hover:opacity-80 transition-opacity"
            />
          </a>
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

        {/* Main Content Area */}
        <main ref={mainRef} className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div className="w-full p-4 lg:p-8">
            <StepRenderer
              stepIndex={currentStep}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
          {/* Sentinel at bottom of content — IntersectionObserver watches this */}
          <div ref={sentinelRef} className="h-1" />

          {/* Inline scroll-down indicator: sticky gradient + bouncing arrow */}
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="sticky bottom-0 left-0 right-0 h-24 pointer-events-none z-30 -mt-24"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
                <motion.div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-6 h-6 text-slate-400" strokeWidth={2} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
