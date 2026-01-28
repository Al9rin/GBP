import { motion } from "framer-motion";
import { Search, Building2, User, Phone, Mail, MapPin, Camera, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { GoogleSearchIcon, GoogleMapsPin } from "../branding/GoogleAssets";

interface ReferralFlowProps {
  autoPlay?: boolean;
  loop?: boolean;
  variant?: "simple" | "detailed";
}

/**
 * Animated referral flow diagram showing the path from Google to GoodTherapy
 * Google Search → GBP Listing → GoodTherapy Profile → Contact
 */
export function ReferralFlowDiagram({
  autoPlay = true,
  loop = true,
  variant = "simple",
}: ReferralFlowProps) {
  const nodes = variant === "detailed"
    ? [
        { id: 1, icon: Search, label: "Search Google", color: "primary", description: "\"therapist near me\"" },
        { id: 2, icon: Building2, label: "Find Your Listing", color: "secondary", description: "Google Business Profile" },
        { id: 3, icon: User, label: "Visit Profile", color: "tertiary", description: "GoodTherapy" },
        { id: 4, icon: Phone, label: "Contact You", color: "primary", description: "Request appointment" },
      ]
    : [
        { id: 1, icon: GoogleSearchIcon, label: "Google", color: "primary" },
        { id: 2, icon: Building2, label: "Your Listing", color: "secondary" },
        { id: 3, icon: User, label: "GoodTherapy", color: "tertiary" },
        { id: 4, icon: Mail, label: "Contact", color: "primary" },
      ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
    },
  };

  return (
    <div className="relative py-12 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={autoPlay ? "visible" : "hidden"}
        className={`flex ${
          variant === "detailed" ? "flex-col md:flex-row" : "flex-row"
        } items-center justify-center gap-6 md:gap-12 relative`}
      >
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          const isGoogleIcon = Icon === GoogleSearchIcon;

          return (
            <div key={node.id} className="flex items-center gap-6 md:gap-12">
              {/* Node */}
              <motion.div
                variants={nodeVariants}
                className="flex flex-col items-center gap-3 relative z-10"
              >
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-${node.color}/10 flex items-center justify-center shadow-lg border-2 border-${node.color}/20`}
                  whileHover={{ scale: 1.05 }}
                  animate={
                    autoPlay && loop
                      ? { scale: [1, 1.05, 1] }
                      : {}
                  }
                  transition={
                    autoPlay && loop
                      ? {
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.5,
                        }
                      : {}
                  }
                >
                  {isGoogleIcon ? (
                    <Icon className="w-10 h-10" />
                  ) : (
                    <Icon className={`w-10 h-10 text-${node.color}`} />
                  )}
                </motion.div>

                <div className="text-center">
                  <p className="font-semibold text-sm">{node.label}</p>
                  {node.description && variant === "detailed" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {node.description}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Arrow between nodes */}
              {idx < nodes.length - 1 && (
                <motion.div className="hidden md:block relative">
                  <svg
                    width="80"
                    height="40"
                    className="overflow-visible"
                  >
                    <defs>
                      <marker
                        id={`arrowhead-${idx}`}
                        markerWidth="10"
                        markerHeight="10"
                        refX="8"
                        refY="3"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3, 0 6"
                          className="fill-current text-primary"
                        />
                      </marker>
                    </defs>
                    <motion.path
                      d="M 0 20 L 80 20"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5 5"
                      markerEnd={`url(#arrowhead-${idx})`}
                      variants={pathVariants}
                    />
                  </svg>

                  {/* Animated dot traveling along path */}
                  {autoPlay && loop && (
                    <motion.div
                      className="absolute top-1/2 left-0 w-3 h-3 bg-primary rounded-full -translate-y-1/2"
                      animate={{ x: [0, 80] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: idx * 0.5,
                      }}
                    />
                  )}
                </motion.div>
              )}
            </div>
          );
        })}
      </motion.div>

      {variant === "detailed" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            This simple path helps potential clients discover you and learn about your practice
          </p>
        </motion.div>
      )}
    </div>
  );
}

interface VerificationCarouselProps {
  autoRotate?: boolean;
  interval?: number;
}

/**
 * Animated carousel showing different Google Business Profile verification methods
 * Postcard, Phone/SMS, Email, Video
 */
export function VerificationMethodsCarousel({
  autoRotate = true,
  interval = 3000,
}: VerificationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const methods = [
    {
      id: "postcard",
      icon: Mail,
      name: "Postcard",
      description: "Receive a postcard with a verification code at your business address",
      color: "blue",
    },
    {
      id: "phone",
      icon: Phone,
      name: "Phone/SMS",
      description: "Get a verification code via phone call or text message",
      color: "green",
    },
    {
      id: "email",
      icon: Mail,
      name: "Email",
      description: "Receive a verification code in your business email inbox",
      color: "orange",
    },
    {
      id: "video",
      icon: Video,
      name: "Video Recording",
      description: "Record a short video following Google's verification steps",
      color: "purple",
    },
  ];

  useEffect(() => {
    if (!autoRotate) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % methods.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoRotate, interval]);

  return (
    <div className="py-8">
      {/* Method cards */}
      <div className="relative h-64 flex items-center justify-center">
        {methods.map((method, idx) => {
          const Icon = method.icon;
          const isActive = idx === activeIndex;
          const offset = idx - activeIndex;

          return (
            <motion.div
              key={method.id}
              className="absolute w-full max-w-sm"
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.85,
                opacity: isActive ? 1 : 0.4,
                x: offset * 100 + "%",
                z: isActive ? 10 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ pointerEvents: isActive ? "auto" : "none" }}
            >
              <div className="bg-white rounded-2xl border-2 border-border shadow-xl p-8">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-${method.color}-100 flex items-center justify-center mb-4 mx-auto`}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }
                      : {}
                  }
                  transition={
                    isActive
                      ? {
                          duration: 2,
                          repeat: Infinity,
                        }
                      : {}
                  }
                >
                  <Icon className={`w-8 h-8 text-${method.color}-600`} />
                </motion.div>

                <h3 className="text-xl font-bold text-center mb-2">
                  {method.name}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {method.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        {methods.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === activeIndex
                ? "bg-primary w-8"
                : "bg-muted hover:bg-muted-foreground/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
