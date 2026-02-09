import { motion, AnimatePresence } from "framer-motion";
import { Mail, ExternalLink, X } from "lucide-react";

interface EmailPopupProps {
  open: boolean;
  onClose: () => void;
}

export function EmailPopup({ open, onClose }: EmailPopupProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90vw] max-w-lg"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 border border-slate-100 overflow-hidden">
              {/* Header with GT branding */}
              <div className="relative px-7 pt-7 pb-5">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} className="text-slate-400" />
                </button>

                {/* GT Logo + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/08/cropped-GT-Logo-icon.png"
                    alt="GoodTherapy"
                    className="w-10 h-10 rounded-xl shadow-sm object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">
                      How would you like to email us?
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      editor@goodtherapy.org
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-5" />

              {/* Options */}
              <div className="p-5 space-y-3">
                {/* Default email */}
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.location.href = "mailto:editor@goodtherapy.org?subject=Google%20Business%20Profile";
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-[#A2AD1A]/40 hover:bg-[#A2AD1A]/5 transition-all cursor-pointer text-left group relative overflow-hidden"
                >
                  {/* Left accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A2AD1A] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-12 h-12 rounded-2xl bg-[#A2AD1A]/10 group-hover:bg-[#A2AD1A]/15 flex items-center justify-center transition-colors shrink-0">
                    <Mail size={22} className="text-[#A2AD1A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900">Use your default email</p>
                    <p className="text-xs text-slate-400 mt-0.5">Opens in Apple Mail, Outlook, etc.</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#A2AD1A]/10 flex items-center justify-center transition-colors">
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-[#A2AD1A] transition-colors" />
                  </div>
                </motion.button>

                {/* Gmail */}
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.open(
                      "https://mail.google.com/mail/?view=cm&fs=1&to=editor@goodtherapy.org&su=Google%20Business%20Profile",
                      "_blank"
                    );
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-[#1a73e8]/40 hover:bg-blue-50/50 transition-all cursor-pointer text-left group relative overflow-hidden"
                >
                  {/* Left accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1a73e8] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100/80 flex items-center justify-center transition-colors shrink-0">
                    {/* Gmail-style icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#1a73e8]">
                      <path d="M22 6L12 13L2 6V4L12 11L22 4V6Z" fill="#EA4335"/>
                      <path d="M2 6L12 13L22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6Z" fill="#4285F4"/>
                      <path d="M2 6L2 18C2 19.1 2.9 20 4 20H5V8L12 13L2 6Z" fill="#34A853"/>
                      <path d="M22 6V18C22 19.1 21.1 20 20 20H19V8L12 13L22 6Z" fill="#FBBC05"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900">Open Gmail</p>
                    <p className="text-xs text-slate-400 mt-0.5">Compose in Gmail on the web</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-[#1a73e8] transition-colors" />
                  </div>
                </motion.button>
              </div>

              {/* Footer hint */}
              <div className="px-7 pb-5">
                <p className="text-[11px] text-slate-300 text-center">
                  Subject: Google Business Profile
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
