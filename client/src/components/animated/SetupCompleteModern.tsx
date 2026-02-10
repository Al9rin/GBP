import { motion, useAnimation } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

// Brand colors
const COLORS = {
  orange: '#E06D00',
  blue: '#0056b3',
  green: '#A2AD1A',
  lightGreen: '#F0F5E6',
};

/**
 * Modern, professional setup complete animation
 * Inspired by Remotion principles but using Framer Motion for web
 * NO AI-looking gradients, clean and purposeful animations
 */
export const SetupCompleteModern: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Ring draws (0.3s delay)
      await new Promise(resolve => setTimeout(resolve, 300));

      // Checkmark pops (1.2s)
      await new Promise(resolve => setTimeout(resolve, 900));

      // Pulse effect (1.6s)
      await new Promise(resolve => setTimeout(resolve, 400));
      setShowConfetti(true);

      // Keep animation alive
      controls.start({
        scale: [1, 1.02, 1],
        transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
      });
    };

    sequence();
  }, [controls]);

  return (
    <div className="w-full h-full min-h-[600px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,86,179,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,86,179,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-8 relative z-10"
      >
        {/* ========================================================
            CIRCLE WITH CHECKMARK - Main focal point
        ======================================================== */}
        <div className="relative w-[200px] h-[200px]">
          {/* Subtle glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.3, 0.3],
              scale: [0.8, 1, 1],
            }}
            transition={{
              duration: 2,
              times: [0, 0.5, 1],
              ease: 'easeOut',
              delay: 0.8
            }}
            className="absolute inset-[-20px] rounded-full blur-2xl"
            style={{
              background: `radial-gradient(circle, ${COLORS.green}30 0%, transparent 70%)`,
            }}
          />

          {/* Success pulse wave */}
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: 1.6,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1,
              times: [0, 0.3, 1],
              ease: 'easeOut',
              delay: 1.6
            }}
            className="absolute inset-0 rounded-full"
            style={{
              border: `4px solid ${COLORS.green}`,
            }}
          />

          {/* White background circle */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute inset-0 rounded-full bg-white shadow-2xl"
          />

          {/* Gradient ring - draws clockwise */}
          <svg
            width="200"
            height="200"
            className="absolute top-0 left-0 -rotate-90"
          >
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.orange} />
                <stop offset="50%" stopColor={COLORS.blue} />
                <stop offset="100%" stopColor={COLORS.green} />
              </linearGradient>
              <filter id="ringGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background ring */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="12"
            />

            {/* Animated gradient ring */}
            <motion.circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#ringGlow)"
              initial={{
                strokeDasharray: 2 * Math.PI * 85,
                strokeDashoffset: 2 * Math.PI * 85,
              }}
              animate={{
                strokeDashoffset: 0,
              }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth draw
              }}
            />
          </svg>

          {/* Checkmark - pops in with bounce */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay: 1.2,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={controls}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: COLORS.green,
                boxShadow: `0 8px 24px ${COLORS.green}40`,
              }}
            >
              <Check size={48} color="white" strokeWidth={4} />
            </motion.div>
          </motion.div>

          {/* Confetti particles - organic spread */}
          {showConfetti && Array.from({ length: 30 }).map((_, i) => {
            const angle = (i / 30) * 360;
            const distance = 120 + Math.random() * 80;
            const colors = [COLORS.orange, COLORS.blue, COLORS.green, '#FFD700', '#FF6B6B', '#A855F7'];

            return (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotate: 0
                }}
                animate={{
                  x: Math.cos(angle * Math.PI / 180) * distance,
                  y: Math.sin(angle * Math.PI / 180) * distance + 100,
                  opacity: 0,
                  scale: 0.5,
                  rotate: 720,
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.02,
                  ease: 'easeOut',
                }}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: 6 + Math.random() * 6,
                  height: 6 + Math.random() * 6,
                  backgroundColor: colors[i % colors.length],
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                }}
              />
            );
          })}
        </div>

        {/* ========================================================
            TEXT CONTENT - Clean typography
        ======================================================== */}
        <div className="flex flex-col items-center gap-3 max-w-2xl px-4">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 2.0,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-5xl md:text-6xl font-extrabold m-0 text-center tracking-tight"
            style={{
              background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.orange} 50%, ${COLORS.blue} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Setup Complete!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 2.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-lg text-slate-500 text-center leading-relaxed max-w-md"
          >
            Your Google Business Profile is optimized and connected to GoodTherapy.
          </motion.p>
        </div>

        {/* ========================================================
            COMPLETION BADGE - Confirmation detail
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
              type: 'spring',
              stiffness: 180,
              damping: 25,
              delay: 2.7,
            }}
          className="flex items-center gap-3 px-6 py-4 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.lightGreen}, white)`,
            border: `2px solid ${COLORS.green}`,
            boxShadow: `0 8px 24px ${COLORS.green}20`,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${COLORS.green}15` }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M11 17v.01" />
              <path d="M7 14v.01" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold m-0" style={{ color: COLORS.green }}>
              All steps completed
            </p>
            <p className="text-xs text-slate-500 m-0">
              Your profiles are now aligned
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
