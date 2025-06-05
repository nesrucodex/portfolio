"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  Home,
  Layers,
  User,
  Mail,
  Github,
  Moon,
  Sun,
  Menu,
  X,
  Code,
  Zap,
} from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  color: string;
  kanji: string;
  chakraColor: string;
};

export default function CreativeNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [chakraActive, setChakraActive] = useState(false);
  const [chakraPosition, setChakraPosition] = useState({ x: 0, y: 0 });
  const [handSignActive, setHandSignActive] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "#",
      icon: Home,
      color: "#fb923c", // orange-400
      kanji: "家",
      chakraColor: "from-orange-400 to-orange-600",
    },
    {
      name: "Projects",
      href: "#projects",
      icon: Layers,
      color: "#3b82f6", // blue-500
      kanji: "術",
      chakraColor: "from-blue-400 to-blue-600",
    },
    {
      name: "About",
      href: "#about",
      icon: User,
      color: "#22c55e", // green-500
      kanji: "者",
      chakraColor: "from-green-400 to-green-600",
    },
    {
      name: "Contact",
      href: "#contact",
      icon: Mail,
      color: "#a855f7", // purple-500
      kanji: "信",
      chakraColor: "from-purple-400 to-purple-600",
    },
  ];

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.name.toLowerCase());

      const currentSection = sections.find((section) => {
        if (section === "home") {
          return window.scrollY < 300;
        }
        const element = document.getElementById(section);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    // Activate chakra effect
    activateChakra("theme");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const activateChakra = (section: string) => {
    if (navRef.current) {
      const navItem = navRef.current.querySelector(
        `[data-section="${section}"]`
      );
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        setChakraPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }

    setChakraActive(true);
    setTimeout(() => setChakraActive(false), 1000);
  };

  const activateHandSign = () => {
    setHandSignActive(true);
    setTimeout(() => setHandSignActive(false), 2000);
  };

  const handleNavClick = (section: string) => {
    activateChakra(section);
    setActiveSection(section);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Get active item details
  const activeItem =
    navItems.find((item) => item.name.toLowerCase() === activeSection) ||
    navItems[0];

  return (
    <>
      {/* Desktop Navigation - Left Side */}
      <motion.nav
        ref={navRef}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative flex flex-col items-center">
          {/* Vertical Line - Chakra Flow */}
          <div className="absolute h-full w-0.5 bg-gradient-to-b from-slate-700/20 via-slate-700/40 to-slate-700/20 left-1/2 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              className={`absolute w-full h-20 bg-gradient-to-b ${activeItem.chakraColor} opacity-70`}
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-8 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase();
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="relative"
                  data-section={item.name.toLowerCase()}
                  onMouseEnter={() => setIsHovered(item.name)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.name.toLowerCase())}
                  >
                    <motion.div
                      className={cn(
                        "relative z-10 p-3 rounded-xl flex items-center justify-center transition-all duration-300",
                        isActive
                          ? "shadow-lg"
                          : "bg-slate-800/50 hover:bg-slate-700/70 text-slate-400 hover:text-slate-200 backdrop-blur-sm"
                      )}
                      style={{
                        backgroundColor: isActive
                          ? `${item.color}20`
                          : undefined,
                        color: isActive ? item.color : undefined,
                        boxShadow: isActive
                          ? `0 0 15px ${item.color}40`
                          : undefined,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="h-5 w-5" />

                      {/* Kanji Character (visible on active) */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-20"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 0.2, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          {item.kanji}
                        </motion.div>
                      )}

                      {/* Active indicator - Chakra Glow */}
                      {isActive && (
                        <motion.div
                          className="absolute -right-1 -top-1 w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: item.color }}
                            animate={{
                              scale: [1, 1.8, 1],
                              opacity: [0.7, 0, 0.7],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>

                  {/* Enhanced Tooltip with Kanji */}
                  <AnimatePresence>
                    {isHovered === item.name && (
                      <motion.div
                        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 origin-left"
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <div
                            className="px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap flex items-center gap-2"
                            style={{
                              backgroundColor: `${item.color}20`,
                              color: item.color,
                              boxShadow: `0 0 20px ${item.color}10`,
                            }}
                          >
                            <span className="text-xs opacity-70">
                              {item.kanji}
                            </span>
                            <span>{item.name}</span>
                          </div>
                          <div
                            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
                            style={{ backgroundColor: `${item.color}20` }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Theme Toggle */}
            <div
              className="relative"
              data-section="theme"
              onMouseEnter={() => setIsHovered("theme")}
              onMouseLeave={() => setIsHovered(null)}
            >
              <motion.button
                onClick={toggleTheme}
                className="relative z-10 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 text-slate-400 hover:text-slate-200 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered === "theme" && (
                  <motion.div
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 origin-left"
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <div className="px-3 py-2 rounded-lg bg-yellow-500/20 text-yellow-500 font-medium text-sm whitespace-nowrap flex items-center gap-2">
                        <span className="text-xs opacity-70">術</span>
                        <span>Toggle Theme</span>
                      </div>
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-yellow-500/20" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GitHub Link */}
            <div
              className="relative"
              data-section="github"
              onMouseEnter={() => setIsHovered("github")}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Link
                href="https://github.com/nesrucodex"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => activateChakra("github")}
              >
                <motion.div
                  className="relative z-10 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/70 text-slate-400 hover:text-slate-200 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="h-5 w-5" />
                </motion.div>
              </Link>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered === "github" && (
                  <motion.div
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 origin-left"
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <div className="px-3 py-2 rounded-lg bg-slate-500/20 text-slate-300 font-medium text-sm whitespace-nowrap flex items-center gap-2">
                        <span className="text-xs opacity-70">源</span>
                        <span>GitHub Profile</span>
                      </div>
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-slate-500/20" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex justify-between items-center p-4 bg-slate-900/80 backdrop-blur-md">
          <Link href="/" className="font-bold text-xl group">
            <span className="inline-block transition-transform duration-300 group-hover:scale-110 text-white">
              Nesru
            </span>
            <span className="text-orange-400 inline-block transition-transform duration-300 group-hover:rotate-6">
              Codex
            </span>
            <span className="text-orange-400 text-xs align-super ml-1 animate-pulse">
              _
            </span>
          </Link>

          <motion.button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              activateHandSign();
            }}
            className="p-2 rounded-full bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu - Enhanced with Naruto Theme */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md pt-16"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Chakra Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute w-full h-full opacity-10"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c-8 0-15-7-15-15S22 0 30 0s15 7 15 15-7 15-15 15zm0-30c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15z' fill='%23FB923C' fillOpacity='0.4' fillRule='evenodd'/%3E%3C/svg%3E\")",
                    backgroundSize: "60px 60px",
                  }}
                  animate={{
                    backgroundPosition: ["0px 0px", "60px 60px"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Animated Kanji Background */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] opacity-5 text-orange-400 font-bold pointer-events-none select-none"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
                transition={{ duration: 1.5 }}
              >
                忍
              </motion.div>

              <div className="flex flex-col items-center justify-center h-full gap-8">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.name.toLowerCase();
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.name.toLowerCase())}
                        className="flex flex-col items-center gap-2"
                      >
                        <motion.div
                          className="p-4 rounded-2xl flex items-center justify-center relative"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            backgroundColor: isActive
                              ? `${item.color}20`
                              : `${item.color}10`,
                            color: isActive ? item.color : `${item.color}90`,
                            boxShadow: isActive
                              ? `0 0 20px ${item.color}40`
                              : undefined,
                          }}
                        >
                          <Icon className="h-6 w-6" />

                          {/* Kanji Character */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center text-sm font-bold opacity-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 0.3 : 0.1 }}
                          >
                            {item.kanji}
                          </motion.div>

                          {/* Chakra Glow */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl"
                              style={{ backgroundColor: item.color }}
                              animate={{
                                opacity: [0.1, 0.2, 0.1],
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            />
                          )}
                        </motion.div>
                        <span className="font-medium text-white">
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="flex gap-4 mt-8">
                  <motion.button
                    onClick={toggleTheme}
                    className="p-4 rounded-2xl bg-yellow-500/20 text-yellow-500 flex items-center justify-center relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-6 w-6" />
                    ) : (
                      <Moon className="h-6 w-6" />
                    )}
                    <motion.div className="absolute inset-0 flex items-center justify-center text-sm font-bold opacity-20">
                      術
                    </motion.div>
                  </motion.button>

                  <Link
                    href="https://github.com/nesrucodex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      className="p-4 rounded-2xl bg-slate-500/20 text-slate-300 flex items-center justify-center relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="h-6 w-6" />
                      <motion.div className="absolute inset-0 flex items-center justify-center text-sm font-bold opacity-20">
                        源
                      </motion.div>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logo (Top Left) - Enhanced with Chakra Effects */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" className="group" onClick={() => activateHandSign()}>
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Chakra Rings */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-orange-400/20"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 0.95, 1],
                }}
                transition={{
                  rotate: {
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                }}
              />
              <motion.div
                className="absolute inset-1 rounded-lg bg-orange-400/30"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 0.95, 1.05, 1],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                }}
              />
              <motion.div
                className="relative z-10 text-orange-400 font-bold text-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                忍
              </motion.div>
            </div>

            <motion.div
              className="ml-2 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="font-bold">
                <span className="text-white">Nesru</span>
                <span className="text-orange-400">Codex</span>
              </span>
            </motion.div>
          </motion.div>
        </Link>
      </div>

      {/* Decorative Elements - Enhanced with Chakra */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <motion.div
          className="w-[70px] h-[300px] rounded-full border border-slate-700/20 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </div>

      {/* Code Snippet Decoration - Enhanced */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xs text-slate-400 font-mono"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-400" />
            <span>
              with <span className="text-orange-400">忍</span> by Nesru
            </span>
          </div>
        </motion.div>
      </div>

      {/* Chakra Activation Effect */}
      <AnimatePresence>
        {chakraActive && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: chakraPosition.x,
              top: chakraPosition.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 rounded-full border-4 border-orange-400/50 flex items-center justify-center">
              <motion.div
                className="w-10 h-10 rounded-full bg-orange-400/30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hand Sign Jutsu Effect */}
      <AnimatePresence>
        {handSignActive && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[10rem] text-orange-400 opacity-80">忍</div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 1.5, times: [0, 0.5, 1] }}
              >
                <div className="text-[12rem] text-orange-400/30">術</div>
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-full border-8 border-orange-400/30"
                animate={{
                  scale: [1, 2],
                  opacity: [0.5, 0],
                }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
