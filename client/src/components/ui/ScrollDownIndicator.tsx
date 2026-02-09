import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ScrollDownIndicatorProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function ScrollDownIndicator({ scrollRef }: ScrollDownIndicatorProps) {
  const [state, setState] = useState({ show: false, left: 0, width: 0, bottom: 0 });

  useEffect(() => {
    const check = () => {
      const el = scrollRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight + 50;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 80;
      const rect = el.getBoundingClientRect();
      setState({
        show: isScrollable && !isNearBottom,
        left: rect.left,
        width: rect.width,
        bottom: window.innerHeight - rect.bottom,
      });
    };

    check();
    const timers = [setTimeout(check, 200), setTimeout(check, 500), setTimeout(check, 1000)];

    const el = scrollRef.current;
    el?.addEventListener("scroll", check);
    window.addEventListener("resize", check);

    const observer = new MutationObserver(() => setTimeout(check, 50));
    if (el) observer.observe(el, { childList: true, subtree: true });

    return () => {
      el?.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [scrollRef]);

  return createPortal(
    <AnimatePresence>
      {state.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none"
          style={{
            position: "fixed",
            left: state.left,
            width: state.width,
            bottom: state.bottom,
            height: 120,
            zIndex: 40,
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent" />

          {/* Lottie arrow */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 opacity-50">
            <DotLottieReact
              src="https://lottie.host/454a8a0f-cd33-44e7-8cb3-d09d5ddad36e/O5WGyHMLeB.lottie"
              loop
              autoplay
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
