import { motion } from "framer-motion";
import { Star, MapPin, Phone, Globe, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { DeviceFrame } from "./DeviceFrame";
import { GoogleSearchIcon, GoogleMapsPin } from "../branding/GoogleAssets";

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
    <DeviceFrame type="browser">
      <div className="bg-white p-6 space-y-4 min-h-[400px]">
        {/* Search bar */}
        <div className="flex items-center gap-3 p-3 rounded-full border-2 border-slate-200 shadow-sm bg-white max-w-2xl">
          <GoogleSearchIcon className="w-5 h-5" />
          <input
            value="therapist near me"
            readOnly
            className="flex-1 bg-transparent text-sm outline-none text-slate-700"
          />
        </div>

        {/* Search results header */}
        <div className="text-xs text-slate-500 mt-6">
          About 1,240,000 results (0.52 seconds)
        </div>

        {/* Business listing card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative border border-slate-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            {/* Practice image placeholder */}
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0" />

            <div className="flex-1 space-y-2">
              {/* Practice name */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                  {practiceExample.name}
                </h3>
                {highlightElements.includes("name") && (
                  <motion.div
                    className="absolute -right-8 top-0"
                    animate={{ scale: [1, 1.1, 1], x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowRight className="w-5 h-5 text-secondary" />
                  </motion.div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(practiceExample.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {practiceExample.rating} (127 reviews)
                </span>
              </div>

              {/* Type */}
              <p className="text-sm text-slate-600">{practiceExample.type}</p>

              {/* Address */}
              {practiceExample.address && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{practiceExample.address}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 mt-3">
                <div className="relative">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-slate-300 rounded hover:bg-slate-50">
                    <Globe className="w-4 h-4" />
                    Website
                  </button>
                  {highlightElements.includes("website") && (
                    <motion.div
                      className="absolute -bottom-8 left-0 text-xs text-secondary font-medium whitespace-nowrap"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      → GoodTherapy link
                    </motion.div>
                  )}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-slate-300 rounded hover:bg-slate-50">
                  <Phone className="w-4 h-4" />
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
 */
export function GoogleMapsMockup({
  showServiceArea = false,
  highlightPin = false,
}: GoogleMapsMockupProps) {
  return (
    <DeviceFrame type="browser">
      <div className="relative bg-slate-100 min-h-[400px] overflow-hidden">
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary"
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
            <GoogleMapsPin className="w-12 h-12 drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-6 left-6 bg-white rounded-lg shadow-xl p-4 w-72 z-20"
        >
          <h3 className="font-semibold text-lg mb-2">Example Therapy Practice</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-slate-600">4.8 (127)</span>
          </div>
          <p className="text-sm text-slate-600 mb-3">Mental health service</p>
          <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
            View Details
          </button>
        </motion.div>

        {/* Zoom controls */}
        <div className="absolute right-4 top-4 bg-white rounded-lg shadow-md overflow-hidden">
          <button className="p-2 hover:bg-slate-50 border-b">+</button>
          <button className="p-2 hover:bg-slate-50">−</button>
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
  useState(() => {
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
  });

  return (
    <DeviceFrame type={platform === "desktop" ? "browser" : "phone"}>
      <div className="bg-white p-6 min-h-[400px] relative">
        {/* GBP Dashboard mockup */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-semibold">Example Therapy Practice</h2>

            {/* Share button */}
            <motion.button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
              className="absolute right-6 top-20 bg-white rounded-lg shadow-2xl border border-slate-200 p-4 w-64 z-30"
            >
              <h3 className="font-semibold mb-3">Share your profile</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded border">
                  <Globe className="w-5 h-5 text-slate-600" />
                  <div className="flex-1 text-sm text-slate-600 truncate">
                    g.page/example-therapy
                  </div>
                </div>

                {/* Copy link button */}
                <motion.button
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                    step === 2
                      ? "bg-primary text-white ring-4 ring-primary/30"
                      : "bg-slate-100 text-slate-700"
                  }`}
                  animate={step === 2 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-50 border-2 border-green-200 rounded-xl p-6 shadow-xl z-40 text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-green-900">Link Copied!</p>
              <p className="text-sm text-green-700 mt-1">
                Now paste it in your email to GoodTherapy
              </p>
            </motion.div>
          )}
        </div>

        {/* Step indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === step ? "bg-primary w-6" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}
