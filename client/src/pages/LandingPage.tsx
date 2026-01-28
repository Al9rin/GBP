import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const benefits = [
    { title: "Increase Visibility", desc: "Show up in search results" },
    { title: "Build Trust", desc: "Establish credibility instantly" },
    { title: "Attract Clients", desc: "Connect with therapy seekers" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
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

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Set Up Your Google Business Profile
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground">
              Get found by therapy seekers in your area. This step-by-step guide will help you
              claim and optimize your Google Business Profile in under 25 minutes.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>17 guided steps • 25 minutes • Free</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/guide")}
                className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-secondary border-secondary/30 hover:bg-secondary/5"
              >
                Learn More
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Why therapists trust this guide:</p>
              <div className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{benefit.title}</p>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Animated Illustration */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 lg:h-full min-h-96 flex items-center justify-center"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative w-full h-full"
            >
              {/* Animated card stack */}
              <motion.div
                className="absolute top-0 right-0 w-80 h-96 bg-white rounded-2xl shadow-2xl p-8 border border-border"
                style={{ rotateZ: -5 }}
                whileHover={{ rotateZ: -8 }}
              >
                <div className="space-y-6">
                  <div className="bg-green-100/50 h-3 rounded-full w-24" />
                  <div className="space-y-2">
                    <div className="bg-muted h-3 rounded-full w-full" />
                    <div className="bg-muted h-3 rounded-full w-5/6" />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-muted h-2 rounded-full w-full" />
                    <div className="bg-muted h-2 rounded-full w-4/5" />
                    <div className="bg-muted h-2 rounded-full w-3/4" />
                  </div>
                  <motion.div
                    className="mt-8 bg-primary/10 rounded-lg p-4 border border-primary/20"
                    animate={{ borderColor: ["hsl(28, 90%, 54%, 0.2)", "hsl(28, 90%, 54%, 0.4)", "hsl(28, 90%, 54%, 0.2)"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className="text-sm font-semibold text-primary">Profile Optimized</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating accent card */}
              <motion.div
                className="absolute bottom-20 left-0 w-64 h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl shadow-lg p-6 border border-primary/20"
                style={{ rotateZ: 8 }}
                whileHover={{ rotateZ: 12 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-secondary">Quick Setup</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">17</span>
                    <span className="text-sm text-muted-foreground">steps to success</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-border"
        >
          {[
            { number: "17", label: "Steps" },
            { number: "25", label: "Minutes" },
            { number: "100%", label: "Free" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.number}</p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
