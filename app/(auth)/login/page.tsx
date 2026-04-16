"use client";

import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { motion } from "framer-motion";
import { Vote } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0d0107] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0e213a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#5a4252] rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <div className="text-center flex flex-col items-center">
          <Link href="/" className="inline-block mb-6 group">
            <div className="p-4 bg-[#100418] border border-[#5a4252] rounded-2xl group-hover:bg-[#5a4252]/20 transition-all duration-300 shadow-lg group-hover:shadow-[#5a4252]/20 group-hover:-translate-y-1">
              <Vote className="h-8 w-8 text-[#a79494] group-hover:text-white transition-colors" />
            </div>
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Welcome back
          </h1>
          <p className="text-lg text-[#a79494] opacity-80">
            Sign in to your polivois account
          </p>
        </div>

        <div className="relative group">
          {/* Subtle glowing border effect behind the form */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5a4252] via-[#0e213a] to-[#5a4252] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <LoginForm />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-[#a79494]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-white hover:text-[#a79494] transition-colors underline underline-offset-4 decoration-[#5a4252] hover:decoration-white"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
