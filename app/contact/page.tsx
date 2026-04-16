"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for sending message
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setName("");
    setEmail("");
    setMessage("");

    // Reset success message after a few seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0d0107] text-[#a79494] py-24 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0e213a] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#5a4252] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-80">
            Have questions about polivois? Want to suggest a feature or report a
            bug? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">
                Contact Information
              </h2>
              <p className="text-[#a79494] text-lg leading-relaxed mb-8">
                Fill out the form and our team will get back to you within 24
                hours. For immediate assistance, you can also reach us through
                the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="bg-[#100418] border-[#5a4252] overflow-hidden group hover:border-[#a79494] transition-colors duration-300">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-[#0d0107] rounded-full text-[#5a4252] group-hover:text-[#a79494] transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-[#a79494]">ideftbuild@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              {/*<Card className="bg-[#100418] border-[#5a4252] overflow-hidden group hover:border-[#a79494] transition-colors duration-300">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-[#0d0107] rounded-full text-[#5a4252] group-hover:text-[#a79494] transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Office</h3>
                    <p className="text-[#a79494]">
                      123 Polling Ave, Tech City, TC 90210
                    </p>
                  </div>
                </CardContent>
              </Card>*/}

              <Card className="bg-[#100418] border-[#5a4252] overflow-hidden group hover:border-[#a79494] transition-colors duration-300">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-[#0d0107] rounded-full text-[#5a4252] group-hover:text-[#a79494] transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Phone</h3>
                    <p className="text-[#a79494]">+234 706 915 0045</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="w-full bg-[#100418] border-[#5a4252] shadow-2xl relative z-10 overflow-hidden rounded-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5a4252] via-[#a79494] to-[#5a4252]"></div>
              <CardHeader className="space-y-2 pb-6 pt-8">
                <CardTitle className="text-2xl font-bold text-white tracking-tight">
                  Send us a message
                </CardTitle>
                <CardDescription className="text-[#a79494] text-base">
                  We'd love to hear from you!
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5">
                  <div className="space-y-2.5">
                    <Label
                      htmlFor="name"
                      className="text-[#a79494] font-medium"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                      className="bg-[#0d0107] border-[#5a4252] text-white placeholder:text-[#a79494]/50 focus-visible:ring-[#5a4252] focus-visible:border-[#5a4252] rounded-xl h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label
                      htmlFor="email"
                      className="text-[#a79494] font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="bg-[#0d0107] border-[#5a4252] text-white placeholder:text-[#a79494]/50 focus-visible:ring-[#5a4252] focus-visible:border-[#5a4252] rounded-xl h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label
                      htmlFor="message"
                      className="text-[#a79494] font-medium"
                    >
                      Message
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                      className="flex w-full rounded-xl border bg-[#0d0107] border-[#5a4252] px-3 py-2 text-sm text-white placeholder:text-[#a79494]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5a4252] disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      required
                    />
                  </div>

                  {isSuccess && (
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium flex items-center">
                      <span className="mr-2">✓</span> Message sent successfully!
                    </div>
                  )}
                </CardContent>

                <div className="p-6 pt-2">
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-[#5a4252] hover:bg-[#a79494] text-white hover:text-[#0d0107] transition-all duration-300 font-bold text-base shadow-lg shadow-[#5a4252]/25"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
