import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, Mail, List, UserPlus, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { AnimatedBackground } from "@/components/animated/AnimatedBackground";
import { STEPS } from "@/lib/steps-data";

export default function NotFound() {
  const navItems = [
    {
      name: 'Home',
      url: '/',
      icon: Home,
      action: () => window.location.href = '/'
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
        action: () => window.location.href = `/guide#step-${step.id}`
      }))
    },
    {
      name: 'Sign up for Google Business Profile',
      url: 'https://business.google.com/ca-en/business-profile/?ppsrc=GPDA2',
      icon: UserPlus,
      iconRight: ExternalLink,
      action: () => window.open('https://business.google.com/ca-en/business-profile/?ppsrc=GPDA2', '_blank'),
      className: "text-[#1a73e8] font-bold hover:text-[#1557b0]"
    }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white">
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

      {/* 404 Content */}
      <Card className="w-full max-w-md mx-4 relative z-10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            The page you're looking for doesn't exist.
          </p>

          <a
            href="/"
            className="mt-6 inline-block text-sm text-[#1a73e8] hover:text-[#1557b0] font-semibold"
          >
            ← Back to Home
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
