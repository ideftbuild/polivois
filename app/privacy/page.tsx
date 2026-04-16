"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Database,
      content: (
        <>
          <p className="mb-4">
            When you use polivois, we collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Account Information:</strong> When you register, we collect
              your name, email address, and password (securely hashed).
            </li>
            <li>
              <strong>Usage Data:</strong> We collect data on how you interact
              with our platform, including the polls you create, the votes you
              cast, and your general browsing activity.
            </li>
            <li>
              <strong>Device Information:</strong> We may collect information
              about your device, including IP address, browser type, and
              operating system.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "2. How We Use Your Information",
      icon: Eye,
      content: (
        <>
          <p className="mb-4">
            We use the collected information for various purposes, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>To provide, maintain, and improve our service.</li>
            <li>To manage your account and provide customer support.</li>
            <li>
              To communicate with you about updates, security alerts, and new
              features.
            </li>
            <li>To analyze usage patterns and optimize the user experience.</li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Data Security",
      icon: Lock,
      content: (
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of
          your personal information. We use state-of-the-art encryption to
          protect sensitive information transmitted online. We also protect your
          information offline. Only employees who need the information to
          perform a specific job are granted access to personally identifiable
          information.
        </p>
      ),
    },
    {
      title: "4. Sharing Your Information",
      icon: Shield,
      content: (
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personally
          identifiable information to outside parties. This does not include
          trusted third parties who assist us in operating our website,
          conducting our business, or servicing you, so long as those parties
          agree to keep this information confidential.
        </p>
      ),
    },
    {
      title: "5. Your Rights",
      icon: FileText,
      content: (
        <>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Access the personal information we hold about you.</li>
            <li>Request the correction of inaccurate personal information.</li>
            <li>Request the deletion of your personal information.</li>
            <li>Object to the processing of your personal information.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0107] text-[#a79494] py-24 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0e213a] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#5a4252] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-[#100418] border border-[#5a4252] rounded-2xl mb-6 shadow-lg shadow-[#5a4252]/20">
            <Shield className="h-8 w-8 text-[#a79494]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-80">
            Your privacy is important to us. This policy explains how we collect,
            use, and protect your personal information.
          </p>
          <p className="text-sm mt-4 opacity-60">
            Last Updated: October 24, 2024
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#100418] border-[#5a4252] overflow-hidden group hover:border-[#a79494] transition-colors duration-300 rounded-2xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#5a4252] to-[#a79494] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-8 md:p-10">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="hidden md:flex p-3 bg-[#0d0107] rounded-xl text-[#5a4252] group-hover:text-white transition-colors shrink-0 border border-[#5a4252]/30">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                          <span className="md:hidden text-[#5a4252]">
                            <Icon className="w-5 h-5" />
                          </span>
                          {section.title}
                        </h2>
                        <div className="text-[#a79494] text-lg leading-relaxed space-y-4">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: sections.length * 0.1 }}
            className="mt-12 text-center p-8 bg-[#100418]/50 border border-[#5a4252]/50 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Questions about this policy?
            </h3>
            <p className="text-[#a79494] mb-4">
              If you have any questions or concerns about our Privacy Policy,
              please don't hesitate to reach out.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#5a4252] hover:bg-[#a79494] text-white hover:text-[#0d0107] transition-all duration-300 font-bold"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
