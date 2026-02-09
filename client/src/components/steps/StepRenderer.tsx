import { STEPS } from "@/lib/steps-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, Sparkles, Search, Globe, TrendingUp,
  ClipboardCheck, LogIn, Building2, Tags, MapPin, Phone, Shield,
  Clock, Calendar, Camera, Send, ArrowRightCircle, Lock, ListChecks,
  Lightbulb, Info, AlertTriangle, ChevronRight, ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
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
}

// Map icons
const STEP_ICONS = [
  Sparkles, Globe, TrendingUp, ClipboardCheck, LogIn, Building2,
  Tags, MapPin, Phone, Shield, Clock, Calendar, Camera, Send,
  ArrowRightCircle, Lock, ListChecks
];

export function StepRenderer({ stepIndex, onNext }: StepRendererProps) {
  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 lg:px-8 py-6">
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
          <div className="relative bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 min-h-[600px] p-8 lg:p-16">

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
                className="text-4xl lg:text-5xl font-display font-bold text-orange-500 mb-4 leading-tight tracking-tight"
              >
                {step.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-500 font-medium mb-8 leading-relaxed"
              >
                {step.description}
              </motion.p>

              {/* Body Content */}
              <div className="text-left max-w-none">
                <ContentBody content={step.content} stepId={step.id} />
              </div>
            </div>

            {/* 2. Visual for this step */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full max-w-4xl mx-auto mb-16 relative z-10"
            >
              <StepVisual stepId={step.id} />
            </motion.div>

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
              <ShimmerButton
                onClick={onNext}
                disabled={isLastStep}
                className="h-14 px-10 shadow-xl shadow-green-500/20 w-full md:w-auto"
                background="linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
              >
                <span className="text-lg font-bold tracking-wide mr-2 text-white">
                  {isLastStep ? "Complete Guide" : "Next Step"}
                </span>
                <ArrowRight className="w-5 h-5 opacity-90 text-white group-hover:translate-x-1 transition-transform" />
              </ShimmerButton>
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Step Visual Router                                 */
/* -------------------------------------------------------------------------- */

function StepVisual({ stepId }: { stepId: number }) {
  switch (stepId) {
    case 1: return <IntroductionVisual />;
    case 2: return <StepTwoVisual />;
    case 3: return <Step3Visual />;
    case 4: return <Step4Visual />;
    case 5: return <Step5Visual />;
    case 6: return <Step6Visual />;
    case 7: return <Step7Visual />;
    case 8: return <Step8Visual />;
    case 9: return <Step9Visual />;
    case 10: return <Step10Visual />;
    case 11: return <Step11Visual />;
    case 12: return <Step12Visual />;
    case 13: return <Step13Visual />;
    case 14: return <Step14Visual />;
    case 15: return <Step15Visual />;
    case 16: return <Step16Visual />;
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
      <div className="w-full aspect-[4/3] bg-white rounded-2xl shadow-2xl overflow-hidden border-[6px] border-slate-900/5 ring-1 ring-slate-900/5 relative">
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
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="w-[125%] h-[125%] origin-top-left transform scale-[0.80]">
                  <GoogleSearchMockup />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="maps"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="w-[125%] h-[125%] origin-top-left transform scale-[0.80]">
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
    const parts = text.split(/(<strong>.*?<\/strong>)/g);
    return parts.map((part: string, i: number) => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        return (
          <span key={i} className="font-extrabold text-slate-900 bg-amber-50 px-2 py-0.5 rounded-md mx-0.5 border border-amber-200 tracking-wide">
            {part.replace(/<\/?strong>/g, '')}
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
          className="text-[15px] text-slate-700 leading-[1.8]"
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
                feature.icon === 'search' ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
              )}>
                {feature.icon === 'search' ? <Search size={20} /> : <MapPin size={20} />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
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
          className="text-[15px] text-slate-700 leading-[1.8]"
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
              <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" />
              <span className="text-slate-700 text-[15px] leading-[1.8]">{processText(item)}</span>
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
              <p className="text-[15px] text-slate-700 leading-[1.8] font-medium">{processText(stepText)}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Flow Steps (Step 3 & 15) */}
      {content.flowSteps && (
        <div className="my-6">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {content.flowSteps.map((flowStep: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 md:gap-3"
              >
                <div className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold shadow-sm border",
                  i === 0 ? "bg-blue-50 text-blue-700 border-blue-200" :
                  i === content.flowSteps.length - 1 ? "bg-green-50 text-green-700 border-green-200" :
                  "bg-orange-50 text-orange-700 border-orange-200"
                )}>
                  {flowStep}
                </div>
                {i < content.flowSteps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Options / Choices (Step 8) */}
      {content.options && (
        <div className="space-y-4 my-6">
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
                  idx === 0 ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                )}>
                  {idx === 0 ? <Building2 size={16} /> : <MapPin size={16} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{option.label}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{option.description}</p>
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
            const colors = ['blue', 'green', 'orange', 'purple'];
            const color = colors[idx % colors.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                className={`p-4 rounded-xl bg-${color}-50 border border-${color}-100 shadow-sm`}
              >
                <h4 className={`font-bold text-sm text-${color}-700 mb-1`}>{method.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{method.steps}</p>
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
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-[15px] text-slate-700 leading-[1.8]">{processText(bullet)}</span>
                  </div>
                ))}
                {/* Section paragraphs */}
                {section.paragraphs?.map((p: string, pi: number) => (
                  <p key={pi} className="text-[15px] text-slate-600 leading-[1.8]">{processText(p)}</p>
                ))}
                {/* Section steps */}
                {section.steps?.map((stepText: string, si: number) => (
                  <div key={si} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {si + 1}
                    </div>
                    <p className="text-[15px] text-slate-700 leading-[1.8]">{processText(stepText)}</p>
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
                    <p className="text-sm text-slate-700 italic leading-relaxed mt-1">{section.example}</p>
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
              <span className="text-[15px] text-slate-700 leading-[1.8] font-medium">{guideline}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tip Callout */}
      {content.tip && (
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
              <p className="text-sm text-slate-700 leading-relaxed mt-1">{processText(content.tip)}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Note Callout */}
      {content.note && (
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
              <p className="text-sm text-slate-700 leading-relaxed mt-1">{processText(content.note)}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Privacy Tip Callout */}
      {content.privacyTip && (
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
              <p className="text-sm text-slate-700 leading-relaxed mt-1">{processText(content.privacyTip)}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Example Block */}
      {content.example && !content.sections && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-5 rounded-2xl bg-amber-50 border border-amber-200 relative"
        >
          <div className="absolute -top-2.5 left-4 bg-amber-400 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
            Example
          </div>
          <p className="text-sm text-slate-700 italic leading-relaxed mt-1">{content.example}</p>
        </motion.div>
      )}

      {/* Interactive Checklist (Step 4 & 17) */}
      {content.items && <InteractiveChecklist content={content} stepId={stepId} />}

      {/* What Happens Next (Step 17) */}
      {content.whatHappensNext && (
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="w-1 h-6 bg-green-500 rounded-full" />
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
                  idx === 0 ? "text-orange-700" : "text-green-700"
                )}>
                  {section.title}
                </h4>
                <div className="space-y-2">
                  {section.steps.map((s: string, si: number) => (
                    <div key={si} className="flex items-start gap-2">
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5",
                        idx === 0 ? "bg-orange-500" : "bg-green-600"
                      )}>
                        {si + 1}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{processText(s)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Conclusion */}
      {content.conclusion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
        >
          <p className="text-sm text-slate-700 leading-relaxed font-medium">{processText(content.conclusion)}</p>
        </motion.div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Interactive Checklist                               */
/* -------------------------------------------------------------------------- */

function InteractiveChecklist({ content, stepId }: any) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(content.items?.length || 0).fill(false));
  const toggleItem = (idx: number) => setCheckedItems(prev => { const n = [...prev]; n[idx] = !n[idx]; return n; });
  const checkedCount = checkedItems.filter(Boolean).length;
  const total = checkedItems.length;

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
          className="h-full bg-green-500 rounded-full"
          animate={{ width: `${(checkedCount / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Items */}
      <div className="space-y-2.5 mt-4">
        {content.items?.map((item: string, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => toggleItem(idx)}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all bg-white hover:bg-slate-50",
              checkedItems[idx]
                ? "border-green-200 shadow-sm shadow-green-100/50"
                : "border-slate-200"
            )}
          >
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors",
              checkedItems[idx] ? "bg-green-500 text-white" : "bg-slate-200 text-slate-400"
            )}>
              <CheckCircle size={16} />
            </div>
            <span className={cn(
              "text-sm leading-relaxed transition-colors",
              checkedItems[idx] ? "text-green-800 line-through opacity-60" : "text-slate-700"
            )}>
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
