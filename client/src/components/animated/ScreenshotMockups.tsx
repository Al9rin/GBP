import { motion } from "framer-motion";
import {
  Star, MapPin, Phone, Globe, ArrowRight, Copy, Check,
  Clock, Camera, Shield, CheckCircle2, Calendar, Image as ImageIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { DeviceFrame } from "./DeviceFrame";
import { GoogleSearchIcon, GoogleMapsPin, GoogleLogo } from "../branding/GoogleAssets";

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
 * Fixed height and proper scaling
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
  return (
    <DeviceFrame type="browser" className="w-full max-w-3xl mx-auto">
      <div className="bg-white p-4 h-[450px] overflow-hidden">
        {/* Search bar */}
        <div className="flex items-center gap-3 p-2.5 rounded-full border-2 border-slate-200 shadow-sm bg-white max-w-xl mb-4">
          <GoogleSearchIcon className="w-5 h-5 ml-2" />
          <input
            value="therapist near me"
            readOnly
            className="flex-1 bg-transparent text-sm outline-none text-slate-700"
          />
        </div>

        {/* Search results header */}
        <div className="text-xs text-slate-500 mb-3">
          About 1,240,000 results (0.52 seconds)
        </div>

        {/* Business listing card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative border border-slate-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-3">
            {/* Practice image placeholder */}
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0" />

            <div className="flex-1 space-y-1.5 min-w-0">
              {/* Practice name */}
              <div className="relative">
                <h3 className="text-base font-semibold text-blue-600 hover:underline cursor-pointer truncate">
                  {practiceExample.name}
                </h3>
                {highlightElements.includes("name") && (
                  <motion.div
                    className="absolute -right-6 top-0"
                    animate={{ scale: [1, 1.1, 1], x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowRight className="w-4 h-4 text-secondary" />
                  </motion.div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(practiceExample.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-600">
                  {practiceExample.rating} (127 reviews)
                </span>
              </div>

              {/* Type */}
              <p className="text-xs text-slate-600">{practiceExample.type}</p>

              {/* Address */}
              {practiceExample.address && (
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{practiceExample.address}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 pt-1">
                <div className="relative">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded hover:bg-slate-50">
                    <Globe className="w-3 h-3" />
                    Website
                  </button>
                  {highlightElements.includes("website") && (
                    <motion.div
                      className="absolute -bottom-6 left-0 text-[10px] text-secondary font-medium whitespace-nowrap"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      → GoodTherapy link
                    </motion.div>
                  )}
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded hover:bg-slate-50">
                  <Phone className="w-3 h-3" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </motion.div>
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
 * Fixed height and proper scaling
 */
export function GoogleMapsMockup({
  showServiceArea = false,
  highlightPin = false,
}: GoogleMapsMockupProps) {
  return (
    <DeviceFrame type="browser" className="w-full max-w-3xl mx-auto">
      <div className="relative bg-slate-100 h-[450px] overflow-hidden">
        {/* Simplified map background */}
        <div className="absolute inset-0">
          {/* Grid pattern to simulate streets */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(0,0,0,0.05)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Service area circle */}
          {showServiceArea && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary"
            />
          )}
        </div>

        {/* Map pin */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10"
        >
          <motion.div
            animate={
              highlightPin
                ? { scale: [1, 1.2, 1] }
                : {}
            }
            transition={
              highlightPin
                ? { repeat: Infinity, duration: 2 }
                : {}
            }
          >
            <GoogleMapsPin className="w-10 h-10 drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-4 left-4 bg-white rounded-lg shadow-xl p-3 w-56 z-20"
        >
          <h3 className="font-semibold text-sm mb-1">Example Therapy Practice</h3>
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-xs text-slate-600">4.8 (127)</span>
          </div>
          <p className="text-xs text-slate-600 mb-2">Mental health service</p>
          <button className="w-full bg-primary text-white py-1.5 rounded text-xs font-medium hover:bg-primary/90">
            View Details
          </button>
        </motion.div>

        {/* Zoom controls */}
        <div className="absolute right-3 top-3 bg-white rounded-lg shadow-md overflow-hidden text-slate-700">
          <button className="p-1.5 hover:bg-slate-50 border-b text-sm">+</button>
          <button className="p-1.5 hover:bg-slate-50 text-sm">−</button>
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
      <div className="bg-white p-4 h-[450px] relative overflow-hidden">
        {/* GBP Dashboard mockup */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-semibold truncate">Example Therapy Practice</h2>

            {/* Share button */}
            <motion.button
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                step === 0
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
                  className={`w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    step === 2
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
              className={`h-1.5 rounded-full transition-all ${
                idx === step ? "bg-primary w-6" : "bg-slate-300 w-1.5"
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
 */
export function GBPDashboardMockup() {
  return (
    <DeviceFrame type="browser" className="w-full max-w-3xl mx-auto">
      <div className="bg-white h-[450px] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GoogleLogo className="h-5" />
            <span className="text-sm font-medium text-slate-700">Business Profile</span>
          </div>
          <button className="px-3 py-1.5 bg-primary text-white rounded text-xs font-medium">
            Publish
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-3">Edit your business info</h2>

            {/* Form fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Business name
                </label>
                <input
                  type="text"
                  value="Example Therapy Practice"
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value="Mental health service"
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value="123 Main St, City, ST 12345"
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-slate-50"
                />
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
      <div className="bg-white p-6 h-[450px] overflow-auto custom-scrollbar">
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
 * Photo upload mockup
 */
export function PhotoUploadMockup() {
  return (
    <DeviceFrame type="browser" className="w-full max-w-3xl mx-auto">
      <div className="bg-white p-6 h-[450px] overflow-hidden">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Add photos
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {/* Upload box */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-xs text-slate-600">Upload photo</span>
          </motion.div>

          {/* Example photos */}
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"
            />
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900">
            <span className="font-semibold">Tip:</span> Use professional photos of your office and a clear headshot for best results.
          </p>
        </div>
      </div>
    </DeviceFrame>
  );
}

/**
 * Verification postcard mockup
 */
export function VerificationPostcardMockup() {
  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, rotateY: -15 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.6 }}
        className="relative aspect-[1.6/1] bg-white rounded-lg shadow-xl border border-slate-200 p-6"
      >
        {/* Postcard design */}
        <div className="absolute top-4 right-4">
          <div className="w-16 h-12 border-2 border-slate-300 rounded flex items-center justify-center">
            <span className="text-xs text-slate-400">Stamp</span>
          </div>
        </div>

        <div className="space-y-3">
          <GoogleLogo className="h-6" />
          <div className="text-xs text-slate-600">
            <p className="font-medium mb-1">Verification Code</p>
            <div className="text-2xl font-bold text-primary tracking-wider">
              12345
            </div>
          </div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            Enter this code at google.com/business to verify your business
          </div>
        </div>
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
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                idx === 0
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
