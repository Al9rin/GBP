import { STEPS } from "@/lib/steps-data";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, Sparkles, Search, Globe, TrendingUp,
  ClipboardCheck, LogIn, Building2, Tags, MapPin, Phone, Shield,
  Clock, Calendar, Camera, Send, ArrowRightCircle, Lock, ListChecks,
  Lightbulb, Info, AlertTriangle, ChevronRight, ChevronLeft, ExternalLink, Mail, Copy
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { EmailPopup } from "@/components/ui/EmailPopup";
import { GoogleSearchMockup, GoogleMapsMockup } from "@/components/animated/ScreenshotMockups";
import IntroductionVisual from "@/components/animated/IntroductionVisual";
import {
  Step3Visual, Step4Visual, Step5Visual, Step6Visual, Step7Visual,
  Step8Visual, Step9Visual, Step10Visual, Step11Visual, Step12Visual,
  Step13Visual, Step14Visual, Step15Visual, Step16Visual, Step17Visual
} from "./StepVisuals";
import { cn } from "@/lib/utils";

interface StepRendererProps {
  stepIndex: number;
  onNext: () => void;
  onPrev?: () => void;
}

// Map icons
const STEP_ICONS = [
  Sparkles, Globe, TrendingUp, ClipboardCheck, LogIn, Building2,
  Tags, MapPin, Phone, Shield, Clock, Calendar, Camera, Send,
  ArrowRightCircle, Lock, ListChecks
];

export function StepRenderer({ stepIndex, onNext, onPrev }: StepRendererProps) {
  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const isFirstStep = stepIndex === 0;
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepIndex]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 lg:px-8 py-6 font-display relative">
      {/* Floating Navigation Arrows — Desktop Only */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {!isFirstStep && onPrev && (
            <motion.button
              key="prev-arrow"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              whileHover={{ scale: 1.15, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPrev}
              className="fixed left-[calc(20rem+2.5rem)] top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-[#A2AD1A]/30 shadow-lg shadow-[#A2AD1A]/10 flex items-center justify-center text-[#A2AD1A] hover:bg-[#A2AD1A] hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isLastStep && (
            <motion.button
              key="next-arrow"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              whileHover={{ scale: 1.15, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              className="fixed right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-[#A2AD1A]/30 shadow-lg shadow-[#A2AD1A]/10 flex items-center justify-center text-[#A2AD1A] hover:bg-[#A2AD1A] hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Main Card Container */}
          <div className="relative bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 min-h-[600px] p-8 lg:p-16 transition-all duration-500">

            {/* 1. Header & Text Content */}
            <div className="max-w-3xl mx-auto text-center mb-10">
              {/* Step Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-lg mb-5 shadow-md shadow-orange-500/20"
              >
                {step.id}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-serif font-semibold italic text-orange-500 mb-4 leading-tight tracking-tight"
              >
                {step.title.includes('\n') ? step.title.split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                )) : step.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-500 font-medium mb-8 leading-relaxed font-display"
              >
                {step.description}
              </motion.p>

              {/* Body Content */}
              <div className="text-left max-w-none font-display">
                <ContentBody content={step.content} stepId={step.id} />
              </div>
            </div>

            {/* 2. Visual for this step */}
            <InViewStepVisual stepId={step.id} />

            {/* 3. Footer: Coming Up + Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-3xl mx-auto pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              {/* Coming Up Section */}
              <div className="text-center md:text-left">
                {!isLastStep && STEPS[stepIndex + 1] && (
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Coming Up Next</span>
                    <h4 className="text-sm font-semibold text-slate-700">{STEPS[stepIndex + 1].title}</h4>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {isLastStep ? (
                <div className="relative w-full flex justify-center mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShimmerButton
                      onClick={() => setShowEmailPopup(true)}
                      className="h-14 px-8 shadow-xl shadow-[#A2AD1A]/20"
                      background="#A2AD1A"
                    >
                      <Mail className="w-5 h-5 mr-2 text-white" />
                      <span className="text-base font-bold tracking-wide mr-2 text-white">
                        Email Your Google Business Profile Link
                      </span>
                      <ExternalLink className="w-4 h-4 opacity-70 text-white" />
                    </ShimmerButton>
                  </motion.div>
                  <EmailPopup open={showEmailPopup} onClose={() => setShowEmailPopup(false)} />
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShimmerButton
                    onClick={onNext}
                    className="h-14 px-10 shadow-xl shadow-[#A2AD1A]/20 w-full md:w-auto"
                    background="#A2AD1A"
                  >
                    <span className="text-lg font-bold tracking-wide mr-2 text-white">
                      Next Step
                    </span>
                    <ArrowRight className="w-5 h-5 opacity-90 text-white group-hover:translate-x-1 transition-transform" />
                  </ShimmerButton>
                </motion.div>
              )}
            </motion.div>

          </div>
        </motion.div >
      </AnimatePresence >
    </div >
  );
}

/* -------------------------------------------------------------------------- */
/*                          Step Visual Router                                 */
/* -------------------------------------------------------------------------- */

function InViewStepVisual({ stepId }: { stepId: number }) {
  const { ref, isInView } = useInViewAnimation(0.15, true);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-4xl mx-auto mb-16 relative z-10"
      >
        <StepVisual stepId={stepId} isInView={isInView} />
      </motion.div>
    </div>
  );
}

function StepVisual({ stepId, isInView }: { stepId: number; isInView: boolean }) {
  switch (stepId) {
    case 1: return <IntroductionVisual />;
    case 2: return <StepTwoVisual />;
    case 3: return <Step3Visual />;
    case 4: return <Step4Visual />;
    case 5: return <Step5Visual isInView={isInView} />;
    case 6: return <Step6Visual isInView={isInView} />;
    case 7: return <Step7Visual isInView={isInView} />;
    case 8: return <Step8Visual isInView={isInView} />;
    case 9: return <Step9Visual isInView={isInView} />;
    case 10: return <Step10Visual isInView={isInView} />;
    case 11: return <Step11Visual isInView={isInView} />;
    case 12: return <Step12Visual isInView={isInView} />;
    case 13: return <Step13Visual isInView={isInView} />;
    case 14: return <Step14Visual isInView={isInView} />;
    case 15: return <Step15Visual isInView={isInView} />;
    case 16: return <Step16Visual isInView={isInView} />;
    case 17: return <Step17Visual />;
    default: return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                     Step 2 Visual (kept inline)                             */
/* -------------------------------------------------------------------------- */

function StepTwoVisual() {
  const [mode, setMode] = useState<'search' | 'maps'>('search');

  useEffect(() => {
    const timer = setInterval(() => {
      setMode(prev => prev === 'search' ? 'maps' : 'search');
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative max-w-3xl mx-auto">
      <div className="w-full aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 relative">
        <div className="h-9 bg-slate-50 border-b flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 mx-4 h-6 bg-white rounded-md border border-slate-200 shadow-sm flex items-center justify-center text-[10px] text-slate-400 font-medium">
            google.com
          </div>
        </div>
        <div className="relative w-full h-full bg-slate-100">
          <AnimatePresence mode="wait">
            {mode === 'search' ? (
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="w-full h-full">
                  <GoogleSearchMockup />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="maps"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="w-full h-full">
                  <GoogleMapsMockup highlightPin={true} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setMode('search')}
          className={cn("px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm", mode === 'search' ? "bg-orange-100 text-orange-600 shadow-orange-100 ring-2 ring-orange-500/20" : "bg-slate-100 text-slate-400 hover:bg-slate-200")}
        >
          Google Search
        </button>
        <button
          onClick={() => setMode('maps')}
          className={cn("px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm", mode === 'maps' ? "bg-orange-100 text-orange-600 shadow-orange-100 ring-2 ring-orange-500/20" : "bg-slate-100 text-slate-400 hover:bg-slate-200")}
        >
          Google Maps
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Improved Content Body                               */
/* -------------------------------------------------------------------------- */

function ContentBody({ content, stepId }: any) {
  const processText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(<strong>.*?<\/strong>|<a-gt>.*?<\/a-gt>|<a-gbp>.*?<\/a-gbp>|<a-email>.*?<\/a-email>|<kw>.*?<\/kw>|<why>.*?<\/why>)/g);
    return parts.map((part: string, i: number) => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        return (
          <span key={i} className="font-extrabold text-[#A2AD1A] tracking-wide">
            {part.replace(/<\/?strong>/g, '')}
          </span>
        );
      }
      if (part.startsWith('<a-gt>') && part.endsWith('</a-gt>')) {
        return (
          <a
            key={i}
            href="https://www.goodtherapy.org/login.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#A2AD1A] hover:text-[#8e9915] underline decoration-[#A2AD1A]/30 hover:decoration-[#A2AD1A] transition-colors"
          >
            {part.replace(/<\/?a-gt>/g, '')}
          </a>
        );
      }
      if (part.startsWith('<a-gbp>') && part.endsWith('</a-gbp>')) {
        return (
          <a
            key={i}
            href="https://business.google.com/ca-en/business-profile/?ppsrc=GPDA2"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#1a73e8] hover:text-[#1557b0] underline decoration-[#1a73e8]/30 hover:decoration-[#1a73e8] transition-colors"
          >
            {part.replace(/<\/?a-gbp>/g, '')}
          </a>
        );
      }
      if (part.startsWith('<a-email>') && part.endsWith('</a-email>')) {
        const email = part.replace(/<\/?a-email>/g, '');
        return (
          <a
            key={i}
            href={`mailto:${email}`}
            className="font-bold text-[#1a73e8] hover:text-[#1557b0] underline decoration-[#1a73e8]/30 hover:decoration-[#1a73e8] transition-colors"
          >
            {email}
          </a>
        );
      }
      if (part.startsWith('<kw>') && part.endsWith('</kw>')) {
        return (
          <span key={i} className="font-bold text-[#A2AD1A]">
            {part.replace(/<\/?kw>/g, '')}
          </span>
        );
      }
      if (part.startsWith('<why>') && part.endsWith('</why>')) {
        return (
          <span key={i} className="block mt-4 mb-1 text-base font-extrabold text-orange-500 tracking-wide">
            {part.replace(/<\/?why>/g, '')}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-8">
      {/* Intro Text */}
      {content.intro && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[17px] text-slate-700 leading-[1.8] font-display"
        >
          {processText(content.intro)}
        </motion.p>
      )}

      {/* Section Heading */}
      {content.heading && (
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-slate-800 flex items-center gap-2 mt-8"
        >
          <div className="w-1.5 h-6 bg-orange-400 rounded-full" />
          {content.heading}
        </motion.h3>
      )}

      {/* Feature Cards (Step 2) */}
      {content.featureList && (
        <div className="grid md:grid-cols-2 gap-4 my-6">
          {content.featureList.map((feature: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                feature.icon === 'search' ? "bg-blue-100 text-blue-600" : "bg-[#A2AD1A]/10 text-[#A2AD1A]"
              )}>
                {feature.icon === 'search' ? <Search size={20} /> : <MapPin size={20} />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{feature.title}</h3>
                <p className="text-[17px] text-slate-500 leading-[1.8]">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Paragraphs */}
      {content.paragraphs?.map((p: string, i: number) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="text-[17px] text-slate-700 leading-[1.8] font-display"
        >
          {processText(p)}
        </motion.p>
      ))}

      {/* Simple Bullet List */}
      {content.list && (
        <ul className="space-y-3.5 my-4">
          {content.list.map((item: string, i: number) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className="mt-2.5 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
              <span className="text-slate-700 text-[17px] leading-[1.8]">{processText(item)}</span>
            </motion.li>
          ))}
        </ul>
      )}

      {/* Numbered Steps */}
      {content.steps && (
        <div className="space-y-3 my-6">
          {content.steps.map((stepText: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-blue-50/50 to-slate-50 border border-slate-100 hover:from-blue-50 hover:to-slate-100 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-md">
                {i + 1}
              </div>
              <p className="text-[17px] text-slate-700 leading-[1.8] font-display font-medium">{processText(stepText)}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Flow Steps (Step 3 only — Step 15 uses Step15Visual instead) */}
      {content.flowSteps && stepId !== 15 && (() => {
        // Icon mapping for flow steps
        const flowIcons: Record<string, React.ElementType> = {
          'google': Search,
          'listing': Building2,
          'goodtherapy': Globe,
          'contact': Phone,
          'search': Search,
          'profile': Globe,
          'review': Globe,
          'click': ExternalLink,
        };

        const getFlowIcon = (text: string): React.ElementType => {
          const lower = text.toLowerCase();
          if (lower.includes('google search') || lower.includes('searches') || lower.includes('search')) return Search;
          if (lower.includes('google listing') || lower.includes('listing appears') || lower.includes('your google')) return Building2;
          if (lower.includes('goodtherapy') || lower.includes('profile') || lower.includes('review')) return Globe;
          if (lower.includes('contact') || lower.includes('request')) return Phone;
          if (lower.includes('click')) return ExternalLink;
          return ArrowRight;
        };

        const getFlowColor = (i: number, total: number) => {
          if (i === 0) return { bg: 'bg-blue-50', text: 'text-[#1a73e8]', border: 'border-blue-200', iconBg: 'bg-blue-100', dot: 'bg-[#1a73e8]' };
          if (i === total - 1) return { bg: 'bg-green-50', text: 'text-[#A2AD1A]', border: 'border-green-200', iconBg: 'bg-green-100', dot: 'bg-[#A2AD1A]' };
          return { bg: 'bg-orange-50', text: 'text-[#E06D00]', border: 'border-orange-200', iconBg: 'bg-orange-100', dot: 'bg-[#E06D00]' };
        };

        return (
          <div className="my-8">
            {/* Desktop: Horizontal flow */}
            <div className="hidden md:block">
              <div className="relative flex items-stretch justify-center gap-0">
                {content.flowSteps.map((flowStep: string, i: number) => {
                  const Icon = getFlowIcon(flowStep);
                  const colors = getFlowColor(i, content.flowSteps.length);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
                      className="flex items-center"
                    >
                      <div className={cn(
                        "flex flex-col items-center gap-2.5 px-5 py-4 rounded-2xl border shadow-sm min-w-[140px] max-w-[170px]",
                        colors.bg, colors.border
                      )}>
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.iconBg)}>
                          <Icon size={20} className={colors.text} />
                        </div>
                        <span className={cn("text-xs font-bold text-center leading-tight", colors.text)}>
                          {processText(flowStep)}
                        </span>
                        <div className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
                      </div>
                      {i < content.flowSteps.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.12 + 0.15 }}
                          className="mx-1.5 flex items-center"
                        >
                          <div className="w-6 h-[2px] bg-slate-200 rounded-full" />
                          <ChevronRight className="w-4 h-4 text-slate-300 -ml-1" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Vertical flow */}
            <div className="block md:hidden">
              <div className="flex flex-col items-center gap-0">
                {content.flowSteps.map((flowStep: string, i: number) => {
                  const Icon = getFlowIcon(flowStep);
                  const colors = getFlowColor(i, content.flowSteps.length);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className={cn(
                        "flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-sm w-full max-w-[300px]",
                        colors.bg, colors.border
                      )}>
                        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", colors.iconBg)}>
                          <Icon size={18} className={colors.text} />
                        </div>
                        <span className={cn("text-sm font-bold leading-tight", colors.text)}>
                          {processText(flowStep)}
                        </span>
                      </div>
                      {i < content.flowSteps.length - 1 && (
                        <div className="h-5 flex items-center justify-center">
                          <div className="w-[2px] h-full bg-slate-200 rounded-full" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Options / Choices (Step 8) */}
      {content.options && (
        <div className="space-y-4 my-6 mb-12">
          {content.question && (
            <p className="text-base font-medium text-slate-700 mb-4">{content.question}</p>
          )}
          {content.options.map((option: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-5 rounded-2xl border-2 transition-all",
                idx === 0
                  ? "bg-blue-50/50 border-blue-200 shadow-sm"
                  : "bg-green-50/50 border-green-200 shadow-sm"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  idx === 0 ? "bg-blue-600 text-white" : "bg-[#A2AD1A] text-white"
                )}>
                  {idx === 0 ? <Building2 size={16} /> : <MapPin size={16} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{option.label}</h4>
                  <p className="text-[17px] text-slate-600 leading-[1.8]">{option.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Verification Methods (Step 10) */}
      {content.methods && (
        <div className="grid grid-cols-2 gap-3 my-6">
          {content.methods.map((method: any, idx: number) => {
            const colorMap = [
              { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700' },
              { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700' },
              { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-700' },
              { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700' },
            ];
            const c = colorMap[idx % colorMap.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                className={`p-4 rounded-xl ${c.bg} border ${c.border} shadow-sm`}
              >
                <h4 className={`font-bold text-base ${c.text} mb-1`}>{method.name}</h4>
                <p className="text-[17px] text-slate-600 leading-[1.8]">{method.steps}</p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Sections (Step 11, 14) */}
      {content.sections && (
        <div className="space-y-6 my-6">
          {content.sections.map((section: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl bg-slate-50/80 border border-slate-100 overflow-hidden"
            >
              {section.heading && (
                <div className="px-5 py-3 bg-slate-100/80 border-b border-slate-200">
                  <h4 className="font-bold text-slate-800 text-sm">{section.heading}</h4>
                </div>
              )}
              <div className="p-5 space-y-3">
                {/* Section bullets */}
                {section.bullets?.map((bullet: string, bi: number) => (
                  <div key={bi} className="flex items-start gap-3">
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-[17px] text-slate-700 leading-[1.8]">{processText(bullet)}</span>
                  </div>
                ))}
                {/* Section paragraphs */}
                {section.paragraphs?.map((p: string, pi: number) => (
                  <p key={pi} className="text-[17px] text-slate-600 leading-[1.8] font-display">{processText(p)}</p>
                ))}
                {/* Section steps */}
                {section.steps?.map((stepText: string, si: number) => (
                  <div key={si} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {si + 1}
                    </div>
                    <p className="text-[17px] text-slate-700 leading-[1.8] font-display flex items-center gap-2 flex-wrap">
                      {processText(stepText)}
                      {(stepText.includes("Copy link") || stepText.includes("Copy the link")) && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                          <Copy size={12} /> Copy
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
              {/* Section example */}
              {section.example && (
                <div className="px-5 pb-5">
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 relative">
                    <div className="absolute -top-2 left-4 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Example
                    </div>
                    <p className="text-[17px] text-slate-700 italic leading-[1.8] mt-1">{processText(section.example)}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Guidelines (Step 16 privacy) */}
      {content.guidelines && (
        <div className="space-y-2.5 my-6">
          {content.guidelines.map((guideline: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-red-50/60 border border-red-100"
            >
              <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle size={12} />
              </div>
              <span className="text-[17px] text-slate-700 leading-[1.8] font-medium">{guideline}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tip Callout */}
      {
        content.tip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm ring-1 ring-amber-200/50"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shrink-0">
                <Lightbulb size={16} />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pro Tip</span>
                <p className="text-[17px] text-slate-700 leading-[1.8] mt-1">{processText(content.tip)}</p>
              </div>
            </div>
          </motion.div>
        )
      }

      {/* Note Callout */}
      {
        content.note && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                <Info size={16} />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Note</span>
                <p className="text-[17px] text-slate-700 leading-[1.8] mt-1">{processText(content.note)}</p>
              </div>
            </div>
          </motion.div>
        )
      }

      {/* Privacy Tip Callout */}
      {
        content.privacyTip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
                <Shield size={16} />
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Privacy</span>
                <p className="text-[17px] text-slate-700 leading-[1.8] mt-1">{processText(content.privacyTip)}</p>
              </div>
            </div>
          </motion.div>
        )
      }

      {/* Example Block */}
      {
        content.example && !content.sections && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-5 rounded-2xl bg-amber-50 border border-amber-200 relative"
          >
            <div className="absolute -top-2.5 left-4 bg-amber-400 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Example
            </div>
            <p className="text-[17px] text-slate-700 italic leading-[1.8] mt-1">{content.example}</p>
          </motion.div>
        )
      }

      {/* Interactive Checklist (Step 4 & 17) */}
      {content.items && <InteractiveChecklist content={content} stepId={stepId} />}

      {/* What Happens Next (Step 17) */}
      {
        content.whatHappensNext && (
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#A2AD1A] rounded-full" />
              {content.whatHappensNext.heading}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.whatHappensNext.sections.map((section: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "p-5 rounded-2xl border-2 shadow-sm",
                    idx === 0
                      ? "bg-orange-50/50 border-orange-200"
                      : "bg-green-50/50 border-green-200"
                  )}
                >
                  <h4 className={cn(
                    "font-bold text-sm mb-3",
                    idx === 0 ? "text-orange-700" : "text-[#A2AD1A]"
                  )}>
                    {section.title}
                  </h4>
                  <div className="space-y-2">
                    {/* Section bullets */}
                    {section.bullets?.map((bullet: string, bi: number) => (
                      <div key={bi} className="flex items-start gap-3">
                        <div className="mt-2.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-[17px] text-slate-700 leading-[1.8]">{processText(bullet)}</span>
                      </div>
                    ))}
                    {/* Section paragraphs */}
                    {section.paragraphs?.map((p: string, pi: number) => (
                      <p key={pi} className="text-[17px] text-slate-600 leading-[1.8] font-display">{processText(p)}</p>
                    ))}
                    {/* Section steps */}
                    {section.steps.map((s: string, si: number) => (
                      <div key={si} className="flex items-start gap-2">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5",
                          idx === 0 ? "bg-orange-500" : "bg-[#A2AD1A]"
                        )}>
                          {si + 1}
                        </div>
                        <p className="text-[17px] text-slate-700 leading-[1.8]">{processText(s)}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      }

      {/* Conclusion */}
      {
        content.conclusion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
          >
            <p className="text-[17px] text-slate-700 leading-[1.8] font-medium">{processText(content.conclusion)}</p>
          </motion.div>
        )
      }
    </div >
  );
}

/* -------------------------------------------------------------------------- */
/*                          Interactive Checklist                               */
/* -------------------------------------------------------------------------- */

// Step 4 checklist icon map — keyed by item index
const STEP4_ICONS: React.ElementType[] = [Building2, MapPin, Phone, Search, Globe];

function InteractiveChecklist({ content, stepId }: any) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(content.items?.length || 0).fill(false));
  const toggleItem = (idx: number) => setCheckedItems(prev => { const n = [...prev]; n[idx] = !n[idx]; return n; });

  const processChecklistText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(<strong>.*?<\/strong>|<a-gt>.*?<\/a-gt>|<a-gbp>.*?<\/a-gbp>|<a-email>.*?<\/a-email>|<kw>.*?<\/kw>|<why>.*?<\/why>)/g);
    return parts.map((part: string, i: number) => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        return <span key={i} className="font-extrabold text-[#A2AD1A] tracking-wide">{part.replace(/<\/?strong>/g, '')}</span>;
      }
      if (part.startsWith('<a-gt>') && part.endsWith('</a-gt>')) {
        return <a key={i} href="https://www.goodtherapy.org/login.html" target="_blank" rel="noopener noreferrer" className="font-bold text-[#A2AD1A] hover:text-[#8e9915] underline decoration-[#A2AD1A]/30 hover:decoration-[#A2AD1A] transition-colors" onClick={(e) => e.stopPropagation()}>{part.replace(/<\/?a-gt>/g, '')}</a>;
      }
      if (part.startsWith('<a-gbp>') && part.endsWith('</a-gbp>')) {
        return <a key={i} href="https://business.google.com/ca-en/business-profile/?ppsrc=GPDA2" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1a73e8] hover:text-[#1557b0] underline decoration-[#1a73e8]/30 hover:decoration-[#1a73e8] transition-colors" onClick={(e) => e.stopPropagation()}>{part.replace(/<\/?a-gbp>/g, '')}</a>;
      }
      if (part.startsWith('<a-email>') && part.endsWith('</a-email>')) {
        const email = part.replace(/<\/?a-email>/g, '');
        return <a key={i} href={`mailto:${email}`} className="font-bold text-[#1a73e8] hover:text-[#1557b0] underline decoration-[#1a73e8]/30 hover:decoration-[#1a73e8] transition-colors" onClick={(e) => e.stopPropagation()}>{email}</a>;
      }
      if (part.startsWith('<kw>') && part.endsWith('</kw>')) {
        return <span key={i} className="font-bold text-[#A2AD1A]">{part.replace(/<\/?kw>/g, '')}</span>;
      }
      if (part.startsWith('<why>') && part.endsWith('</why>')) {
        return <span key={i} className="block mt-4 mb-1 text-base font-extrabold text-orange-500 tracking-wide">{part.replace(/<\/?why>/g, '')}</span>;
      }
      return part;
    });
  };
  const checkedCount = checkedItems.filter(Boolean).length;
  const total = checkedItems.length;
  const hasIcons = stepId === 4;

  return (
    <div className="rounded-2xl bg-slate-50/80 p-6 border border-slate-100 space-y-4 my-6">
      {/* Progress header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 text-sm">
          {stepId === 17 ? "Final Verification" : "Your Checklist"}
        </h3>
        <span className="text-xs font-bold text-slate-400">
          {checkedCount}/{total} complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#A2AD1A] rounded-full"
          animate={{ width: `${(checkedCount / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Items */}
      <div className="space-y-2.5 mt-4">
        {content.items?.map((item: string, idx: number) => {
          const IconComponent = hasIcons && idx < STEP4_ICONS.length ? STEP4_ICONS[idx] : null;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => toggleItem(idx)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all bg-white hover:bg-slate-50",
                checkedItems[idx]
                  ? "border-green-200 shadow-sm shadow-green-100/50"
                  : "border-slate-200"
              )}
            >
              {/* Checkbox circle */}
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
                checkedItems[idx] ? "bg-[#A2AD1A] text-white" : "bg-slate-200 text-slate-400"
              )}>
                <CheckCircle size={16} />
              </div>

              {/* Icon (Step 4 only) */}
              {IconComponent && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.06, type: "spring", stiffness: 300 }}
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    checkedItems[idx]
                      ? "bg-[#A2AD1A]/10"
                      : "bg-orange-50"
                  )}
                >
                  <IconComponent
                    size={18}
                    className={cn(
                      "transition-colors",
                      checkedItems[idx] ? "text-[#A2AD1A]" : "text-[#E06D00]"
                    )}
                  />
                </motion.div>
              )}

              {/* Text */}
              <span className={cn(
                "text-[17px] leading-[1.8] transition-colors flex-1",
                checkedItems[idx] ? "text-green-800 line-through opacity-60" : "text-slate-700"
              )}>
                {processChecklistText(item)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
