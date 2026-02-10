import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { Check } from 'lucide-react';

// Brand colors from the design
const COLORS = {
  orange: '#E06D00',
  blue: '#0056b3',
  green: '#A2AD1A',
  lightOrange: '#FFE5CC',
  lightBlue: '#E6F2FF',
  lightGreen: '#F0F5E6',
};

export const SetupCompleteRemotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ============================================================================
  // ANIMATION TIMING (all in seconds, converted to frames)
  // ============================================================================
  const CIRCLE_ENTER_TIME = 0.3; // Ring appears
  const CHECKMARK_TIME = 1.2; // Checkmark pops in
  const PULSE_TIME = 1.6; // Success pulse
  const TEXT_TIME = 2.0; // Title fades in
  const SUBTITLE_TIME = 2.3; // Subtitle fades in
  const BADGE_TIME = 2.7; // Badge slides up
  const GLOW_START = 0.8; // Glow effect starts

  // ============================================================================
  // SPRING ANIMATIONS (using Remotion best practices)
  // ============================================================================

  // Circle ring entrance (smooth with slight bounce)
  const circleProgress = spring({
    frame: frame - CIRCLE_ENTER_TIME * fps,
    fps,
    config: { damping: 20, stiffness: 200 }, // Snappy
  });

  // Checkmark pop-in (bouncy entrance)
  const checkmarkSpring = spring({
    frame: frame - CHECKMARK_TIME * fps,
    fps,
    config: { damping: 15, stiffness: 300 }, // More bounce
  });

  // Success pulse wave
  const pulseProgress = spring({
    frame: frame - PULSE_TIME * fps,
    fps,
    config: { damping: 200 }, // Smooth
  });

  // Title entrance
  const titleSpring = spring({
    frame: frame - TEXT_TIME * fps,
    fps,
    config: { damping: 200 }, // Smooth
  });

  // Subtitle entrance
  const subtitleSpring = spring({
    frame: frame - SUBTITLE_TIME * fps,
    fps,
    config: { damping: 200 }, // Smooth
  });

  // Badge slide-up
  const badgeSpring = spring({
    frame: frame - BADGE_TIME * fps,
    fps,
    config: { damping: 25, stiffness: 180 }, // Slight bounce
  });

  // ============================================================================
  // DERIVED VALUES
  // ============================================================================

  // Circle ring progress (0 to 360 degrees)
  const circleRotation = interpolate(circleProgress, [0, 1], [0, 360]);

  // Checkmark scale and rotation
  const checkmarkScale = interpolate(checkmarkSpring, [0, 1], [0, 1]);
  const checkmarkRotate = interpolate(checkmarkSpring, [0, 1], [-180, 0]);

  // Success pulse ring
  const pulseScale = interpolate(pulseProgress, [0, 1], [1, 1.6]);
  const pulseOpacity = interpolate(pulseProgress, [0, 0.3, 1], [0, 0.6, 0]);

  // Title fade and slide
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [20, 0]);

  // Subtitle fade and slide
  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleSpring, [0, 1], [15, 0]);

  // Badge slide and fade
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [30, 0]);

  // Continuous glow pulse (subtle, infinite feel)
  const glowPulse = interpolate(
    frame - GLOW_START * fps,
    [0, 1.5 * fps, 3 * fps],
    [0.4, 1, 0.4],
    {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.sin),
    }
  );

  // Confetti particles
  const showConfetti = frame >= PULSE_TIME * fps;
  const confettiParticles = 30;

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle animated background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,86,179,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,86,179,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Main container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ====================================================================
            CIRCLE WITH CHECKMARK
        ==================================================================== */}
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          {/* Outer glow ring */}
          <div
            style={{
              position: 'absolute',
              inset: -20,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${COLORS.green}${Math.round(glowPulse * 20).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
              filter: 'blur(24px)',
              opacity: frame >= GLOW_START * fps ? glowPulse : 0,
            }}
          />

          {/* Pulse wave effect */}
          {frame >= PULSE_TIME * fps && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `4px solid ${COLORS.green}`,
                transform: `scale(${pulseScale})`,
                opacity: pulseOpacity,
              }}
            />
          )}

          {/* Main circle background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }}
          />

          {/* Gradient ring with rotation */}
          <svg
            width="200"
            height="200"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotate(-90deg)',
            }}
          >
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.orange} />
                <stop offset="50%" stopColor={COLORS.blue} />
                <stop offset="100%" stopColor={COLORS.green} />
              </linearGradient>
              <filter id="ringGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="12"
            />

            {/* Animated gradient ring */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 85}
              strokeDashoffset={2 * Math.PI * 85 * (1 - circleProgress)}
              strokeLinecap="round"
              filter="url(#ringGlow)"
            />
          </svg>

          {/* Checkmark icon */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${checkmarkScale}) rotate(${checkmarkRotate}deg)`,
              opacity: frame >= CHECKMARK_TIME * fps ? 1 : 0,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: COLORS.green,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 24px ${COLORS.green}40`,
              }}
            >
              <Check size={48} color="white" strokeWidth={4} />
            </div>
          </div>

          {/* Confetti particles */}
          {showConfetti &&
            Array.from({ length: confettiParticles }).map((_, i) => {
              const angle = (i / confettiParticles) * 360;
              const distance = 120 + Math.random() * 80;
              const delay = i * 2;
              const particleFrame = frame - PULSE_TIME * fps - delay;

              if (particleFrame < 0) return null;

              const progress = Math.min(particleFrame / (2 * fps), 1);
              const x = Math.cos((angle * Math.PI) / 180) * distance * progress;
              const y = Math.sin((angle * Math.PI) / 180) * distance * progress + progress * progress * 100;
              const opacity = 1 - progress;
              const rotation = progress * 720;

              const colors = [COLORS.orange, COLORS.blue, COLORS.green, '#FFD700', '#FF6B6B', '#A855F7'];
              const color = colors[i % colors.length];

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 6 + Math.random() * 6,
                    height: 6 + Math.random() * 6,
                    backgroundColor: color,
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                    opacity: opacity,
                  }}
                />
              );
            })}
        </div>

        {/* ====================================================================
            TEXT CONTENT
        ==================================================================== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              margin: 0,
              background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.orange} 50%, ${COLORS.blue} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              letterSpacing: '-0.02em',
            }}
          >
            Setup Complete!
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 18,
              color: '#64748b',
              margin: 0,
              maxWidth: 520,
              textAlign: 'center',
              lineHeight: 1.6,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
            }}
          >
            Your Google Business Profile is optimized and connected to GoodTherapy.
          </p>
        </div>

        {/* ====================================================================
            COMPLETION BADGE
        ==================================================================== */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 24px',
              borderRadius: 16,
              background: `linear-gradient(135deg, ${COLORS.lightGreen}, white)`,
              border: `2px solid ${COLORS.green}`,
              boxShadow: `0 8px 24px ${COLORS.green}20`,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${COLORS.green}15`,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2">
                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" />
                <path d="m9.5 9 5 5m0-5-5 5" />
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.green }}>
                All steps completed
              </p>
              <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
                Your profiles are now aligned
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
