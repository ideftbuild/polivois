"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Vote,
  Users,
  BarChart3,
  Share2,
  Zap,
  Shield,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { user, loading } = useAuth();
  const [activeStep, setActiveStep] = useState(0);

  console.log("Control in Home page component");

  const howItWorksSteps = [
    {
      title: "Create Your Poll",
      description:
        "Design engaging polls in seconds. Add your questions, customize options, and set specific configurations like expiry dates or multiple choice formats. Our intuitive builder does the heavy lifting.",
      icon: Vote,
      highlight: "Lightning fast builder",
    },
    {
      title: "Share & Collect",
      description:
        "Distribute your poll effortlessly. Generate a unique link, share it across your community or social platforms, and watch responses stream in live. Engage your audience where they already are.",
      icon: Share2,
      highlight: "Real-time sync",
    },
    {
      title: "Analyze Results",
      description:
        "Make data-driven decisions. Dive into deep insights with beautiful, easy-to-read charts. Track voting patterns, understand demographics, and export your data for further reporting.",
      icon: BarChart3,
      highlight: "Advanced charting",
    },
  ];

  return (
    <div className="flex flex-col text-[#a79494] bg-[#0d0107] min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0d0107] via-[#100418] to-[#0d0107]">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <Badge
              variant="outline"
              className="text-sm px-4 py-2 border-[#5a4252] text-[#a79494] bg-[#100418]/50"
            >
              Welcome to polivois
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              {loading
                ? "..."
                : user
                  ? `Welcome, ${user.email}`
                  : "Create Polls,"}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5a4252] to-[#a79494] brightness-150">
                Gather Opinions
              </span>
            </h1>

            <p className="text-xl text-[#a79494] max-w-2xl mx-auto opacity-80">
              Build engaging polls to collect feedback, make decisions, and
              understand your community better. Simple, fast, and powerful.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create-poll">
                <Button
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer bg-[#5a4252] hover:bg-[#a79494] hover:text-[#0d0107] text-white border-none transition-all duration-300"
                >
                  <Vote className="h-5 w-5 mr-2" />
                  Create Your First Poll
                </Button>
              </Link>
              <Link href="/polls">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer border-[#5a4252] text-[#a79494] hover:bg-[#5a4252] hover:text-white bg-transparent transition-all duration-300"
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Browse Polls
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section className="py-24 px-4 bg-[#100418]">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Why Choose polivois?
            </h2>
            <p className="text-xl text-[#a79494] max-w-2xl mx-auto opacity-80">
              Everything you need to create, share, and analyze polls
              effectively
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="relative z-10 overflow-hidden border-[#5a4252] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0d0107] hover:bg-[#5a4252]/10 backdrop-blur-sm group hover:-translate-y-2 text-left">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] to-[#a79494] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#5a4252]" /> Lightning Fast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#a79494] text-md leading-relaxed mb-4">
                  Create polls in seconds with our intuitive interface.
                </p>
                <ul className="text-sm text-[#a79494] opacity-80 space-y-2">
                  <li>• Quick poll creation</li>
                  <li>• Real-time results</li>
                  <li>• Instant sharing</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="relative z-10 overflow-hidden border-[#5a4252] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0d0107] hover:bg-[#5a4252]/10 backdrop-blur-sm group hover:-translate-y-2 text-left">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] to-[#a79494] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-75"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#5a4252]" /> Community Driven
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#a79494] text-md leading-relaxed mb-4">
                  Engage your audience and build stronger communities.
                </p>
                <ul className="text-sm text-[#a79494] opacity-80 space-y-2">
                  <li>• Public & private polls</li>
                  <li>• Multiple vote options</li>
                  <li>• Anonymous voting</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="relative z-10 overflow-hidden border-[#5a4252] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0d0107] hover:bg-[#5a4252]/10 backdrop-blur-sm group hover:-translate-y-2 text-left">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] to-[#a79494] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-150"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#5a4252]" /> Powerful
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#a79494] text-md leading-relaxed mb-4">
                  Get insights with detailed results and analytics.
                </p>
                <ul className="text-sm text-[#a79494] opacity-80 space-y-2">
                  <li>• Visual results</li>
                  <li>• Vote tracking</li>
                  <li>• Export data</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="relative z-10 overflow-hidden border-[#5a4252] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0d0107] hover:bg-[#5a4252]/10 backdrop-blur-sm group hover:-translate-y-2 text-left">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] to-[#a79494] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#5a4252]" /> Flexible
                  Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#a79494] text-md leading-relaxed mb-4">
                  Set expiry dates and control when polls are active.
                </p>
                <ul className="text-sm text-[#a79494] opacity-80 space-y-2">
                  <li>• Custom expiry dates</li>
                  <li>• Auto-close polls</li>
                  <li>• Schedule publishing</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="relative z-10 overflow-hidden border-[#5a4252] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0d0107] hover:bg-[#5a4252]/10 backdrop-blur-sm group hover:-translate-y-2 text-left">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] to-[#a79494] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-75"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#5a4252]" /> Secure & Private
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#a79494] text-md leading-relaxed mb-4">
                  Your data is safe with enterprise-grade security.
                </p>
                <ul className="text-sm text-[#a79494] opacity-80 space-y-2">
                  <li>• Data encryption</li>
                  <li>• Privacy controls</li>
                  <li>• GDPR compliant</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="relative z-10 overflow-hidden border-[#5a4252] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#0d0107] hover:bg-[#5a4252]/10 backdrop-blur-sm group hover:-translate-y-2 text-left">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] to-[#a79494] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-150"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Vote className="h-5 w-5 text-[#5a4252]" /> Easy to Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#a79494] text-md leading-relaxed mb-4">
                  Intuitive design that anyone can master in minutes.
                </p>
                <ul className="text-sm text-[#a79494] opacity-80 space-y-2">
                  <li>• No learning curve</li>
                  <li>• Mobile friendly</li>
                  <li>• Clean interface</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section - Modern Tabs */}
      <section className="py-24 px-4 bg-[#0d0107]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              How It Works
            </h2>
            <p className="text-xl text-[#a79494] max-w-2xl mx-auto opacity-80">
              A streamlined process designed for efficiency and clarity.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Tabs List */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      isActive
                        ? "bg-[#5a4252] border-[#a79494] text-white shadow-lg shadow-[#100418]/50"
                        : "bg-[#100418] border-[#100418] text-[#a79494] hover:bg-[#100418]/80 hover:border-[#5a4252]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-full transition-colors ${isActive ? "bg-[#0d0107] text-[#a79494]" : "bg-[#0d0107] text-[#5a4252]"}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold tracking-wide">
                        {step.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-300 ${isActive ? "translate-x-1 opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-50"}`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Tab Content Area */}
            <div className="lg:col-span-8 relative">
              <div className="bg-[#100418] border border-[#5a4252] rounded-[2rem] p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden shadow-2xl">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0e213a] rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5a4252] rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Badge className="mb-6 bg-[#0d0107] text-[#a79494] hover:bg-[#0d0107] border border-[#5a4252] px-4 py-1 text-sm uppercase tracking-widest">
                      Step 0{activeStep + 1}
                    </Badge>

                    <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                      {howItWorksSteps[activeStep].title}
                    </h3>

                    <p className="text-xl text-[#a79494] leading-relaxed max-w-2xl mb-8">
                      {howItWorksSteps[activeStep].description}
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5a4252]/20 border border-[#5a4252]/50 rounded-lg text-[#a79494]">
                      <Zap className="w-4 h-4 text-white" />
                      <span className="font-medium text-white">
                        {howItWorksSteps[activeStep].highlight}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#100418] text-white relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-[#a79494]">
              Join thousands of users who trust polivois for their polling
              needs. Create your first poll today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#5a4252] hover:bg-[#a79494] hover:text-[#0d0107] text-white border-none transition-all duration-300 shadow-lg shadow-[#5a4252]/20"
                >
                  Sign Up Free
                </Button>
              </Link>
              <Link href="/polls">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#5a4252] text-[#a79494] hover:bg-[#5a4252] hover:text-white bg-[#0d0107] transition-all duration-300"
                >
                  Explore Polls
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
