import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Building2,
  User,
  Phone,
  MapPin,
  Globe,
  Mail,
  CheckCircle,
  Clipboard,
  Heart,
  Video,
  Clock,
  MousePointer2,
  Check,
  Copy,
  Camera,
  Shield,
  Calendar,
  ArrowRight,
  Send,
  Sparkles,
  Brain,
  Stethoscope,
  Users,
  FileText,
  Upload,
  Link,
  Star,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { DeviceFrame } from '@/components/animated/DeviceFrame';
import IntroductionVisual from '@/components/animated/IntroductionVisual';

// Brand colors
const COLORS = {
  orange: '#E06D00',
  blue: '#0056b3',
  green: '#A2AD1A',
  lightOrange: '#FFE5CC',
  lightBlue: '#E6F2FF',
  lightGreen: '#F0F5E6',
};

// Animated cursor component reused across visuals
function AnimatedCursor({ x, y, clicking = false }: { x: number; y: number; clicking?: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ left: x, top: y }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <motion.div animate={clicking ? { scale: [1, 0.8, 1] } : {}} transition={{ duration: 0.2 }}>
        <MousePointer2 size={20} className="text-slate-800 drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
      </motion.div>
      {clicking && (
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-4 h-4 rounded-full bg-blue-400"
        />
      )}
    </motion.div>
  );
}

// ==============================================================================
// STEP 1: Introduction
// ==============================================================================
export function Step1Visual() {
  return <IntroductionVisual />;
}

// ==============================================================================
// STEP 3: Referral Flow — Animated SVG path with traveling dot
// ==============================================================================
export function Step3Visual() {
  const [activeNode, setActiveNode] = useState(0);
  const [pathProgress, setPathProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number;
    const duration = 6000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % duration;
      const progress = elapsed / duration;
      setPathProgress(progress);
      setActiveNode(Math.min(3, Math.floor(progress * 4)));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const nodes = [
    { label: 'Google Search', sublabel: 'or Maps', icon: Search, color: COLORS.blue },
    { label: 'Your GBP', sublabel: 'Listing', icon: Building2, color: COLORS.orange },
    { label: 'GoodTherapy', sublabel: 'Profile', icon: Globe, color: COLORS.green },
    { label: 'Client', sublabel: 'Contacts You', icon: Phone, color: COLORS.green },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="relative bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-lg overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-orange-50/20 to-green-50/30 pointer-events-none" />

        {/* Desktop: Horizontal flow */}
        <div className="relative flex items-center justify-between gap-2">
          {/* SVG connecting path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={COLORS.blue} />
                <stop offset="50%" stopColor={COLORS.orange} />
                <stop offset="100%" stopColor={COLORS.green} />
              </linearGradient>
            </defs>
            {/* Background path */}
            <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="#e5e7eb" strokeWidth="3" strokeDasharray="8,4" />
            {/* Animated progress path */}
            <line
              x1="15%"
              y1="50%"
              x2={`${15 + pathProgress * 70}%`}
              y2="50%"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Traveling dot */}
            <circle
              cx={`${15 + pathProgress * 70}%`}
              cy="50%"
              r="6"
              fill={pathProgress < 0.33 ? COLORS.blue : pathProgress < 0.66 ? COLORS.orange : COLORS.green}
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.2))' }}
            />
          </svg>

          {/* Nodes */}
          {nodes.map((node, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                opacity: 1,
                scale: activeNode >= idx ? 1.05 : 1,
                y: 0,
              }}
              transition={{ delay: idx * 0.15, duration: 0.5, type: 'spring' }}
              className="relative z-10 flex flex-col items-center gap-3 flex-1"
            >
              {/* Icon circle */}
              <motion.div
                animate={{
                  boxShadow: activeNode === idx ? `0 0 20px ${node.color}40` : '0 4px 12px rgba(0,0,0,0.1)',
                  scale: activeNode === idx ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                style={{ backgroundColor: activeNode >= idx ? `${node.color}18` : '#f8fafc' }}
              >
                <node.icon
                  size={28}
                  style={{ color: activeNode >= idx ? node.color : '#94a3b8' }}
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* Label */}
              <div className="text-center">
                <p className="text-sm font-bold" style={{ color: activeNode >= idx ? node.color : '#94a3b8' }}>
                  {node.label}
                </p>
                <p className="text-xs text-slate-400">{node.sublabel}</p>
              </div>

              {/* Active indicator */}
              {activeNode === idx && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==============================================================================
// STEP 4: Gather Details — Clipboard checklist with animated cursor
// ==============================================================================
export function Step4Visual() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false]);
  const [cursorIdx, setCursorIdx] = useState(-1);

  const items = [
    { icon: Building2, label: 'Practice Name', sublabel: 'Exact version you want public' },
    { icon: MapPin, label: 'Address / Service Area', sublabel: 'Where clients can find you' },
    { icon: Phone, label: 'Phone Number', sublabel: 'For new inquiries' },
    { icon: Mail, label: 'Google Account', sublabel: 'Gmail or Workspace' },
    { icon: Globe, label: 'GoodTherapy Link', sublabel: 'Your profile URL' },
  ];

  useEffect(() => {
    let idx = 0;
    const checkNext = () => {
      if (idx < items.length) {
        setCursorIdx(idx);
        setTimeout(() => {
          setCheckedItems(prev => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          idx++;
          setTimeout(checkNext, 600);
        }, 800);
      }
    };
    setTimeout(checkNext, 800);
  }, []);

  const checkedCount = checkedItems.filter(Boolean).length;
  const progress = (checkedCount / items.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 relative overflow-hidden"
      >
        {/* Header with clipboard icon and progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Clipboard size={24} style={{ color: COLORS.orange }} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Setup Checklist</h3>
              <p className="text-xs text-slate-500">{checkedCount} of {items.length} ready</p>
            </div>
          </div>

          {/* Progress ring */}
          <div className="relative w-12 h-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
              <motion.circle
                cx="24" cy="24" r="20" fill="none"
                stroke={COLORS.green}
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 20}`}
                animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - progress / 100) }}
                strokeLinecap="round"
                transition={{ duration: 0.4 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: COLORS.green }}>
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Items list */}
        <div className="space-y-3">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                checkedItems[idx]
                  ? 'bg-green-50/50 border-green-200'
                  : cursorIdx === idx
                    ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                    : 'bg-slate-50 border-slate-100'
              }`}
            >
              {/* Checkbox */}
              <motion.div
                animate={{
                  scale: checkedItems[idx] ? 1 : cursorIdx === idx ? 1.1 : 1,
                  backgroundColor: checkedItems[idx] ? COLORS.green : '#e2e8f0',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              >
                {checkedItems[idx] && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.div>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: checkedItems[idx] ? `${COLORS.green}15` : COLORS.lightOrange }}
              >
                <item.icon size={20} style={{ color: checkedItems[idx] ? COLORS.green : COLORS.orange }} />
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${checkedItems[idx] ? 'text-green-800' : 'text-slate-700'}`}>
                  {item.label}
                </p>
                <p className="text-xs text-slate-400">{item.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All done message */}
        <AnimatePresence>
          {checkedCount === items.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3"
            >
              <Sparkles size={20} style={{ color: COLORS.green }} />
              <p className="text-sm font-semibold" style={{ color: COLORS.green }}>
                You're ready to start setting up your profile!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ==============================================================================
// STEP 5: Sign In — Google sign-in with animated cursor flow
// ==============================================================================
export function Step5Visual() {
  const [stage, setStage] = useState(0);
  // Stages: 0=idle, 1=typing email, 2=cursor to button, 3=clicking, 4=loading, 5=success
  const [emailText, setEmailText] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 200, y: 180 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const email = 'your.name@gmail.com';
    let timeout: NodeJS.Timeout;

    // Stage 0: Wait then start
    timeout = setTimeout(() => {
      setStage(1);
      setCursorPos({ x: 150, y: 195 });
    }, 800);

    // Stage 1: Type email
    setTimeout(() => {
      let i = 0;
      const typeChar = () => {
        if (i <= email.length) {
          setEmailText(email.slice(0, i));
          i++;
          setTimeout(typeChar, 50 + Math.random() * 40);
        } else {
          setTimeout(() => {
            setStage(2);
            setCursorPos({ x: 180, y: 285 });
          }, 400);
        }
      };
      typeChar();
    }, 1200);

    // Stage 3-5 handled after cursor moves
    setTimeout(() => {
      setStage(3);
      setClicking(true);
      setTimeout(() => {
        setClicking(false);
        setStage(4);
        setTimeout(() => setStage(5), 1200);
      }, 300);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <DeviceFrame type="browser" className="max-w-2xl mx-auto">
      <div className="min-h-[460px] bg-white flex flex-col items-center justify-center p-8 gap-8 relative">
        {/* Animated cursor */}
        {stage < 5 && <AnimatedCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />}

        {/* Google logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="text-3xl font-bold tracking-tight">
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Business Profile</p>
        </motion.div>

        {/* Sign in form */}
        <div className="w-full max-w-sm space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <label className="text-sm font-medium text-slate-700 block mb-2">Email</label>
            <motion.div
              animate={{
                borderColor: stage >= 1 && stage < 3 ? COLORS.blue : '#e2e8f0',
                boxShadow: stage >= 1 && stage < 3 ? `0 0 0 3px ${COLORS.lightBlue}` : 'none',
              }}
              className="w-full px-4 py-2.5 border-2 rounded-lg bg-white text-slate-900 text-sm"
            >
              {emailText || <span className="text-slate-400">your@email.com</span>}
              {stage === 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-0.5 h-4 bg-blue-600 ml-0.5 align-middle"
                />
              )}
            </motion.div>
          </motion.div>

          {/* Manage now button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: stage === 3 ? 0.97 : 1,
              boxShadow: stage === 3 ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,86,179,0.3)',
            }}
            className="w-full py-3 rounded-lg font-semibold text-white relative overflow-hidden"
            style={{ backgroundColor: COLORS.blue }}
          >
            {stage === 4 ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
              />
            ) : (
              'Manage now'
            )}
            {/* Ripple effect */}
            {stage === 3 && (
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white"
              />
            )}
          </motion.button>

          {/* Success state */}
          <AnimatePresence>
            {stage === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-50 border-2 border-green-200"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: COLORS.green }}
                >
                  <Check size={18} className="text-white" strokeWidth={3} />
                </motion.div>
                <p className="text-sm font-bold" style={{ color: COLORS.green }}>
                  Signed in successfully!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DeviceFrame>
  );
}

// ==============================================================================
// STEP 6: Practice Name — Search with typing, dropdown, cursor click
// ==============================================================================
export function Step6Visual() {
  const [text, setText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 150, y: 100 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const fullText = 'Mindful Therapy Practice';
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    // Type the name
    const typeChar = () => {
      if (charIndex <= fullText.length) {
        setText(fullText.slice(0, charIndex));
        charIndex++;
        timeout = setTimeout(typeChar, 40 + Math.random() * 30);
      } else {
        setTimeout(() => setShowDropdown(true), 400);
        // Move cursor to first dropdown item
        setTimeout(() => setCursorPos({ x: 160, y: 195 }), 800);
        // Click it
        setTimeout(() => {
          setClicking(true);
          setTimeout(() => {
            setClicking(false);
            setSelected(true);
          }, 200);
        }, 1500);
      }
    };

    timeout = setTimeout(typeChar, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <DeviceFrame type="browser" className="max-w-2xl mx-auto">
      <div className="min-h-[460px] bg-white p-8 relative">
        {!selected && <AnimatedCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />}

        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Building2 size={18} style={{ color: COLORS.blue }} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Business Name</h2>
        </div>

        {/* Search input */}
        <div className="max-w-md relative">
          <motion.div
            animate={{
              borderColor: showDropdown && !selected ? COLORS.blue : selected ? COLORS.green : '#e2e8f0',
              boxShadow: showDropdown && !selected ? `0 0 0 3px ${COLORS.lightBlue}` : selected ? `0 0 0 3px ${COLORS.lightGreen}` : 'none',
            }}
            className="w-full px-4 py-3 border-2 rounded-lg bg-white text-slate-900 flex items-center"
          >
            <span>{text}</span>
            {!selected && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-5 bg-blue-600 ml-0.5"
              />
            )}
            {selected && <Check size={18} className="ml-auto" style={{ color: COLORS.green }} />}
          </motion.div>

          {/* Dropdown */}
          <AnimatePresence>
            {showDropdown && !selected && (
              <motion.div
                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-10 origin-top"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="px-4 py-3.5 flex items-center gap-3 cursor-pointer transition-colors"
                  style={{ backgroundColor: COLORS.lightBlue }}
                >
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: COLORS.blue }}>
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">{text}</span>
                    <p className="text-xs text-slate-500">Existing business found</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-t border-slate-100"
                >
                  <p className="text-sm text-slate-600">Create a business with this name</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected state */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2"
              >
                <CheckCircle size={16} style={{ color: COLORS.green }} />
                <span className="text-sm font-medium" style={{ color: COLORS.green }}>Business name claimed!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DeviceFrame>
  );
}

// ==============================================================================
// STEP 7: Category — Filterable dropdown with icons
// ==============================================================================
export function Step7Visual() {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const categories = [
    { name: 'Mental health service', icon: Brain },
    { name: 'Psychotherapist', icon: Heart },
    { name: 'Marriage counselor', icon: Users },
    { name: 'Family counselor', icon: Users },
    { name: 'Psychologist', icon: Stethoscope },
  ];

  useEffect(() => {
    const fullText = 'Mental health';
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    const typeChar = () => {
      if (charIndex <= fullText.length) {
        setSearchText(fullText.slice(0, charIndex));
        charIndex++;
        timeout = setTimeout(typeChar, 55 + Math.random() * 30);
      } else {
        setTimeout(() => setIsOpen(true), 300);
        setTimeout(() => setSelected('Mental health service'), 2000);
      }
    };

    timeout = setTimeout(typeChar, 600);
    return () => clearTimeout(timeout);
  }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(searchText.toLowerCase()) || !searchText
  );

  return (
    <DeviceFrame type="browser" className="max-w-2xl mx-auto">
      <div className="min-h-[460px] bg-white p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Search size={18} style={{ color: COLORS.orange }} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Business Category</h2>
        </div>

        <div className="max-w-md relative">
          {/* Search input */}
          <motion.div
            animate={{
              borderColor: selected ? COLORS.green : isOpen ? COLORS.orange : '#e2e8f0',
              boxShadow: selected ? `0 0 0 3px ${COLORS.lightGreen}` : isOpen ? `0 0 0 3px ${COLORS.lightOrange}` : 'none',
            }}
            className="w-full px-4 py-3 border-2 rounded-lg bg-white text-slate-900 flex items-center"
          >
            {selected ? (
              <div className="flex items-center gap-2 w-full">
                <Brain size={16} style={{ color: COLORS.green }} />
                <span className="font-medium">{selected}</span>
                <Check size={16} className="ml-auto" style={{ color: COLORS.green }} />
              </div>
            ) : (
              <>
                <span>{searchText}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-0.5 h-5 bg-orange-500 ml-0.5"
                />
              </>
            )}
          </motion.div>

          {/* Dropdown */}
          <AnimatePresence>
            {isOpen && !selected && (
              <motion.div
                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-10 origin-top"
              >
                {filtered.map((category, idx) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className={`px-4 py-3.5 flex items-center gap-3 cursor-pointer transition-colors border-b border-slate-50 last:border-b-0 ${
                      idx === 0 ? 'bg-orange-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <category.icon
                      size={18}
                      style={{ color: idx === 0 ? COLORS.orange : '#94a3b8' }}
                    />
                    <span className={`text-sm ${idx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                      {category.name}
                    </span>
                    {idx === 0 && (
                      <span className="ml-auto text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                        BEST MATCH
                      </span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected badge */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2"
              >
                <div className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: COLORS.green }}>
                  Primary Category
                </div>
                <span className="text-xs text-slate-500">You can add more later</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DeviceFrame>
  );
}

// ==============================================================================
// STEP 8: Location Display — Office vs Service Area with map sketches
// ==============================================================================
export function Step8Visual() {
  const [mode, setMode] = useState<'office' | 'service'>('office');

  useEffect(() => {
    const timer = setInterval(() => {
      setMode(prev => (prev === 'office' ? 'service' : 'office'));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Office visits card */}
        <motion.div
          onClick={() => setMode('office')}
          animate={{
            borderColor: mode === 'office' ? COLORS.blue : '#e5e7eb',
            scale: mode === 'office' ? 1.02 : 0.98,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative p-6 rounded-2xl border-2 cursor-pointer shadow-lg bg-white overflow-hidden"
        >
          {/* Map sketch background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(0,86,179,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,86,179,0.3) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </div>

          <motion.div
            animate={{ backgroundColor: mode === 'office' ? COLORS.lightBlue : '#f9fafb' }}
            className="relative rounded-xl p-6 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{
                boxShadow: mode === 'office' ? `0 0 24px ${COLORS.blue}30` : '0 4px 12px rgba(0,0,0,0.05)',
              }}
              className="w-20 h-20 rounded-full flex items-center justify-center bg-white border-4"
              style={{ borderColor: mode === 'office' ? COLORS.blue : '#e5e7eb' }}
            >
              <Building2 size={32} style={{ color: mode === 'office' ? COLORS.blue : '#94a3b8' }} />
            </motion.div>

            <div className="text-center">
              <h3 className="font-bold text-lg text-slate-900 mb-1">Office Visits</h3>
              <p className="text-sm text-slate-500">Clients come to your address</p>
            </div>

            {/* Pin drop animation */}
            {mode === 'office' && (
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200"
              >
                <MapPin size={14} style={{ color: COLORS.blue }} />
                <span className="text-xs font-medium text-blue-800">123 Main St, City, State</span>
              </motion.div>
            )}
          </motion.div>

          {mode === 'office' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: COLORS.blue }}
            >
              <Check size={14} className="text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>

        {/* Service area card */}
        <motion.div
          onClick={() => setMode('service')}
          animate={{
            borderColor: mode === 'service' ? COLORS.green : '#e5e7eb',
            scale: mode === 'service' ? 1.02 : 0.98,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative p-6 rounded-2xl border-2 cursor-pointer shadow-lg bg-white overflow-hidden"
        >
          {/* Map sketch background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at center, ${COLORS.green}40 0%, transparent 70%)`,
            }} />
          </div>

          <motion.div
            animate={{ backgroundColor: mode === 'service' ? COLORS.lightGreen : '#f9fafb' }}
            className="relative rounded-xl p-6 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{
                boxShadow: mode === 'service' ? `0 0 24px ${COLORS.green}30` : '0 4px 12px rgba(0,0,0,0.05)',
              }}
              className="w-20 h-20 rounded-full flex items-center justify-center bg-white border-4"
              style={{ borderColor: mode === 'service' ? COLORS.green : '#e5e7eb' }}
            >
              <MapPin size={32} style={{ color: mode === 'service' ? COLORS.green : '#94a3b8' }} />
            </motion.div>

            <div className="text-center">
              <h3 className="font-bold text-lg text-slate-900 mb-1">Service Area</h3>
              <p className="text-sm text-slate-500">You travel to clients</p>
            </div>

            {/* Radius expansion */}
            {mode === 'service' && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200"
              >
                <Globe size={14} style={{ color: COLORS.green }} />
                <span className="text-xs font-medium text-green-800">Within 25 miles of location</span>
              </motion.div>
            )}
          </motion.div>

          {mode === 'service' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: COLORS.green }}
            >
              <Check size={14} className="text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ==============================================================================
// STEP 9: Contact Details — Phone + Website with validation animations
// ==============================================================================
export function Step9Visual() {
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [websiteValid, setWebsiteValid] = useState(false);
  const [activeField, setActiveField] = useState<'phone' | 'website' | 'done'>('phone');

  useEffect(() => {
    const phoneNumber = '(555) 123-4567';
    const websiteUrl = 'goodtherapy.org/therapists/yourname';
    let timeout: NodeJS.Timeout;

    // Type phone
    let phoneIdx = 0;
    const typePhone = () => {
      if (phoneIdx <= phoneNumber.length) {
        setPhone(phoneNumber.slice(0, phoneIdx));
        phoneIdx++;
        timeout = setTimeout(typePhone, 40 + Math.random() * 20);
      } else {
        setPhoneValid(true);
        setTimeout(() => {
          setActiveField('website');
          let webIdx = 0;
          const typeWeb = () => {
            if (webIdx <= websiteUrl.length) {
              setWebsite(websiteUrl.slice(0, webIdx));
              webIdx++;
              timeout = setTimeout(typeWeb, 35 + Math.random() * 20);
            } else {
              setWebsiteValid(true);
              setTimeout(() => setActiveField('done'), 400);
            }
          };
          setTimeout(typeWeb, 500);
        }, 600);
      }
    };

    timeout = setTimeout(typePhone, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <DeviceFrame type="browser" className="max-w-2xl mx-auto">
      <div className="min-h-[460px] bg-white p-8 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Phone size={18} style={{ color: COLORS.blue }} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Contact Information</h2>
        </div>

        {/* Phone field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number
            {phoneValid && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex ml-2"
              >
                <CheckCircle size={14} style={{ color: COLORS.green }} />
              </motion.span>
            )}
          </label>
          <motion.div
            animate={{
              borderColor: phoneValid ? COLORS.green : activeField === 'phone' ? COLORS.blue : '#e2e8f0',
              boxShadow: phoneValid ? `0 0 0 3px ${COLORS.lightGreen}` : activeField === 'phone' ? `0 0 0 3px ${COLORS.lightBlue}` : 'none',
            }}
            className="flex items-center gap-3 w-full px-4 py-3 border-2 rounded-lg bg-white"
          >
            <motion.div
              animate={activeField === 'phone' && phone.length > 5 ? { rotate: [-3, 3, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Phone size={18} className="text-slate-400" />
            </motion.div>
            <span className="text-slate-900 text-sm">{phone || <span className="text-slate-400">(555) 000-0000</span>}</span>
            {activeField === 'phone' && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-5 bg-blue-600"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Website field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Website (GoodTherapy Link)
            {websiteValid && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex ml-2"
              >
                <CheckCircle size={14} style={{ color: COLORS.green }} />
              </motion.span>
            )}
          </label>
          <motion.div
            animate={{
              borderColor: websiteValid ? COLORS.green : activeField === 'website' ? COLORS.blue : '#e2e8f0',
              boxShadow: websiteValid ? `0 0 0 3px ${COLORS.lightGreen}` : activeField === 'website' ? `0 0 0 3px ${COLORS.lightBlue}` : 'none',
            }}
            className="flex items-center gap-3 w-full px-4 py-3 border-2 rounded-lg bg-white"
          >
            <Globe size={18} className="text-slate-400 shrink-0" />
            <span className="text-slate-900 text-sm truncate">{website || <span className="text-slate-400">Your website URL</span>}</span>
            {activeField === 'website' && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-5 bg-blue-600 shrink-0"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Save button */}
        <AnimatePresence>
          {activeField === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                animate={{ boxShadow: ['0 0 0 0 rgba(162,173,26,0)', '0 0 0 8px rgba(162,173,26,0.2)', '0 0 0 0 rgba(162,173,26,0)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-full py-3 rounded-lg font-semibold text-white"
                style={{ backgroundColor: COLORS.green }}
              >
                Save & Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DeviceFrame>
  );
}

// ==============================================================================
// STEP 10: Verification — 2x2 grid with sequential highlights
// ==============================================================================
export function Step10Visual() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const methods = [
    {
      icon: Mail,
      label: 'Postcard',
      desc: 'Mailed to your address',
      color: COLORS.blue,
      lightColor: COLORS.lightBlue,
    },
    {
      icon: Phone,
      label: 'Phone / SMS',
      desc: 'Code via text or call',
      color: COLORS.green,
      lightColor: COLORS.lightGreen,
    },
    {
      icon: Mail,
      label: 'Email',
      desc: 'Code sent to your email',
      color: COLORS.orange,
      lightColor: COLORS.lightOrange,
    },
    {
      icon: Video,
      label: 'Video',
      desc: 'Record a short video',
      color: '#9333ea',
      lightColor: '#f3e8ff',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <div className="grid grid-cols-2 gap-4">
        {methods.map((method, idx) => {
          const isActive = activeIdx === idx;
          return (
            <motion.div
              key={idx}
              animate={{
                scale: isActive ? 1.03 : 0.98,
                borderColor: isActive ? method.color : '#e5e7eb',
                boxShadow: isActive ? `0 0 20px ${method.color}20` : '0 2px 8px rgba(0,0,0,0.04)',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="p-6 rounded-2xl border-2 bg-white cursor-pointer relative overflow-hidden"
            >
              {/* Background glow */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.08 }}
                  className="absolute inset-0"
                  style={{ backgroundColor: method.color }}
                />
              )}

              <div className="relative flex flex-col items-center gap-4">
                {/* Icon */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive ? method.color : method.lightColor,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                >
                  {/* Icon-specific animations */}
                  <motion.div
                    animate={
                      isActive
                        ? idx === 0 ? { rotateY: [0, 180, 0] } // envelope flip
                        : idx === 1 ? { x: [-2, 2, -2, 2, 0] } // phone vibrate
                        : idx === 2 ? { y: [0, -5, 0] } // email bounce
                        : { scale: [1, 1.15, 1] } // video pulse
                        : {}
                    }
                    transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
                  >
                    <method.icon
                      size={28}
                      style={{ color: isActive ? '#fff' : method.color }}
                    />
                  </motion.div>
                </motion.div>

                {/* Text */}
                <div className="text-center">
                  <h3 className="font-bold text-base" style={{ color: isActive ? method.color : '#374151' }}>
                    {method.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{method.desc}</p>
                </div>

                {/* Code preview */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-1.5"
                  >
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-7 h-9 rounded-md border-2 flex items-center justify-center text-sm font-bold"
                        style={{ borderColor: method.color, color: method.color }}
                      >
                        {Math.floor(Math.random() * 10)}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {methods.map((method, idx) => (
          <motion.div
            key={idx}
            animate={{
              width: activeIdx === idx ? 24 : 8,
              backgroundColor: activeIdx === idx ? method.color : '#e5e7eb',
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

// ==============================================================================
// STEP 11: Key Details — Hours + Description with typing
// ==============================================================================
export function Step11Visual() {
  const [hoursVisible, setHoursVisible] = useState(0);
  const [descText, setDescText] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const hoursInterval = setInterval(() => {
      setHoursVisible(prev => (prev < 5 ? prev + 1 : 5));
    }, 350);

    const fullDesc = 'I offer online and in-person therapy for adults. I support people with anxiety, stress, depression, and relationship concerns. Visit my GoodTherapy profile for full details.';
    let descIdx = 0;
    const typeDesc = () => {
      if (descIdx <= fullDesc.length) {
        setDescText(fullDesc.slice(0, descIdx));
        setCharCount(descIdx);
        descIdx++;
        setTimeout(typeDesc, 25 + Math.random() * 15);
      }
    };

    setTimeout(typeDesc, 2200);
    return () => clearInterval(hoursInterval);
  }, []);

  const days = [
    { day: 'Mon', time: '9:00 AM - 5:00 PM' },
    { day: 'Tue', time: '9:00 AM - 5:00 PM' },
    { day: 'Wed', time: '9:00 AM - 7:00 PM' },
    { day: 'Thu', time: '9:00 AM - 5:00 PM' },
    { day: 'Fri', time: '9:00 AM - 3:00 PM' },
  ];

  return (
    <DeviceFrame type="browser" className="max-w-2xl mx-auto">
      <div className="min-h-[520px] bg-white p-8 space-y-6">
        {/* Hours Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock size={18} style={{ color: COLORS.orange }} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Business Hours</h3>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1">
            {days.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={hoursVisible > idx ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, type: 'spring' }}
                className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white transition-colors"
              >
                <span className="font-semibold text-sm text-slate-700 w-12">{item.day}</span>
                <div className="flex-1 h-px bg-slate-200 mx-4" />
                <span className="text-sm text-slate-600 font-mono">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText size={18} style={{ color: COLORS.blue }} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">About Your Practice</h3>
          </div>
          <motion.div
            animate={{
              borderColor: descText.length > 0 ? COLORS.blue : '#e2e8f0',
            }}
            className="relative w-full min-h-[100px] px-4 py-3 border-2 rounded-xl bg-white text-slate-700 text-sm leading-relaxed"
          >
            {descText}
            {descText.length < 175 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-4 bg-blue-600 ml-0.5 align-middle"
              />
            )}
          </motion.div>
          <div className="mt-2 flex justify-between">
            <span className="text-xs text-slate-400">Keep it clear and client-focused</span>
            <span className="text-xs font-mono" style={{ color: charCount > 100 ? COLORS.green : '#94a3b8' }}>
              {charCount} / 750
            </span>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

// ==============================================================================
// STEP 12: Appointment Link — URL paste with preview build-up
// ==============================================================================
export function Step12Visual() {
  const [stage, setStage] = useState(0);
  // 0=empty, 1=pasting, 2=validating, 3=valid, 4=preview

  useEffect(() => {
    const timings = [800, 1000, 1200, 800];
    let currentStage = 0;

    const advance = () => {
      if (currentStage < timings.length) {
        setTimeout(() => {
          currentStage++;
          setStage(currentStage);
          advance();
        }, timings[currentStage]);
      }
    };

    advance();
  }, []);

  return (
    <DeviceFrame type="browser" className="max-w-2xl mx-auto">
      <div className="min-h-[460px] bg-white p-8 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Calendar size={18} style={{ color: COLORS.orange }} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Booking Link</h2>
        </div>

        {/* URL Input */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Appointment URL</label>
          <motion.div
            animate={{
              borderColor: stage >= 3 ? COLORS.green : stage >= 1 ? COLORS.blue : '#e2e8f0',
              boxShadow: stage >= 3 ? `0 0 0 3px ${COLORS.lightGreen}` : stage >= 1 ? `0 0 0 3px ${COLORS.lightBlue}` : 'none',
            }}
            className="w-full px-4 py-3 border-2 rounded-lg bg-white flex items-center gap-3"
          >
            <Link size={16} className="text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              {stage === 0 && <span className="text-slate-400 text-sm">Paste your GoodTherapy URL</span>}
              {stage >= 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-slate-900 truncate block"
                >
                  goodtherapy.org/therapists/yourname
                </motion.span>
              )}
            </div>
            {/* Status indicator */}
            {stage === 2 && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                className="w-5 h-5 border-2 border-slate-200 border-t-blue-600 rounded-full shrink-0"
              />
            )}
            {stage >= 3 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <CheckCircle size={18} style={{ color: COLORS.green }} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Preview card */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="overflow-hidden"
            >
              <p className="text-xs text-slate-500 mb-3 uppercase font-bold tracking-wider">Live Preview</p>
              <div className="p-5 rounded-xl border-2 border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center">
                    <Building2 size={20} style={{ color: COLORS.orange }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Example Therapy Practice</h4>
                    <p className="text-xs text-slate-500">Mental health service</p>
                  </div>
                </div>
                <motion.button
                  animate={{
                    boxShadow: ['0 0 0 0 rgba(0,86,179,0)', '0 0 0 6px rgba(0,86,179,0.15)', '0 0 0 0 rgba(0,86,179,0)'],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-full py-2.5 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
                  style={{ backgroundColor: COLORS.blue }}
                >
                  <Calendar size={16} />
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DeviceFrame>
  );
}

// ==============================================================================
// STEP 13: Photos — Upload zone with progress rings
// ==============================================================================
export function Step13Visual() {
  const [uploadedCount, setUploadedCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState([0, 0, 0]);

  const photos = [
    { icon: User, label: 'Professional Headshot', color: COLORS.blue },
    { icon: Building2, label: 'Office Exterior', color: COLORS.orange },
    { icon: Heart, label: 'Practice Logo', color: COLORS.green },
  ];

  useEffect(() => {
    let photoIdx = 0;

    const uploadNext = () => {
      if (photoIdx < 3) {
        const currentIdx = photoIdx;
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 5;
          setUploadProgress(prev => {
            const next = [...prev];
            next[currentIdx] = Math.min(progress, 100);
            return next;
          });
          if (progress >= 100) {
            clearInterval(progressInterval);
            setUploadedCount(prev => prev + 1);
            photoIdx++;
            setTimeout(uploadNext, 400);
          }
        }, 40);
      }
    };

    setTimeout(uploadNext, 1000);
  }, []);

  return (
    <DeviceFrame type="browser" className="max-w-2xl mx-auto">
      <div className="min-h-[460px] bg-white p-8 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Camera size={18} style={{ color: COLORS.green }} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Add Photos</h2>
          <span className="ml-auto text-sm font-bold" style={{ color: COLORS.green }}>
            {uploadedCount}/3
          </span>
        </div>

        {/* Upload zone */}
        <motion.div
          animate={{
            borderColor: uploadedCount > 0 ? COLORS.green : '#cbd5e1',
            backgroundColor: uploadedCount > 0 ? `${COLORS.lightGreen}` : '#fafafa',
          }}
          className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 transition-colors"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <Upload size={32} className="text-slate-300" />
          </motion.div>
          <div className="text-center">
            <p className="font-semibold text-slate-700 text-sm">Drag photos here</p>
            <p className="text-xs text-slate-400">or click to browse</p>
          </div>
        </motion.div>

        {/* Photo thumbnails with progress */}
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-2 bg-slate-50"
              style={{ borderColor: uploadProgress[idx] >= 100 ? photo.color : '#e5e7eb' }}
            >
              {/* Progress ring overlay */}
              {uploadProgress[idx] > 0 && uploadProgress[idx] < 100 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="24" cy="24" r="20" fill="none"
                      stroke={photo.color}
                      strokeWidth="3"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - uploadProgress[idx] / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              <photo.icon size={24} style={{ color: uploadProgress[idx] >= 100 ? photo.color : '#94a3b8' }} />
              <p className="text-xs font-medium text-center px-2" style={{ color: uploadProgress[idx] >= 100 ? photo.color : '#94a3b8' }}>
                {photo.label}
              </p>

              {/* Completed checkmark */}
              {uploadProgress[idx] >= 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: photo.color }}
                >
                  <Check size={14} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

// ==============================================================================
// STEP 14: Send Link — Multi-stage share flow animation
// ==============================================================================
export function Step14Visual() {
  const [stage, setStage] = useState(0);
  // 0=search result, 1=listing expanded, 2=share menu, 3=copied, 4=email compose, 5=sent

  useEffect(() => {
    const timings = [1500, 1500, 1500, 1500, 2000, 2000];
    let current = 0;

    const advance = () => {
      setTimeout(() => {
        current++;
        if (current > 5) {
          current = 0;
          setStage(0);
        } else {
          setStage(current);
        }
        advance();
      }, timings[current] || 1500);
    };

    advance();
  }, []);

  return (
    <DeviceFrame type="browser" className="max-w-2xl mx-auto">
      <div className="min-h-[460px] bg-white p-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Stage 0-1: Search result / listing */}
          {stage <= 1 && (
            <motion.div
              key="listing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <Search size={14} />
                <span>google.com/search?q=your+therapy+practice</span>
              </div>

              <motion.div
                animate={{ scale: stage === 1 ? 1.02 : 1 }}
                className="p-5 rounded-xl border-2 bg-white shadow-sm"
                style={{ borderColor: stage === 1 ? COLORS.blue : '#e5e7eb' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Building2 size={20} style={{ color: COLORS.blue }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Your Therapy Practice</h3>
                    <p className="text-xs text-slate-500">Mental health service · City, ST</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-sm font-bold">4.9</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">(42)</span>
                </div>

                {stage === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 pt-3 border-t border-slate-100"
                  >
                    <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: COLORS.blue }}>
                      Directions
                    </button>
                    <motion.button
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold border-2 flex items-center gap-1.5"
                      style={{ borderColor: COLORS.orange, color: COLORS.orange }}
                    >
                      <Share2 size={12} /> Share
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Stage 2-3: Share menu / copied */}
          {(stage === 2 || stage === 3) && (
            <motion.div
              key="share"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-lg">
                <h3 className="font-bold text-slate-900 mb-4">Share your profile</h3>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border text-sm mb-3">
                  <Globe size={16} className="text-slate-400 shrink-0" />
                  <span className="text-slate-600 truncate">g.page/your-therapy-practice</span>
                </div>
                <motion.button
                  animate={stage === 2 ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white text-sm"
                  style={{ backgroundColor: stage === 3 ? COLORS.green : COLORS.blue }}
                >
                  {stage === 3 ? (
                    <>
                      <Check size={16} /> Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy Link
                    </>
                  )}
                </motion.button>
              </div>

              {stage === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2"
                >
                  <CheckCircle size={16} style={{ color: COLORS.green }} />
                  <span className="text-sm font-medium" style={{ color: COLORS.green }}>Copied to clipboard!</span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Stage 4-5: Email compose / sent */}
          {(stage === 4 || stage === 5) && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="p-5 rounded-xl border-2 bg-white" style={{ borderColor: COLORS.orange }}>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500 w-10 text-right">To:</span>
                    <span className="font-medium text-slate-900">Editor@GoodTherapy.org</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500 w-10 text-right">Subj:</span>
                    <span className="text-slate-700">My Google Business Profile Link</span>
                  </div>
                  <div className="h-px bg-slate-200" />
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 leading-relaxed">
                  Hi, here is my Google Business Profile link:
                  <br />
                  <span className="text-blue-600 font-medium">g.page/your-therapy-practice</span>
                </div>

                {stage === 4 && (
                  <motion.button
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mt-4 px-6 py-2 rounded-lg font-semibold text-white text-sm flex items-center gap-2"
                    style={{ backgroundColor: COLORS.orange }}
                  >
                    <Send size={14} /> Send
                  </motion.button>
                )}

                {stage === 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <CheckCircle size={20} style={{ color: COLORS.green }} />
                    </motion.div>
                    <span className="text-sm font-bold" style={{ color: COLORS.green }}>Email sent to GoodTherapy!</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <motion.div
              key={i}
              animate={{
                width: stage === i ? 16 : 6,
                backgroundColor: stage === i ? COLORS.orange : '#e5e7eb',
              }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}

// ==============================================================================
// STEP 15: Discovery to Contact — Client journey timeline
// ==============================================================================
export function Step15Visual() {
  const [activeStep, setActiveStep] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    let step = 0;
    const timer = setInterval(() => {
      step = (step + 1) % 6;
      if (step === 0) {
        setActiveStep(0);
        setLineHeight(0);
      } else {
        setActiveStep(step);
        setLineHeight(step * 25);
      }
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { icon: Search, label: 'Client searches Google', desc: '"therapist near me" or your name', color: COLORS.blue },
    { icon: MapPin, label: 'Your listing appears', desc: 'In search results or on Maps', color: COLORS.blue },
    { icon: ExternalLink, label: 'Clicks your GoodTherapy link', desc: 'The website link on your profile', color: COLORS.orange },
    { icon: Globe, label: 'Reviews your full profile', desc: 'Credentials, approach, and details', color: COLORS.orange },
    { icon: Phone, label: 'Contacts you', desc: 'Through your preferred method', color: COLORS.green },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <div className="relative space-y-2">
        {/* Animated progress line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 rounded-full">
          <motion.div
            animate={{ height: `${lineHeight}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${COLORS.blue}, ${COLORS.orange}, ${COLORS.green})`,
            }}
          />
        </div>

        {steps.map((stepItem, idx) => {
          const isActive = activeStep > idx;
          const isCurrent = activeStep === idx + 1;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative flex gap-5 items-start py-3"
            >
              {/* Step circle */}
              <motion.div
                animate={{
                  scale: isCurrent ? 1.15 : 1,
                  boxShadow: isCurrent ? `0 0 20px ${stepItem.color}40` : '0 2px 8px rgba(0,0,0,0.08)',
                  backgroundColor: isActive || isCurrent ? stepItem.color : '#f1f5f9',
                }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              >
                <stepItem.icon size={24} className={isActive || isCurrent ? 'text-white' : 'text-slate-400'} />
              </motion.div>

              {/* Content */}
              <motion.div
                animate={{
                  opacity: isActive || isCurrent ? 1 : 0.5,
                }}
                className="pt-1 flex-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{idx + 1}</span>
                  <p className="font-bold text-base text-slate-900">{stepItem.label}</p>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{stepItem.desc}</p>
              </motion.div>

              {/* Arrow */}
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="self-center"
                >
                  <ArrowRight size={16} style={{ color: stepItem.color }} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ==============================================================================
// STEP 16: Privacy & Ethics — Review response comparison
// ==============================================================================
export function Step16Visual() {
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowCorrect(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 space-y-5">
      {/* Mock review card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
            J
          </div>
          <div>
            <p className="font-semibold text-sm text-slate-900">Jane D.</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-slate-400 ml-1">2 weeks ago</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 italic leading-relaxed">
          "Great experience with my anxiety treatment. Very supportive and professional."
        </p>
      </motion.div>

      {/* Response comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wrong response */}
        <motion.div
          animate={{
            opacity: showCorrect ? 0.6 : 1,
            scale: showCorrect ? 0.97 : 1,
            y: showCorrect ? 4 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="p-5 rounded-2xl bg-red-50 border-2 border-red-200 relative"
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={!showCorrect ? { rotate: [0, -10, 10, -10, 0] } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shrink-0"
            >
              <AlertTriangle size={14} className="text-white" />
            </motion.div>
            <span className="font-bold text-red-700 text-sm">DON'T respond like this</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="bg-red-100 px-1 rounded">"Thank you for coming to our</span>{' '}
            <span className="bg-red-200 px-1 rounded font-semibold text-red-800">anxiety session</span>.{' '}
            <span className="bg-red-100 px-1 rounded">We discussed your</span>{' '}
            <span className="bg-red-200 px-1 rounded font-semibold text-red-800">childhood trauma</span>..."
          </p>
          <p className="text-xs text-red-600 mt-3 font-medium">Confirms client relationship & reveals health details</p>
        </motion.div>

        {/* Correct response */}
        <motion.div
          animate={{
            opacity: showCorrect ? 1 : 0.6,
            scale: showCorrect ? 1 : 0.97,
            y: showCorrect ? 0 : 4,
          }}
          transition={{ duration: 0.5 }}
          className="p-5 rounded-2xl bg-green-50 border-2 relative"
          style={{ borderColor: `${COLORS.green}60` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={showCorrect ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: COLORS.green }}
            >
              <Check size={14} className="text-white" strokeWidth={3} />
            </motion.div>
            <span className="font-bold text-sm" style={{ color: COLORS.green }}>DO respond like this</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            "Thank you for your kind words. We're glad we could help. Please{' '}
            <span className="bg-green-100 px-1 rounded font-medium" style={{ color: COLORS.green }}>contact us directly</span>{' '}
            for any follow-up questions or concerns."
          </p>
          <p className="text-xs mt-3 font-medium" style={{ color: COLORS.green }}>General, professional, no personal details</p>
        </motion.div>
      </div>

      {/* Privacy shield reminder */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="flex items-center justify-center gap-2 py-2"
      >
        <Shield size={14} style={{ color: COLORS.blue }} />
        <span className="text-xs font-medium text-slate-500">Never confirm a client relationship in public replies</span>
      </motion.div>
    </div>
  );
}

// ==============================================================================
// STEP 17: Final Checklist — Celebration with gradient progress
// ==============================================================================
export function Step17Visual() {
  const [progress, setProgress] = useState(0);
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    let progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setShowCheckmark(true), 200);
          return 100;
        }
        return prev + 1.5;
      });
    }, 25);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-3xl p-12 shadow-2xl border border-slate-200 flex flex-col items-center overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-orange-50/30 pointer-events-none" />

        {/* Confetti particles */}
        {showCheckmark &&
          [...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                x: (Math.random() - 0.5) * 300,
                y: -Math.random() * 200 - 50,
                rotate: Math.random() * 720,
              }}
              transition={{ duration: 2.5, delay: 0.03 * i, ease: 'easeOut' }}
              className="absolute rounded-sm"
              style={{
                left: '50%',
                top: '40%',
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                backgroundColor: [COLORS.orange, COLORS.blue, COLORS.green, '#FFD700', '#FF6B6B'][i % 5],
              }}
            />
          ))}

        {/* Progress circle */}
        <div className="relative w-36 h-36 mb-8 z-10">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - Math.min(progress, 100) / 100)}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.orange} />
                <stop offset="50%" stopColor={COLORS.green} />
                <stop offset="100%" stopColor={COLORS.blue} />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showCheckmark ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.green }}>
                    <Check size={36} className="text-white" strokeWidth={3} />
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="percent"
                  className="text-3xl font-bold"
                  style={{ color: COLORS.green }}
                >
                  {Math.round(Math.min(progress, 100))}%
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Completion text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showCheckmark ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center z-10"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Setup Complete!</h2>
          <p className="text-base text-slate-500 max-w-sm">
            Your Google Business Profile is optimized and connected to GoodTherapy.
          </p>
        </motion.div>

        {/* Certificate card */}
        <AnimatePresence>
          {showCheckmark && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
              className="mt-8 p-5 rounded-xl border-2 w-full max-w-sm z-10"
              style={{
                borderColor: COLORS.green,
                background: `linear-gradient(135deg, ${COLORS.lightGreen}, white)`,
              }}
            >
              <div className="flex items-center gap-3">
                <Sparkles size={20} style={{ color: COLORS.green }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: COLORS.green }}>All steps completed</p>
                  <p className="text-xs text-slate-500">Your profiles are now aligned</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
