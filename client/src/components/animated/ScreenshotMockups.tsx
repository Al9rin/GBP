import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Phone, Globe, ArrowRight, Copy, Check,
  Clock, Camera, Shield, CheckCircle2, Calendar, Image as ImageIcon, Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { DeviceFrame } from "./DeviceFrame";
import { GoogleSearchIcon, GoogleMapsPin, GoogleLogo, SearchIconSimple } from "../branding/GoogleAssets";

interface GoogleSearchMockupProps {
  practiceExample?: {
    name: string;
    rating: number;
    type: string;
    address?: string;
  };
  highlightElements?: ("name" | "phone" | "website")[];
}

/**
 * Google Search results mockup with business listing
 * Interactive version with typing simulation and realistic UI
 */
export function GoogleSearchMockup({
  practiceExample = {
    name: "Example Therapy Practice",
    rating: 4.8,
    type: "Mental health service",
    address: "123 Main St, City, ST 12345",
  },
  highlightElements = [],
}: GoogleSearchMockupProps) {


  // Static state for immediate readability
  const [query] = useState("therapist near me");
  const [isSearching] = useState(false);
  const [hasSearched] = useState(true);

  return (
    <DeviceFrame type="browser" className="w-full max-w-3xl mx-auto h-[560px]">
      <div className="bg-white flex-1 flex flex-col overflow-hidden relative">
        {/* Header Section */}
        <div className="border-b border-slate-100 p-4 pb-0 flex-shrink-0 flex flex-col items-center">
          <div className="flex items-center justify-center w-full mb-4 relative max-w-2xl px-4">

            <div className="flex-1 max-w-xl relative mx-4">
              <input
                value={query}
                readOnly
                className="w-full h-12 pl-6 pr-14 rounded-full border border-slate-200 shadow-sm outline-none text-base text-slate-800"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <span className="text-slate-400 cursor-pointer">×</span>
                <div className="w-px h-5 bg-slate-200" />
                <GoogleSearchIcon className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto flex-shrink-0">
              <div className="w-8 h-8 rounded-full hover:bg-slate-100 cursor-pointer flex items-center justify-center p-1.5 ">
                <div className="grid grid-cols-3 gap-0.5 w-full h-full opacity-60">
                  {[...Array(9)].map((_, i) => <div key={i} className="bg-slate-600 rounded-full" />)}
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium shadow-sm">G</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 text-sm text-slate-600 w-full justify-center max-w-2xl">
            <div className="pb-3 border-b-2 border-blue-600 text-blue-600 font-medium px-1 cursor-pointer">All</div>
            <div className="pb-3 border-b-2 border-transparent hover:text-slate-900 cursor-pointer px-1">Maps</div>
            <div className="pb-3 border-b-2 border-transparent hover:text-slate-900 cursor-pointer px-1">Images</div>
            <div className="pb-3 border-b-2 border-transparent hover:text-slate-900 cursor-pointer px-1">News</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white p-6 pt-6">
          {isSearching ? (
            <div className="space-y-4 max-w-2xl mx-auto animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            <div className="flex justify-center max-w-4xl mx-auto px-4">
              {/* Main Results Column Centered */}
              <div className="w-full space-y-6">
                <div className="text-xs text-slate-500">About 1,240,000 results (0.52 seconds)</div>

                {/* Organic Result 1 - GoodTherapy */}
                <div className="space-y-2 text-sm bg-white p-4 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 text-slate-800 mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                      <img src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/08/cropped-GT-Logo-icon.png" alt="GT" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="font-medium text-slate-900 text-sm">GoodTherapy</span>
                      <span className="text-slate-500 text-xs">https://www.goodtherapy.org</span>
                    </div>
                  </div>
                  <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium">Therapists in {practiceExample.address?.split(',')[1]?.trim() || "Your City"} | GoodTherapy</h3>
                  <p className="text-slate-600 leading-normal max-w-3xl">Find the right therapist for you. Choose from thousands of verified mental health professionals. Read reviews, compare expertise, and check availability. Our diverse directory includes counselors for anxiety, depression, relationships, and more.</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </DeviceFrame>
  );
}

interface GoogleMapsMockupProps {
  showServiceArea?: boolean;
  highlightPin?: boolean;
}

/**
 * Google Maps interface mockup with pin and info card
 * Interactive version with clickable pins and improved map visuals
 */
export function GoogleMapsMockup({
  showServiceArea = false,
  highlightPin = false,
}: GoogleMapsMockupProps) {
  const [selectedPin, setSelectedPin] = useState(false);

  // Auto-select pin if highlighted
  useEffect(() => {
    if (highlightPin) {
      const timer = setTimeout(() => setSelectedPin(true), 800);
      return () => clearTimeout(timer);
    }
  }, [highlightPin]);

  return (
    <DeviceFrame type="browser" className="w-full max-w-3xl mx-auto">
      <div className="relative bg-[#E5E3DF] h-[500px] overflow-hidden group">
        {/* Map Background Image */}
        <div className="absolute inset-0">
          <img
            src="/map-bg-v2.jpg"
            alt="Map Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Map UI Elements */}
        {/* Search Box */}
        <div className="absolute top-4 left-4 right-auto z-20 bg-white rounded-xl shadow-lg border border-slate-100 p-2 pl-4 w-96 flex items-center gap-3">
          <span className="text-slate-700 text-base flex-1 font-medium">Therapists near me</span>
          <div className="flex gap-3 items-center pr-2">
            <Search className="w-5 h-5 text-blue-600 cursor-pointer" />
            <div className="w-8 h-8 bg-purple-100 rounded-full text-purple-700 flex items-center justify-center text-sm font-bold border border-purple-200">G</div>
          </div>
        </div>

        {/* Service area circle REMOVED per user request */}
        {/* {showServiceArea && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500 border-2 border-blue-600 mix-blend-multiply"
          />
        )} */}

        {/* Other Pins (Background noise) */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-red-400 rounded-full shadow-sm"
            style={{
              top: `${20 + i * 25}%`,
              left: `${20 + i * 30}%`,
              opacity: 0.6
            }}
          />
        ))}

        {/* Main Pin */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 cursor-pointer"
          onClick={() => setSelectedPin(!selectedPin)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={highlightPin && !selectedPin ? { scale: [1, 1.2, 1] } : {}}
            transition={highlightPin && !selectedPin ? { repeat: Infinity, duration: 2 } : {}}
          >
            <GoogleMapsPin className="w-12 h-12 drop-shadow-xl" />
          </motion.div>
          {/* Shadow */}
          <div className="w-4 h-1.5 bg-black/20 rounded-full blur-[2px] mx-auto mt-[-4px]" />
        </motion.div>

        {/* Info Card */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="absolute bottom-6 left-6 z-30 bg-white rounded-xl shadow-2xl p-0 w-72 overflow-hidden border border-slate-100"
            >
              <div className="h-24 bg-slate-200 relative">
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white cursor-pointer"><ShareLinkMockup platform="mobile" autoPlay={false} /></div>
                  <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white cursor-pointer" onClick={() => setSelectedPin(false)}>×</div>
                </div>
              </div>
              <div className="p-4 pt-3">
                <h3 className="font-semibold text-lg mb-1 text-slate-900">Example Therapy Practice</h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="font-bold text-sm">4.8</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">(127)</span>
                </div>
                <p className="text-xs text-slate-600 mb-3 border-b pb-3">Mental health service · 2.4 mi</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-xs font-medium transition-colors">Directions</button>
                  <button className="flex-1 border border-slate-300 hover:bg-slate-50 text-blue-700 py-2 rounded-full text-xs font-medium transition-colors">Save</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom controls + Compass */}
        <div className="absolute right-4 bottom-8 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow-md p-2 cursor-pointer hover:bg-slate-50">
            <div className="w-4 h-4 rounded-full border-2 border-red-500 border-t-red-600" />
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden text-slate-600 flex flex-col">
            <button className="p-3 hover:bg-slate-50 border-b active:bg-slate-100">+</button>
            <button className="p-3 hover:bg-slate-50 active:bg-slate-100">−</button>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

interface ShareLinkMockupProps {
  platform: "desktop" | "mobile";
  autoPlay?: boolean;
}

/**
 * Animated walkthrough of copying share link
 * Fixed height and proper scaling
 */
export function ShareLinkMockup({
  platform = "desktop",
  autoPlay = true,
}: ShareLinkMockupProps) {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const steps = [
    { label: "Click share button", highlight: "share" },
    { label: "Share menu opens", highlight: "menu" },
    { label: "Click copy link", highlight: "copy" },
    { label: "Link copied!", highlight: "success" },
  ];

  // Auto-advance through steps
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev === 3) {
          setCopied(false);
          return 0;
        }
        if (prev === 2) setCopied(true);
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <DeviceFrame type={platform === "desktop" ? "browser" : "phone"} className={platform === "mobile" ? "mx-auto" : ""}>
      <div className="bg-white p-4 h-[320px] relative overflow-hidden">
        {/* GBP Dashboard mockup */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-semibold truncate">Example Therapy Practice</h2>

            {/* Share button */}
            <motion.button
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${step === 0
                ? "bg-primary text-white ring-4 ring-primary/30"
                : "bg-slate-100 text-slate-700"
                }`}
              animate={step === 0 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Share
            </motion.button>
          </div>

          {/* Share menu */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-4 top-16 bg-white rounded-lg shadow-2xl border border-slate-200 p-3 w-52 z-30"
            >
              <h3 className="font-semibold mb-2 text-sm">Share your profile</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border text-xs">
                  <Globe className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  <div className="flex-1 text-slate-600 truncate">
                    g.page/example-therapy
                  </div>
                </div>

                {/* Copy link button */}
                <motion.button
                  className={`w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${step === 2
                    ? "bg-primary text-white ring-4 ring-primary/30"
                    : "bg-slate-100 text-slate-700"
                    }`}
                  animate={step === 2 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy Link
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Success message */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-50 border-2 border-green-200 rounded-xl p-4 shadow-xl z-40 text-center max-w-[200px]"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-green-900 text-sm">Link Copied!</p>
              <p className="text-xs text-green-700 mt-1">
                Now paste it in your email to GoodTherapy
              </p>
            </motion.div>
          )}
        </div>

        {/* Step indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${idx === step ? "bg-primary w-6" : "bg-slate-300 w-1.5"
                }`}
            />
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

/**
 * GBP Dashboard mockup showing profile editing
 * Interactive version allowing simulated edits
 */
export function GBPDashboardMockup() {
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleSave = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
        setIsEditing(false);
      }, 1000);
    }, 1200);
  };

  return (
    <DeviceFrame type="browser" className="w-full max-w-3xl mx-auto">
      <div className="bg-[#F8F9FA] h-[350px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <GoogleLogo className="h-6" />
            <span className="text-lg font-normal text-slate-600">Business Profile</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium shadow-sm">A</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-normal text-slate-800">Example Therapy Practice</h1>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all shadow-sm ${saveStatus === "saved"
                  ? "bg-green-600 text-white"
                  : isEditing
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    : "border border-slate-300 bg-white text-blue-600 hover:bg-blue-50"
                  }`}
              >
                {saveStatus === "saving" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mx-auto"
                  />
                ) : saveStatus === "saved" ? (
                  "Changes Saved"
                ) : isEditing ? (
                  "Save"
                ) : (
                  "Edit profile"
                )}
              </motion.button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-medium mb-1">Business Information</h2>
                <p className="text-sm text-slate-500">Contact details and location</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Business name</label>
                    {isEditing ? (
                      <input type="text" defaultValue="Example Therapy Practice" className="w-full text-base p-2 border border-blue-500 rounded ring-2 ring-blue-100 outline-none" />
                    ) : (
                      <div className="text-base text-slate-900 py-2 border-b border-transparent group-hover:border-slate-200 transition-colors">Example Therapy Practice</div>
                    )}
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Business category</label>
                    {isEditing ? (
                      <div className="relative">
                        <input type="text" defaultValue="Mental health service" className="w-full text-base p-2 border border-blue-500 rounded ring-2 ring-blue-100 outline-none" />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▼</div>
                      </div>
                    ) : (
                      <div className="text-base text-slate-900 py-2 border-b border-transparent group-hover:border-slate-200 transition-colors">Mental health service</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Description</label>
                  {isEditing ? (
                    <textarea rows={3} defaultValue="Professional therapy services providing compassionate care..." className="w-full text-sm p-2 border border-blue-500 rounded ring-2 ring-blue-100 outline-none resize-none" />
                  ) : (
                    <div className="text-sm text-slate-600 leading-relaxed py-2 border-b border-transparent group-hover:border-slate-200 transition-colors">
                      Professional therapy services providing compassionate care for individuals and families. Specialized in anxiety, depression, and relationship counseling.
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2 group">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Phone number</label>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">🇺🇸</span>
                      {isEditing ? (
                        <input type="text" defaultValue="(555) 123-4567" className="flex-1 text-base p-2 border border-blue-500 rounded ring-2 ring-blue-100 outline-none" />
                      ) : (
                        <div className="flex-1 text-base text-slate-900 py-2 border-b border-transparent group-hover:border-slate-200 transition-colors">(555) 123-4567</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Website</label>
                    <div className="flex items-center gap-2">
                      < Globe className="w-4 h-4 text-slate-400" />
                      {isEditing ? (
                        <input type="text" defaultValue="goodtherapy.org/..." className="flex-1 text-base p-2 border border-blue-500 rounded ring-2 ring-blue-100 outline-none" />
                      ) : (
                        <div className="flex-1 text-base text-blue-600 py-2 border-b border-transparent group-hover:border-slate-200 transition-colors">goodtherapy.org/...</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer hint */}
              <div className="bg-slate-50 p-4 text-xs text-slate-500 border-t border-slate-200 flex items-center justify-between">
                <span>Last edited 2 days ago</span>
                {!isEditing && <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:underline">Suggest an edit</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

/**
 * Form mockup showing input fields
 */
export function FormMockup({
  fields,
  highlightField
}: {
  fields: { label: string; value: string; icon?: any }[];
  highlightField?: string;
}) {
  return (
    <DeviceFrame type="browser" className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-6 h-[400px] overflow-hidden">
        <h3 className="text-base font-semibold mb-4">Business information</h3>
        <div className="space-y-3">
          {fields.map((field, idx) => {
            const Icon = field.icon;
            const isHighlighted = field.label === highlightField;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative ${isHighlighted ? 'ring-2 ring-primary rounded-lg' : ''}`}
              >
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {Icon && <Icon className="w-3 h-3 inline mr-1" />}
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
                />
                {isHighlighted && (
                  <motion.div
                    className="absolute -right-8 top-8 text-primary"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </DeviceFrame>
  );
}

/**
 * Hours picker mockup
 */
export function HoursPickerMockup() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <DeviceFrame type="browser" className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-4 h-[300px] overflow-auto custom-scrollbar">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Business hours
        </h3>
        <div className="space-y-2">
          {days.map((day, idx) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3 py-2 border-b border-slate-100"
            >
              <span className="text-sm font-medium w-24">{day}</span>
              <select className="px-2 py-1 text-xs border border-slate-300 rounded">
                <option>9:00 AM</option>
              </select>
              <span className="text-xs text-slate-500">to</span>
              <select className="px-2 py-1 text-xs border border-slate-300 rounded">
                <option>5:00 PM</option>
              </select>
              <button className="text-xs text-slate-500 hover:text-slate-700">Closed</button>
            </motion.div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

/**
 * Photo upload mockup - modern drag & drop style
 */
export function PhotoUploadMockup() {
  return (
    <DeviceFrame type="browser" className="w-full max-w-3xl mx-auto">
      <div className="bg-white min-h-[320px] p-6 flex flex-col items-center justify-center border-b border-x border-slate-200 rounded-b-xl">
        <div className="w-full max-w-lg text-center space-y-6">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-10 h-10 text-blue-600" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl text-slate-900 font-medium">Add photos to your business</h3>
            <p className="text-slate-500 text-sm">
              Showcase your practice to let customers "see" inside before they visit.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.01, borderColor: "#3b82f6" }}
            className="border-2 border-dashed border-slate-300 rounded-xl p-10 cursor-pointer bg-slate-50 hover:bg-blue-50/30 transition-all"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                <div className="bg-blue-600 w-8 h-1 rounded-sm" />
                <div className="bg-blue-600 w-1 h-8 rounded-sm absolute" />
              </div>
              <div className="text-sm font-medium text-blue-600">Select photos/videos</div>
              <p className="text-xs text-slate-400">or drag and drop here</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 opacity-60 pointer-events-none grayscale-[50%]">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-slate-100 rounded-lg border border-slate-200" />
            ))}
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

/**
 * Verification postcard mockup
 */
/**
 * Verification postcard mockup
 */
export function VerificationPostcardMockup() {
  return (
    <div className="flex items-center justify-center py-10 perspective-1000">
      <motion.div
        initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
        whileHover={{ rotateY: 0, scale: 1, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        animate={{ opacity: 1, rotateY: -5 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative bg-white w-full max-w-[500px] aspect-[1.58/1] rounded-sm shadow-xl border border-slate-200 overflow-hidden"
      >
        {/* Postcard Front */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between bg-[#F8F9FA]">
          {/* Header */}
          <div className="flex justify-between items-start">
            <GoogleLogo className="h-8" />
            <div className="w-24 h-20 border border-slate-300 bg-white flex items-center justify-center">
              <div className="text-[10px] text-center text-slate-400 leading-tight">
                NO POSTAGE<br />NECESSARY<br />IF MAILED<br />IN THE<br />UNITED STATES
              </div>
            </div>
          </div>

          {/* Address Block */}
          <div className="flex justify-end mt-4">
            <div className="w-1/2 font-mono text-sm text-slate-700 leading-relaxed font-medium bg-white p-4 border border-slate-200/50 shadow-sm rounded">
              Example Therapy Practice<br />
              ATTN: Verification<br />
              123 Main St<br />
              City, ST 12345
            </div>
          </div>

          {/* Message strip */}
          <div className="absolute bottom-6 left-8 text-xs text-slate-500 font-medium">
            IMPORTANT: Contains your verification code
          </div>

          {/* Barcode */}
          <div className="absolute bottom-6 right-8 h-8 w-40 bg-[repeating-linear-gradient(90deg,black,black_1px,transparent_1px,transparent_3px)] opacity-60" />
        </div>

        {/* Tear-off strip effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 border-r-2 border-dashed border-slate-300 bg-slate-50" />
      </motion.div>
    </div>
  );
}

/**
 * Privacy/HIPAA reminder card
 */
export function PrivacyReminderMockup() {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-blue-900 mb-2">
              Privacy & HIPAA Compliance
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Never share client names or protected health information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Keep responses professional and general</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Review all public-facing content carefully</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Category selection mockup
 */
export function CategoryMockup() {
  const categories = [
    "Mental health service",
    "Psychotherapist",
    "Marriage counselor",
    "Family counselor",
    "Psychologist"
  ];

  return (
    <DeviceFrame type="browser" className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-6 h-[400px] overflow-hidden">
        <h3 className="text-base font-semibold mb-4">Select your primary category</h3>
        <div className="space-y-2">
          {categories.map((category, idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${idx === 0
                ? 'border-primary bg-primary/5'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-3">
                {idx === 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-sm font-medium">{category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

/**
 * Appointment link mockup
 */
export function AppointmentLinkMockup() {
  return (
    <DeviceFrame type="browser" className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-6 h-[400px] overflow-hidden">
        <h3 className="text-base font-semibold mb-4">Appointment link</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-2">
              Where can clients book appointments?
            </label>
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              type="text"
              value="https://www.goodtherapy.org/therapists/profile/..."
              readOnly
              className="w-full px-3 py-2 text-sm border-2 border-primary rounded bg-green-50"
            />
            <p className="text-xs text-slate-500 mt-1">
              This link will appear as a "Book appointment" button on your profile
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-slate-50 border border-slate-200 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div>
                <h4 className="text-sm font-semibold">Example Therapy Practice</h4>
                <p className="text-xs text-slate-600">Mental health service</p>
              </div>
            </div>
            <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Book appointment
            </button>
          </motion.div>
        </div>
      </div>
    </DeviceFrame>
  );
}
