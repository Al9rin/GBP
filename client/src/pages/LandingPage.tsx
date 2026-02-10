import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useAuth } from "@/hooks/use-auth";
import { CheckCircle2, ArrowRight, Home, Mail, List, UserPlus, ExternalLink } from "lucide-react";
import { ContainerScroll } from "@/components/animated/ContainerScroll";
import { GoogleMockup } from "@/components/animated/GoogleMockup";
import { TypewriterH1 } from "@/components/animated/TypewriterH1";
import { AnimatedBackground } from "@/components/animated/AnimatedBackground";
import { CardStack } from "@/components/ui/card-stack";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { STEPS } from "@/lib/steps-data";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navItems = [
    {
      name: 'Home',
      url: '#',
      icon: Home,
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
      name: 'Contact us',
      url: '#',
      icon: Mail,
      iconRight: ExternalLink,
      showEmailPopup: true,
    },
    {
      name: 'Navigate to',
      url: '#',
      icon: List,
      children: STEPS.map((step) => ({
        name: step.title,
        url: `/guide#step-${step.id}`,
        action: () => navigate(`/guide#step-${step.id}`)
      }))
    },
    {
      name: 'Sign up for Google Business Profile',
      url: 'https://business.google.com/ca-en/business-profile/?ppsrc=GPDA2',
      icon: UserPlus,
      iconRight: ExternalLink, // Added right icon
      action: () => window.open('https://business.google.com/ca-en/business-profile/?ppsrc=GPDA2', '_blank'),
      className: "text-[#1a73e8] font-bold hover:text-[#1557b0]"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Background Animated Effect */}
      <AnimatedBackground />

      {/* Tubelight Navbar */}
      <NavBar items={navItems} />

      {/* Header Logo - Top Left */}
      <header className="absolute top-6 left-6 z-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="https://www.goodtherapy.org" target="_blank" rel="noopener noreferrer" className="pointer-events-auto">
            <img
              src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/11/GoodTherapy-Logo.png"
              alt="GoodTherapy"
              className="h-6 w-auto hover:opacity-80 transition-opacity"
            />
          </a>
        </motion.div>
      </header>

      {/* Main Scroll Container */}
      <div className="pt-10">
        <ContainerScroll
          titleComponent={
            <TypewriterH1 />
          }
        >
          <GoogleMockup />
        </ContainerScroll>
      </div>

      {/* Feature Highlights Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              What this guide does for you.
            </h2>
          </motion.div>

          <div className="w-full flex justify-center mb-20">
            <CardStack
              items={[
                {
                  id: 1,
                  title: "Show up in local search",
                  description: "Help people find you when they search your name or 'therapist near me' in your area.",
                  imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  id: 2,
                  title: "Turn searches into inquiries",
                  description: "Your GoodTherapy profile helps potential clients understand your fit, then contact you through a clear next step.",
                  imageSrc: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  id: 3,
                  title: "Look consistent and credible",
                  description: "Match your name, phone, and location across Google and GoodTherapy to build trust fast.",
                  imageSrc: "/Gemini_Generated_Image_idkavaidkavaidka.png",
                  imageClassName: "object-top", // Position from top so GoodTherapy seal is visible
                },
              ]}
              initialIndex={0}
              autoAdvance={false}
              intervalMs={3000}
              pauseOnHover
              showDots
              cardWidth={400}
              cardHeight={450}
              overlap={0.2}
            />
          </div>

          {/* Bottom CTA Button */}
          <div className="flex justify-center pb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShimmerButton
                className="h-14 px-10 shadow-xl shadow-[#A2AD1A]/20"
                background="#A2AD1A"
                onClick={() => navigate("/guide")}
              >
                <span className="mr-2 text-lg font-bold tracking-wide text-white">Go to Step One</span>
                <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </ShimmerButton>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
