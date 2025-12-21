import { STEPS } from "@/lib/steps-data";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ExternalLink, MapPin, Monitor, CheckCircle, Smartphone, Mail, Video, LayoutList } from "lucide-react";

interface StepRendererProps {
  stepIndex: number;
  onComplete: () => void;
  isCompleted: boolean;
  isPending: boolean;
}

export function StepRenderer({ stepIndex, onComplete, isCompleted, isPending }: StepRendererProps) {
  const step = STEPS[stepIndex];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* Step Header */}
        <div className="space-y-4 text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-primary mb-2 shadow-inner">
            <step.icon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary">
            {step.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Dynamic Content based on Step Type/ID */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-xl shadow-slate-200/50 p-6 md:p-10 min-h-[400px] flex flex-col">
          
          <div className="flex-1">
            {step.id === 1 && <AccountCreationContent />}
            {step.id === 2 && <BusinessDefinitionContent />}
            {step.id === 3 && <PrerequisitesContent />}
            {step.id === 4 && <LocationChoiceContent />}
            {step.id === 9 && <VerificationMethodContent />}
            {step.id === 17 && <FinalReviewContent />}
            {![1, 2, 3, 4, 9, 17].includes(step.id) && (
              <GenericInfoContent step={step} />
            )}
          </div>

          {/* Action Area */}
          <div className="mt-10 pt-6 border-t border-border flex justify-end">
            <Button
              onClick={onComplete}
              disabled={isPending}
              size="lg"
              className={`
                px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300
                ${isCompleted 
                  ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200" 
                  : "bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1"}
              `}
            >
              {isPending ? "Saving..." : isCompleted ? (
                <>Completed <Check className="ml-2 w-5 h-5" /></>
              ) : (
                <>Mark as Complete <ArrowRight className="ml-2 w-5 h-5" /></>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* --- Sub-Components for Specific Steps --- */

function AccountCreationContent() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <BenefitCard 
          title="Increase Visibility" 
          desc="Appear in Maps and local search results when clients look for therapy."
          delay={0.1}
        />
        <BenefitCard 
          title="Build Trust" 
          desc="Verified profiles with reviews are 2.7x more likely to be considered reputable."
          delay={0.2}
        />
        <BenefitCard 
          title="Direct Booking" 
          desc="Allow clients to book appointments or visit your website directly."
          delay={0.3}
        />
        <BenefitCard 
          title="Client Insights" 
          desc="See how people found you and where they are coming from."
          delay={0.4}
        />
      </div>
      
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4 mt-6">
        <div className="bg-white p-2 rounded-full shadow-sm text-blue-600 mt-1">
          <ExternalLink className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 mb-1">Action Required</h4>
          <p className="text-blue-800/80 mb-3 text-sm">
            Go to Google Business Profile manager and click "Manage now". Sign in with your professional Google account.
          </p>
          <a 
            href="https://www.google.com/business/" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-semibold text-blue-600 hover:underline inline-flex items-center"
          >
            Open Google Business Profile <ArrowRight className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

function BusinessDefinitionContent() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium mb-2">How do you want to appear?</h3>
        <p className="text-muted-foreground text-sm">Consistent branding helps clients recognize you.</p>
      </div>

      <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-2xl border border-border p-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
            <LayoutList className="text-slate-400" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-secondary/80 rounded w-3/4" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
            <div className="flex gap-1 mt-1">
              {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 bg-orange-400 rounded-full" />)}
              <span className="text-xs text-slate-400 ml-1">(42)</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-slate-100 rounded w-full" />
          <div className="h-2 bg-slate-100 rounded w-5/6" />
          <div className="flex gap-2 mt-4">
            <div className="h-8 bg-primary/10 rounded-full w-24 border border-primary/20" />
            <div className="h-8 bg-slate-50 rounded-full w-24 border border-slate-100" />
          </div>
        </div>
        
        <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
          Preview
        </div>
      </div>
      
      <div className="text-sm text-center text-muted-foreground italic mt-8">
        "Your business name should match your real-world signage exactly."
      </div>
    </div>
  );
}

function PrerequisitesContent() {
  const items = [
    "A professional Google Account (not your personal Gmail if possible)",
    "Correct Business Name (as it appears on signage/license)",
    "Exact Business Address (even if you hide it later)",
    "Business Phone Number (one you can answer)",
    "Website URL (your GoodTherapy profile or practice site)",
    "Primary Business Category (e.g. 'Psychotherapist')"
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-lg mb-4">Checklist before starting:</h3>
      <div className="grid gap-3">
        {items.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-colors"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm text-foreground/80">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LocationChoiceContent() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6 h-full">
        <div className="relative group cursor-pointer border-2 border-transparent hover:border-primary/50 rounded-2xl p-6 bg-slate-50 transition-all hover:bg-white hover:shadow-xl">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Physical Office</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Choose this if you see clients at a specific address. Your address will be visible on Maps.
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
        </div>

        <div className="relative group cursor-pointer border-2 border-transparent hover:border-primary/50 rounded-2xl p-6 bg-slate-50 transition-all hover:bg-white hover:shadow-xl">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
            <Monitor className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Online / Service Area</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Choose this if you see clients remotely or visit them. You can hide your address and show a service area instead.
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
        </div>
      </div>
      
      <p className="text-xs text-center text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-100">
        <span className="font-bold text-yellow-700">Tip:</span> You can actually have both! If you have an office but also serve a wider area remotely.
      </p>
    </div>
  );
}

function VerificationMethodContent() {
  const methods = [
    { icon: Mail, label: "Postcard", desc: "Receive a code by mail (up to 14 days)." },
    { icon: Smartphone, label: "Phone", desc: "Receive a code via automated call/text." },
    { icon: Monitor, label: "Email", desc: "Receive a code to your business email." },
    { icon: Video, label: "Video Recording", desc: "Record your office, signage, and equipment." },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">
        Google will offer one or more verification methods depending on your business type and region. 
        <br/><strong>Postcard is the most common for therapists.</strong>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {methods.map((m, idx) => (
          <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-orange-50/30 transition-colors">
            <div className="mt-1 text-secondary">
              <m.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">{m.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinalReviewContent() {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-secondary">You're Ready to Publish!</h2>
      <p className="text-muted-foreground max-w-md">
        Once verified, your profile will be live. It may take a few days for Google to fully index your changes.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-xl border border-border w-full max-w-md text-left space-y-3">
        <h4 className="font-bold text-sm text-slate-700 uppercase tracking-wider mb-2">Final Checklist</h4>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Check className="w-4 h-4 text-green-500" /> Business Name is correct
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Check className="w-4 h-4 text-green-500" /> Address/Service Area defined
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Check className="w-4 h-4 text-green-500" /> Phone & Website linked
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Check className="w-4 h-4 text-green-500" /> Hours are accurate
        </div>
      </div>
    </div>
  );
}

function GenericInfoContent({ step }: { step: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <div className="p-8 bg-slate-50 rounded-full border border-slate-100">
        <step.icon className="w-16 h-16 text-slate-300" />
      </div>
      <div className="max-w-md space-y-2">
        <h3 className="font-bold text-xl text-slate-800">Configure {step.title}</h3>
        <p className="text-slate-500">
          Follow the instructions on the Google Business Profile interface to complete this section. 
          Use the description above as your guide for best practices.
        </p>
      </div>
    </div>
  );
}

function BenefitCard({ title, desc, delay }: { title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="font-bold text-secondary mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </motion.div>
  );
}
