import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { CheckCircle2 } from "lucide-react";
import { ContainerScroll } from "@/components/animated/ContainerScroll";
import { GoogleMockup } from "@/components/animated/GoogleMockup";
import { TypewriterH1 } from "@/components/animated/TypewriterH1";
import { AnimatedBackground } from "@/components/animated/AnimatedBackground";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();

  const benefits = [
    { title: "Increase Visibility", desc: "Show up in search results" },
    { title: "Build Trust", desc: "Establish credibility instantly" },
    { title: "Attract Clients", desc: "Connect with therapy seekers" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Background Animated Effect */}
      <AnimatedBackground />
      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 py-4 lg:px-12 bg-white border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <img
            src="https://www.goodtherapy.org/blog/blog/wp-content/uploads/2025/11/GoodTherapy-Logo.png"
            alt="GoodTherapy"
            className="h-10 w-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          {!isLoading && user && (
            <span className="text-sm text-muted-foreground">
              Welcome, {user.firstName || "User"}
            </span>
          )}
          {!isLoading && !user && (
            <a href="/api/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </a>
          )}
        </motion.div>
      </header>

      {/* Main Scroll Container */}
      <ContainerScroll
        titleComponent={
          <TypewriterH1 />
        }
      >
        <GoogleMockup />
      </ContainerScroll>

      {/* Why Trust This Guide Section */}
      <section className="relative z-10 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Trust This Guide?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#A2AD1A]/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#A2AD1A]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
