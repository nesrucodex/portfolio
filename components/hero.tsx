"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, ArrowRight, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Japanese kanji for skills, strength, wisdom
const kanji = ["技", "力", "智"];

export default function Hero() {
  const [currentKanji, setCurrentKanji] = useState(0);

  // Cycle through kanji characters
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKanji((prev) => (prev + 1) % kanji.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Clouds Background */}
      <div className="absolute inset-0 -z-10">
        {/* Cloud shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            initial={{
              x: -200,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: window.innerWidth + 200,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              fill="currentColor"
              className="text-orange-400"
            >
              <path d="M20 40c-8 0-15-7-15-15s7-15 15-15c2 0 4 0.5 6 1.5C28 5 35 0 43 0c12 0 22 10 22 22 0 2-0.5 4-1 6 8 2 14 9 14 17 0 10-8 18-18 18H20z" />
            </svg>
          </motion.div>
        ))}

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.3),transparent_50%)]" />
      </div>

      {/* Main Content Container */}
      <motion.div
        className="container mx-auto max-w-4xl text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Kanji Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentKanji}
            className="absolute inset-0 flex items-center justify-center text-[15rem] opacity-5 text-orange-400 font-bold pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
            transition={{ duration: 1.5 }}
          >
            {kanji[currentKanji]}
          </motion.div>
        </AnimatePresence>

        {/* Status Badge */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            delay: 0.2,
          }}
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/50 text-orange-200 backdrop-blur-sm">
            <motion.div
              className="w-2 h-2 rounded-full bg-orange-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className="text-sm font-medium">
              Available for new projects
            </span>
          </div> */}
        </motion.div>

        {/* Main Heading */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4">
            Hi, I'm{" "}
            <motion.span
              className="relative inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Nesru Codex
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="absolute -z-10 inset-0 bg-blue-500/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-200">
            Full Stack Developer
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          I craft exceptional digital experiences with modern web technologies,
          focusing on performance, accessibility, and elegant design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link href="#projects">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>

          <Link
            href="https://github.com/nesrucodex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 backdrop-blur-sm"
            >
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              GitHub Profile
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
          {[
            { value: "3+", label: "Years Experience", kanji: "年" },
            { value: "7+", label: "Projects Completed", kanji: "作" },
            { value: "100%", label: "Client Satisfaction", kanji: "満" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm group-hover:bg-slate-800/70 transition-all duration-300">
                <div className="text-xs text-orange-400 mb-2 font-medium">
                  {stat.kanji}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs uppercase tracking-wide mb-2 font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Scroll className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
