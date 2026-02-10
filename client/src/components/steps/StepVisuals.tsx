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
  Share2,
} from 'lucide-react';
import { DeviceFrame } from '@/components/animated/DeviceFrame';
import IntroductionVisual from '@/components/animated/IntroductionVisual';
import { SetupCompleteModern } from '@/components/animated/SetupCompleteModern';

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
function AnimatedCursor({ x, y, clicking = false }: { x: number | string; y: number | string; clicking?: boolean }) {
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
// STEP 3: Referral Flow — Removed (flow is rendered in ContentBody)
// ==============================================================================
export function Step3Visual() {
  return null;
}

// ==============================================================================
// STEP 4: Gather Details — Removed (checklist is rendered in ContentBody)
// ==============================================================================
export function Step4Visual() {
  return null;
}

// ==============================================================================
// STEP 5: Sign In — Google sign-in with animated cursor flow
// ==============================================================================
export function Step5Visual() {
  const [stage, setStage] = useState(0);
  // Stages: 0=idle, 1=typing email, 2=cursor to button, 3=clicking, 4=loading, 5=success
  const [emailText, setEmailText] = useState('');
  const [cursorPos, setCursorPos] = useState<{ x: number | string; y: number | string }>({ x: 200, y: 180 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const email = 'your.name@gmail.com';
    let timeout: NodeJS.Timeout;

    // Stage 0: Wait then start
    timeout = setTimeout(() => {
      setStage(1);
      setCursorPos({ x: "50%", y: 195 }); // Center for typing
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
            setCursorPos({ x: "50%", y: 320 }); // Move to button center
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
                    className={`px-4 py-3.5 flex items-center gap-3 cursor-pointer transition-colors border-b border-slate-50 last:border-b-0 ${idx === 0 ? 'bg-orange-50' : 'hover:bg-slate-50'
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
// STEP 15: Discovery to Contact — Enhanced client journey timeline
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
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { icon: Search, label: 'Client searches Google', desc: '"therapist near me" or your name', color: COLORS.blue, gradient: 'from-[#1a73e8] to-[#4285F4]' },
    { icon: MapPin, label: 'Your listing appears', desc: 'In search results or on Maps', color: COLORS.blue, gradient: 'from-[#1a73e8] to-[#4285F4]' },
    { icon: ExternalLink, label: 'Clicks your GoodTherapy link', desc: 'The website link on your profile', color: COLORS.orange, gradient: 'from-[#E06D00] to-[#FF8C38]' },
    { icon: Globe, label: 'Reviews your full profile', desc: 'Credentials, approach, and details', color: COLORS.orange, gradient: 'from-[#E06D00] to-[#FF8C38]' },
    { icon: Phone, label: 'Contacts you', desc: 'Through your preferred method', color: COLORS.green, gradient: 'from-[#A2AD1A] to-[#c4d030]' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <div className="relative space-y-1">
        {/* Animated progress line */}
        <div className="absolute left-[2.25rem] top-10 bottom-10 w-1 bg-slate-100 rounded-full overflow-hidden">
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
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: idx * 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
              className="relative flex gap-5 items-center py-3"
            >
              {/* Step circle with number badge */}
              <div className="relative shrink-0">
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.12 : 1,
                    boxShadow: isCurrent
                      ? `0 0 24px ${stepItem.color}50, 0 4px 16px ${stepItem.color}30`
                      : isActive
                        ? `0 4px 12px ${stepItem.color}20`
                        : '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                  className={`relative z-10 w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center ${isActive || isCurrent ? `bg-gradient-to-br ${stepItem.gradient}` : 'bg-slate-50 border border-slate-200'
                    }`}
                >
                  <stepItem.icon size={26} className={isActive || isCurrent ? 'text-white' : 'text-slate-400'} strokeWidth={1.8} />

                  {/* Pulse ring for current step */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      animate={{
                        boxShadow: [
                          `0 0 0 0px ${stepItem.color}40`,
                          `0 0 0 10px ${stepItem.color}00`,
                        ],
                      }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
                    />
                  )}
                </motion.div>

                {/* Number badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.15 + 0.2, type: 'spring', stiffness: 400 }}
                  className="absolute -top-1.5 -right-1.5 z-20 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100"
                >
                  <span className="text-[10px] font-extrabold" style={{ color: stepItem.color }}>{idx + 1}</span>
                </motion.div>
              </div>

              {/* Content card */}
              <motion.div
                animate={{
                  opacity: isActive || isCurrent ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className={`flex-1 p-4 rounded-xl transition-all ${isCurrent
                  ? 'bg-white shadow-md border border-slate-200'
                  : isActive
                    ? 'bg-white/60'
                    : ''
                  }`}
              >
                <p className={`font-bold text-[15px] ${isCurrent ? 'text-slate-900' : 'text-slate-700'}`}>
                  {stepItem.label}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{stepItem.desc}</p>
              </motion.div>

              {/* Arrow indicator */}
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="self-center"
                >
                  <ArrowRight size={18} style={{ color: stepItem.color }} />
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
// STEP 17: Final Checklist — Modern setup complete animation
// ==============================================================================
export function Step17Visual() {
  return <SetupCompleteModern />;
}
