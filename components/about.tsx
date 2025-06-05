"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code, Server, Settings, Zap, Target, Heart } from "lucide-react";
import ASSETS from "@/utils/assets";

type Skill = {
  label: string;
  level: number;
  category: string;
};

const SKILLS: Skill[] = [
  { label: "JavaScript", level: 100, category: "Frontend" },
  { label: "TypeScript", level: 100, category: "Frontend" },
  { label: "React", level: 100, category: "Frontend" },
  { label: "Next.js", level: 100, category: "Frontend" },
  { label: "Tailwind CSS", level: 100, category: "Frontend" },
  { label: "Node.js", level: 100, category: "Backend" },
  { label: "Express", level: 100, category: "Backend" },
  { label: "MongoDB", level: 95, category: "Backend" },
  { label: "PostgreSQL", level: 95, category: "Backend" },
  { label: "GraphQL", level: 90, category: "Backend" },
  { label: "Docker", level: 95, category: "DevOps" },
  { label: "AWS", level: 80, category: "DevOps" },
  { label: "Git", level: 95, category: "DevOps" },
  { label: "CI/CD", level: 95, category: "DevOps" },
];

const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    icon: Code,
    kanji: "前",
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "Backend",
    icon: Server,
    kanji: "後",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "DevOps",
    icon: Settings,
    kanji: "運",
    color: "from-purple-400 to-purple-600",
  },
];

// Japanese kanji for about/self
const aboutKanji = ["自", "己", "紹", "介"];

// Creative floating elements
const FloatingElement = ({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) => (
  <motion.div
    className="absolute text-2xl opacity-20"
    initial={{ y: 0, rotate: 0 }}
    animate={{
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [currentKanji, setCurrentKanji] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const filteredSkills = SKILLS.filter(
    (skill) => skill.category === activeCategory
  );

  // Cycle through kanji characters
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKanji((prev) => (prev + 1) % aboutKanji.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      className="py-20 px-4 md:px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Clouds Background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(10)].map((_, i) => (
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
              duration: 30 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              fill="currentColor"
              className="text-orange-400"
            >
              <path d="M12 24c-5 0-10-4-10-10s5-10 10-10c1.5 0 2.5 0.4 4 1.2C18 3 22 0 27 0c7 0 14 6 14 14 0 1.5-0.4 2.5-0.8 4 5 1.5 9 6 9 11 0 6-5 11-11 11H12z" />
            </svg>
          </motion.div>
        ))}

        {/* Creative floating elements */}
        <FloatingElement delay={0}>⚡</FloatingElement>
        <FloatingElement delay={1}>🎯</FloatingElement>
        <FloatingElement delay={2}>💻</FloatingElement>
        <FloatingElement delay={3}>🚀</FloatingElement>

        {/* Interactive cursor trail */}
        <motion.div
          className="fixed w-4 h-4 bg-orange-400/30 rounded-full pointer-events-none z-50 mix-blend-screen"
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Kanji Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentKanji}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] opacity-5 text-orange-400 font-bold pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
            transition={{ duration: 1.8 }}
          >
            {aboutKanji[currentKanji]}
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
            <User className="h-12 w-12 text-orange-400" />
            About{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Passionate about creating exceptional digital experiences through
            clean code and thoughtful design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Profile Image with enhanced styling */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <motion.div
                className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={ASSETS.IMAGES.MY_IMAGE}
                  alt="Nesru Codex"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />

                {/* Enhanced corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-orange-400/80"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-orange-400/80"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-orange-400/80"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-orange-400/80"></div>

                {/* Animated energy rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-orange-400/30 rounded-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              {/* Enhanced glow effect */}
              <motion.div
                className="absolute -inset-6 bg-gradient-to-r from-orange-400/20 via-blue-400/20 to-orange-400/20 rounded-full blur-2xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            {/* Enhanced Bio */}
            <Card className="bg-slate-800/50 border border-slate-700/50 shadow-xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    I'm a passionate Full Stack Developer with a strong focus on
                    creating efficient, scalable, and user-friendly web
                    applications. With years of experience in both frontend and
                    backend development, I bring ideas to life through clean
                    code and thoughtful architecture.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    My journey in software development began with a curiosity
                    about how things work on the web, which evolved into a
                    career building solutions that solve real-world problems.
                    I'm constantly learning and adapting to new technologies to
                    stay at the forefront of web development.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    When I'm not coding, you can find me exploring new
                    technologies, contributing to open-source projects, or
                    sharing knowledge with the developer community.
                  </motion.p>
                </div>

                {/* Creative passion indicators */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-700">
                  <motion.div
                    className="flex items-center gap-2 text-orange-400"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">Innovation</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-blue-400"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Target className="h-4 w-4" />
                    <span className="text-sm">Precision</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-purple-400"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Passion</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <Code className="h-6 w-6 text-orange-400" />
                Skills & Technologies
              </h3>

              {/* Enhanced Category Tabs */}
              <div className="flex flex-wrap gap-3 mb-6">
                {SKILL_CATEGORIES.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <motion.button
                      key={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 border backdrop-blur-sm ${
                        activeCategory === category.name
                          ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                          : "bg-slate-800/50 text-slate-300 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.name}</span>
                      <span className="text-xs opacity-70">
                        {category.kanji}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Skills List */}
            <Card className="bg-slate-800/50 border border-slate-700/50 shadow-xl backdrop-blur-sm">
              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredSkills.map((skill, index) => (
                      <motion.div
                        key={skill.label}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">
                            {skill.label}
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-500/20 text-blue-200 border border-blue-400/40"
                          >
                            {skill.level}%
                          </Badge>
                        </div>
                        <div className="relative">
                          <Progress
                            value={skill.level}
                            className="h-3 bg-slate-700 border border-slate-600"
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-blue-400/30 rounded-full"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.02, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  value: "3+",
                  label: "Years Experience",
                  kanji: "年",
                  color: "from-orange-400 to-orange-600",
                },
                {
                  value: "15+",
                  label: "Technologies",
                  kanji: "技",
                  color: "from-blue-400 to-blue-600",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-slate-800/50 border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                    <CardContent className="p-4 text-center relative overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      <div className="text-xs text-orange-400 mb-1">
                        {stat.kanji}
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
