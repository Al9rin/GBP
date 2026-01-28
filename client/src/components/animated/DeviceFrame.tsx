import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DeviceFrameProps {
  children: ReactNode;
  type?: "browser" | "phone" | "tablet";
  className?: string;
}

/**
 * Device frame component that wraps content in a realistic device chrome
 * Supports browser (desktop), phone, and tablet views
 */
export function DeviceFrame({
  children,
  type = "browser",
  className = "",
}: DeviceFrameProps) {
  if (type === "browser") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-lg border border-border shadow-2xl overflow-hidden bg-white ${className}`}
      >
        {/* Browser chrome */}
        <div className="bg-slate-100 border-b border-border px-4 py-3 flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Address bar */}
          <div className="flex-1 mx-4 bg-white rounded px-3 py-1.5 text-xs text-muted-foreground border border-border flex items-center gap-2">
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>google.com/business</span>
          </div>

          {/* Menu dots */}
          <div className="flex flex-col gap-1">
            <div className="w-1 h-1 rounded-full bg-slate-400" />
            <div className="w-1 h-1 rounded-full bg-slate-400" />
            <div className="w-1 h-1 rounded-full bg-slate-400" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white">{children}</div>
      </motion.div>
    );
  }

  if (type === "phone") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden bg-white max-w-sm ${className}`}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-10 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-700 rounded-full mt-1" />
        </div>

        {/* Status bar */}
        <div className="bg-white pt-8 pb-2 px-4 flex justify-between text-xs">
          <span className="font-medium">9:41</span>
          <div className="flex gap-1 items-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white overflow-hidden">{children}</div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-800 rounded-full" />
      </motion.div>
    );
  }

  if (type === "tablet") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl border-8 border-slate-800 shadow-2xl overflow-hidden bg-white max-w-2xl ${className}`}
      >
        {/* Camera */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-700 rounded-full z-10" />

        {/* Status bar */}
        <div className="bg-white pt-6 pb-2 px-6 flex justify-between text-xs border-b border-border">
          <span className="font-medium">9:41 AM</span>
          <div className="flex gap-2 items-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <span className="text-xs">100%</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white overflow-hidden">{children}</div>
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
}
