"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Github,
  Mail,
  Send,
  MapPin,
  Clock,
  MessageCircle,
  Zap,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [currentKanji, setCurrentKanji] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Japanese kanji for contact/communication
  const contactKanji = ["連", "絡", "通", "信"];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/nesrucodex",
      label: "GitHub",
      kanji: "源",
      color: "from-slate-400 to-slate-600",
      hoverColor: "hover:from-slate-300 hover:to-slate-500",
    },
    {
      icon: Mail,
      href: "mailto:nesrucodex01@gmail.com",
      label: "Email",
      kanji: "信",
      color: "from-orange-400 to-orange-600",
      hoverColor: "hover:from-orange-300 hover:to-orange-500",
    },
  ];

  // Cycle through kanji characters
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKanji((prev) => (prev + 1) % contactKanji.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window?.addEventListener("mousemove", handleMouseMove);
    return () => window?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-6 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden"
    >
      {/* Animated Clouds Background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            initial={{
              x: -200,
              y: Math.random() * 800,
            }}
            animate={{
              x: 1400,
              y: Math.random() * 800,
            }}
            transition={{
              duration: 35 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <svg
              width="90"
              height="45"
              viewBox="0 0 90 45"
              fill="currentColor"
              className="text-blue-400"
            >
              <path d="M15 30c-6 0-12-5-12-12s6-12 12-12c2 0 3 0.5 5 1.5C22 4 27 0 33 0c9 0 17 8 17 17 0 2-0.5 3-1 5 6 2 11 7 11 13 0 8-6 14-14 14H15z" />
            </svg>
          </motion.div>
        ))}

        {/* Interactive cursor trail */}
        <motion.div
          className="fixed w-6 h-6 bg-orange-400/20 rounded-full pointer-events-none z-50 mix-blend-screen"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />

        {/* Floating message icons */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-10, 10, -10],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 8 + i * 2,
              delay: i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + i * 20}%`,
            }}
          >
            💬
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Kanji Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentKanji}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] opacity-5 text-orange-400 font-bold pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
            transition={{ duration: 1.5 }}
          >
            {contactKanji[currentKanji]}
          </motion.div>
        </AnimatePresence>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white flex items-center justify-center gap-3">
            <MessageCircle className="h-12 w-12 text-orange-400" />
            Get In{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border border-slate-700/50 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Send className="h-5 w-5 text-orange-400" />
                  Send Me a Message
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-300"
                    >
                      Name
                    </label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-300"
                    >
                      Email
                    </label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-slate-300"
                    >
                      Message
                    </label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Textarea
                        id="message"
                        placeholder="Your message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 resize-none transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                    >
                      <span className="flex items-center gap-2 relative z-10">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </>
                        )}
                      </span>
                      {!isSubmitting && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-between"
          >
            <Card className="h-full flex flex-col justify-between bg-slate-800/50 border border-slate-700/50 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  Connect With Me
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Find me on these platforms and social networks.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-6">
                  <p className="text-slate-300 leading-relaxed">
                    Whether you have a question about a project, job
                    opportunity, or just want to say hello, I'm always open to
                    connecting with fellow developers and potential clients.
                  </p>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      Follow Me
                    </h3>
                    <div className="flex flex-col gap-3">
                      {socialLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                          <motion.a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700 hover:border-slate-500 transition-all duration-300 text-slate-300 hover:text-white group"
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <div
                              className={`p-2 rounded-lg bg-gradient-to-r ${link.color} ${link.hoverColor} transition-all duration-300`}
                            >
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="font-medium">{link.label}</span>
                              <span className="text-xs text-slate-400 ml-2">
                                {link.kanji}
                              </span>
                            </div>
                            <motion.div
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ x: -10 }}
                              whileHover={{ x: 0 }}
                            >
                              →
                            </motion.div>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <motion.div
                      className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Based in:</p>
                        <p className="font-medium text-white">
                          Addis Ababa, Ethiopia
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Available for:</p>
                        <p className="font-medium text-white">
                          Freelance, Full-time opportunities
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced availability indicator */}
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/40 relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        "0_0_10px_rgba(34,197,94,0.3)",
                        "0_0_20px_rgba(34,197,94,0.6)",
                        "0_0_10px_rgba(34,197,94,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <div className="flex items-center gap-3 relative z-10">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                      <div>
                        <p className="text-sm text-green-300">Status:</p>
                        <p className="font-medium text-green-400 flex items-center gap-2">
                          Available for new projects
                          <Zap className="h-4 w-4" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
