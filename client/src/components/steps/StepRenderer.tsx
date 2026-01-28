import { STEPS } from "@/lib/steps-data";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { ReferralFlowDiagram, VerificationMethodsCarousel } from "@/components/animated/MotionGraphics";
import {
  GoogleSearchMockup,
  GoogleMapsMockup,
  ShareLinkMockup,
  GBPDashboardMockup,
  FormMockup,
  CategoryMockup,
  HoursPickerMockup,
  PhotoUploadMockup,
  AppointmentLinkMockup,
  PrivacyReminderMockup,
  VerificationPostcardMockup
} from "@/components/animated/ScreenshotMockups";
import { Phone, Globe, Building2 } from "lucide-react";

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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 text-primary mb-2 shadow-inner">
            <step.icon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary">
            {step.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Dynamic Content */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-xl shadow-slate-200/50 p-6 md:p-10 min-h-[400px] flex flex-col">
          <div className="flex-1">
            <ContentRenderer step={step} />
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
                  : "bg-gradient-to-r from-primary to-green-600 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1"}
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

/* --- Step Graphics (Mockups & Animations) --- */
function StepGraphic({ stepId }: { stepId: number }) {
  switch(stepId) {
    // Step 1: Introduction - Referral flow
    case 1:
      return (
        <div className="my-8">
          <ReferralFlowDiagram autoPlay loop variant="simple" />
        </div>
      );

    // Step 2: What is GBP - Search & Maps
    case 2:
      return (
        <div className="grid lg:grid-cols-2 gap-6 my-8">
          <GoogleSearchMockup
            practiceExample={{
              name: "Example Therapy Practice",
              rating: 4.8,
              type: "Mental health service"
            }}
          />
          <GoogleMapsMockup />
        </div>
      );

    // Step 3: Why this supports referrals - Referral flow
    case 3:
      return (
        <div className="my-8">
          <ReferralFlowDiagram autoPlay loop variant="simple" />
        </div>
      );

    // Step 4: Gather details - No mockup (just checklist in content)

    // Step 5: Sign in - GBP Dashboard
    case 5:
      return (
        <div className="my-8">
          <GBPDashboardMockup />
        </div>
      );

    // Step 6: Practice name - Form with name field
    case 6:
      return (
        <div className="my-8">
          <FormMockup
            fields={[
              { label: "Business name", value: "Example Therapy Practice", icon: Building2 }
            ]}
            highlightField="Business name"
          />
        </div>
      );

    // Step 7: Category - Category picker
    case 7:
      return (
        <div className="my-8">
          <CategoryMockup />
        </div>
      );

    // Step 8: Location choice - Map with service area
    case 8:
      return (
        <div className="my-8">
          <GoogleMapsMockup showServiceArea highlightPin />
        </div>
      );

    // Step 9: Contact details - Form with phone & website
    case 9:
      return (
        <div className="my-8">
          <FormMockup
            fields={[
              { label: "Phone number", value: "(555) 123-4567", icon: Phone },
              { label: "Website", value: "https://www.goodtherapy.org/therapists/profile/...", icon: Globe }
            ]}
            highlightField="Website"
          />
        </div>
      );

    // Step 10: Verification - Carousel
    case 10:
      return (
        <div className="my-8 space-y-6">
          <VerificationMethodsCarousel autoRotate interval={3000} />
          <VerificationPostcardMockup />
        </div>
      );

    // Step 11: Practice details - Hours picker
    case 11:
      return (
        <div className="my-8">
          <HoursPickerMockup />
        </div>
      );

    // Step 12: Appointment link - Appointment button mockup
    case 12:
      return (
        <div className="my-8">
          <AppointmentLinkMockup />
        </div>
      );

    // Step 13: Photos - Photo upload
    case 13:
      return (
        <div className="my-8">
          <PhotoUploadMockup />
        </div>
      );

    // Step 14: Send GBP link - Share link flow
    case 14:
      return (
        <div className="grid lg:grid-cols-2 gap-6 my-8">
          <ShareLinkMockup platform="desktop" autoPlay />
          <ShareLinkMockup platform="mobile" autoPlay />
        </div>
      );

    // Step 15: Discovery to contact - Detailed referral flow
    case 15:
      return (
        <div className="my-8">
          <ReferralFlowDiagram autoPlay loop variant="detailed" />
        </div>
      );

    // Step 16: Privacy - Privacy reminder card
    case 16:
      return (
        <div className="my-8">
          <PrivacyReminderMockup />
        </div>
      );

    // Step 17: Final checklist - No mockup (interactive checklist in content)

    default:
      return null;
  }
}

/* --- Content Renderer --- */
function ContentRenderer({ step }: { step: any }) {
  const content = step.content;

  if (!content) {
    return (
      <>
        <StepGraphic stepId={step.id} />
        <GenericContent step={step} />
      </>
    );
  }

  // Special handling for Step 8 (choice type)
  if (step.type === "choice" && step.id === 8) {
    return (
      <>
        <StepGraphic stepId={step.id} />
        <LocationChoiceContent content={content} />
      </>
    );
  }

  // Special handling for Step 17 (interactive checklist)
  if (step.type === "checklist" && step.id === 17) {
    return (
      <>
        <StepGraphic stepId={step.id} />
        <InteractiveChecklistContent content={content} />
      </>
    );
  }

  // Special handling for Step 4 (display-only checklist)
  if (step.type === "checklist" && step.id === 4) {
    return (
      <>
        <StepGraphic stepId={step.id} />
        <DisplayChecklistContent content={content} />
      </>
    );
  }

  // Info type content (most steps)
  if (step.type === "info") {
    return (
      <>
        <StepGraphic stepId={step.id} />
        <InfoContent content={content} />
      </>
    );
  }

  return <GenericContent step={step} />;
}

/* --- Info Content (handles various content structures) --- */
function InfoContent({ content }: { content: any }) {
  return (
    <div className="space-y-6 prose prose-slate max-w-none">
      {/* Intro text */}
      {content.intro && (
        <p className="text-base text-foreground/80 leading-relaxed">{content.intro}</p>
      )}

      {/* Paragraphs */}
      {content.paragraphs && Array.isArray(content.paragraphs) && content.paragraphs.map((para: string, idx: number) => (
        <p key={idx} className="text-base text-foreground/80 leading-relaxed">{para}</p>
      ))}

      {/* Heading */}
      {content.heading && (
        <h3 className="text-lg font-semibold text-secondary mt-6">{content.heading}</h3>
      )}

      {/* List */}
      {content.list && Array.isArray(content.list) && (
        <ul className="list-disc list-inside space-y-2">
          {content.list.map((item: string, idx: number) => (
            <li key={idx} className="text-foreground/80">{item}</li>
          ))}
        </ul>
      )}

      {/* Flow Steps (numbered list for Step 3, 15) */}
      {content.flowSteps && Array.isArray(content.flowSteps) && (
        <ol className="list-decimal list-inside space-y-2 bg-slate-50 p-4 rounded-lg">
          {content.flowSteps.map((item: string, idx: number) => (
            <li key={idx} className="text-foreground/80">{item}</li>
          ))}
        </ol>
      )}

      {/* Steps (numbered instructions) */}
      {content.steps && Array.isArray(content.steps) && (
        <ol className="list-decimal list-inside space-y-2">
          {content.steps.map((item: string, idx: number) => (
            <li key={idx} className="text-foreground/80">{item}</li>
          ))}
        </ol>
      )}

      {/* Sections (for Step 11, 14) */}
      {content.sections && Array.isArray(content.sections) && content.sections.map((section: any, idx: number) => (
        <div key={idx} className="mt-6">
          {section.heading && (
            <h4 className="text-md font-semibold text-secondary mb-3">{section.heading}</h4>
          )}
          {section.bullets && (
            <ul className="list-disc list-inside space-y-2">
              {section.bullets.map((item: string, i: number) => (
                <li key={i} className="text-foreground/80">{item}</li>
              ))}
            </ul>
          )}
          {section.paragraphs && section.paragraphs.map((para: string, i: number) => (
            <p key={i} className="text-base text-foreground/80 leading-relaxed">{para}</p>
          ))}
          {section.steps && (
            <ol className="list-decimal list-inside space-y-2">
              {section.steps.map((item: string, i: number) => (
                <li key={i} className="text-foreground/80">{item}</li>
              ))}
            </ol>
          )}
          {section.example && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-3">
              <p className="text-sm italic text-blue-900">Example: {section.example}</p>
            </div>
          )}
        </div>
      ))}

      {/* Methods (for Step 10) */}
      {content.methods && Array.isArray(content.methods) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {content.methods.map((method: any, idx: number) => (
            <div key={idx} className="p-4 rounded-lg border border-border bg-slate-50">
              <h5 className="font-semibold text-secondary mb-1">{method.name}</h5>
              <p className="text-sm text-foreground/70">{method.steps}</p>
            </div>
          ))}
        </div>
      )}

      {/* Guidelines (for Step 16) */}
      {content.guidelines && Array.isArray(content.guidelines) && (
        <ul className="list-disc list-inside space-y-2 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          {content.guidelines.map((item: string, idx: number) => (
            <li key={idx} className="text-foreground/80">{item}</li>
          ))}
        </ul>
      )}

      {/* Example */}
      {content.example && !content.sections && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <p className="text-sm italic text-blue-900">{content.example}</p>
        </div>
      )}

      {/* Tip */}
      {content.tip && (
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mt-4">
          <p className="text-sm"><span className="font-bold text-secondary">Tip:</span> {content.tip}</p>
        </div>
      )}

      {/* Note */}
      {content.note && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <p className="text-sm text-blue-900">{content.note}</p>
        </div>
      )}

      {/* Privacy Tip (Step 13) */}
      {content.privacyTip && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
          <p className="text-sm"><span className="font-bold text-red-700">Privacy tip:</span> {content.privacyTip}</p>
        </div>
      )}

      {/* Conclusion (Step 17) */}
      {content.conclusion && (
        <p className="text-base font-medium text-green-700 bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
          {content.conclusion}
        </p>
      )}
    </div>
  );
}

/* --- Display-Only Checklist (Step 4) --- */
function DisplayChecklistContent({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {content.intro && (
        <p className="text-base text-foreground/80 mb-4">{content.intro}</p>
      )}

      <div className="space-y-3">
        {content.items && content.items.map((item: string, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-slate-50 hover:bg-white hover:shadow-sm transition-colors"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-primary mt-0.5">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-sm text-foreground/80 flex-1">{item}</span>
          </motion.div>
        ))}
      </div>

      {content.note && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <p className="text-sm text-blue-900">{content.note}</p>
        </div>
      )}
    </div>
  );
}

/* --- Location Choice Content (Step 8) --- */
function LocationChoiceContent({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {content.question && (
        <p className="text-base text-foreground/80 mb-6">{content.question}</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {content.options && content.options.map((option: any, idx: number) => (
          <div key={idx} className="relative group cursor-pointer border-2 border-transparent hover:border-primary/50 rounded-2xl p-6 bg-slate-50 transition-all hover:bg-white hover:shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{option.label}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{option.description}</p>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
          </div>
        ))}
      </div>

      {content.note && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <p className="text-sm text-blue-900">{content.note}</p>
        </div>
      )}
    </div>
  );
}

/* --- Interactive Checklist (Step 17) --- */
function InteractiveChecklistContent({ content }: { content: any }) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(content.items?.length || 0).fill(false)
  );
  const [showEmailModal, setShowEmailModal] = useState(false);

  const toggleItem = (idx: number) => {
    setCheckedItems(prev => {
      const newState = [...prev];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  const completedCount = checkedItems.filter(Boolean).length;
  const totalCount = content.items?.length || 0;

  const handleEmailClick = (type: 'default' | 'gmail') => {
    const email = 'editor@goodtherapy.org';
    const subject = 'Google Business Profile Link';
    const body = '';

    if (type === 'gmail') {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    } else {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setShowEmailModal(false);
  };

  return (
    <div className="space-y-6">
      {content.intro && (
        <p className="text-base font-semibold text-foreground/90 mb-4">{content.intro}</p>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-foreground">Progress</span>
          <span className="text-muted-foreground">{completedCount} of {totalCount} completed</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-green-600 transition-all duration-500"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {content.items && content.items.map((item: string, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => toggleItem(idx)}
            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
              checkedItems[idx]
                ? "bg-green-50 border-green-200 hover:border-green-300"
                : "bg-white border-border/50 hover:border-primary/30 hover:shadow-sm"
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-colors ${
              checkedItems[idx]
                ? "bg-green-500 text-white"
                : "bg-slate-100 border-2 border-slate-300"
            }`}>
              {checkedItems[idx] && <Check className="w-4 h-4" />}
            </div>
            <span className={`text-sm flex-1 ${
              checkedItems[idx] ? "text-green-900 line-through" : "text-foreground/80"
            }`}>{item}</span>
          </motion.div>
        ))}
      </div>

      {/* What Happens Next Section */}
      {content.whatHappensNext && (
        <div className="mt-8 space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-secondary mb-4">{content.whatHappensNext.heading}</h3>

          {content.whatHappensNext.sections && content.whatHappensNext.sections.map((section: any, idx: number) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-md font-semibold text-blue-900">{section.title}</h4>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                {section.steps && section.steps.map((step: string, i: number) => (
                  <li key={i} className="text-sm text-blue-800">{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      {/* Email Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowEmailModal(true)}
          className="text-primary hover:text-primary/80 underline font-medium text-base transition-colors"
        >
          Send Google Business Profile Link to GoodTherapy
        </button>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEmailModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-secondary mb-4">Choose email client</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Select how you'd like to send your Google Business Profile link to GoodTherapy:
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleEmailClick('gmail')}
                className="w-full p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-green-50 transition-all text-left"
              >
                <div className="font-semibold text-foreground">Gmail</div>
                <div className="text-sm text-muted-foreground">Open in Gmail web interface</div>
              </button>

              <button
                onClick={() => handleEmailClick('default')}
                className="w-full p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-green-50 transition-all text-left"
              >
                <div className="font-semibold text-foreground">Default Mail App</div>
                <div className="text-sm text-muted-foreground">Open in your device's default mail app</div>
              </button>
            </div>

            <button
              onClick={() => setShowEmailModal(false)}
              className="mt-6 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      {content.conclusion && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
          <p className="text-sm text-green-900 font-medium">{content.conclusion}</p>
        </div>
      )}
    </div>
  );
}

/* --- Generic Fallback --- */
function GenericContent({ step }: { step: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
      <div className="p-8 bg-slate-50 rounded-full border border-slate-100">
        <step.icon className="w-16 h-16 text-slate-300" />
      </div>
      <div className="max-w-md space-y-2">
        <h3 className="font-bold text-xl text-slate-800">{step.title}</h3>
        <p className="text-slate-500">
          Follow the instructions for this step to complete your Google Business Profile setup.
        </p>
      </div>
    </div>
  );
}
