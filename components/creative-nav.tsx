"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Home, Layers, User, Mail, Github, Moon, Sun, Menu, X, Code } from "lucide-react"

type NavItem = {
  name: string
  href: string
  icon: React.ElementType
  color: string
}

export default function CreativeNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "#",
      icon: Home,
      color: "#9333ea", // purple-600
    },
    {
      name: "Projects",
      href: "#projects",
      icon: Layers,
      color: "#ec4899", // pink-500
    },
    {
      name: "About",
      href: "#about",
      icon: User,
      color: "#06b6d4", // cyan-500
    },
    {
      name: "Contact",
      href: "#contact",
      icon: Mail,
      color: "#f97316", // orange-500
    },
  ]

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.name.toLowerCase())

      const currentSection = sections.find((section) => {
        if (section === "home") {
          return window.scrollY < 300
        }
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 200 && rect.bottom >= 200
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Desktop Navigation - Left Side */}
      <motion.nav
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative flex flex-col items-center">
          {/* Vertical Line */}
          <div className="absolute h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 left-1/2 -translate-x-1/2 rounded-full"></div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-8 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase()
              const Icon = item.icon

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setIsHovered(item.name)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={cn(
                        "relative z-10 p-3 rounded-xl flex items-center justify-center transition-all duration-300",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-background hover:bg-muted text-muted-foreground hover:text-foreground",
                      )}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="h-5 w-5" />

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-primary"
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full bg-primary"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>

                  {/* Tooltip */}
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
                            className="px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap"
                            style={{
                              backgroundColor: `${item.color}20`,
                              color: item.color,
                              boxShadow: `0 0 20px ${item.color}10`,
                            }}
                          >
                            {item.name}
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
              )
            })}

            {/* Theme Toggle */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovered("theme")}
              onMouseLeave={() => setIsHovered(null)}
            >
              <motion.button
                onClick={toggleTheme}
                className="relative z-10 p-3 rounded-xl bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
                      <div className="px-3 py-2 rounded-lg bg-yellow-500/20 text-yellow-500 font-medium text-sm whitespace-nowrap">
                        Toggle Theme
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
              onMouseEnter={() => setIsHovered("github")}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Link href="https://github.com/nesrucodex" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="relative z-10 p-3 rounded-xl bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-300"
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
                      <div className="px-3 py-2 rounded-lg bg-gray-500/20 text-gray-500 font-medium text-sm whitespace-nowrap">
                        GitHub Profile
                      </div>
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-gray-500/20" />
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
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="font-bold text-xl group">
            <span className="inline-block transition-transform duration-300 group-hover:scale-110">Nesru</span>
            <span className="text-primary inline-block transition-transform duration-300 group-hover:rotate-6">
              Codex
            </span>
            <span className="text-primary text-xs align-super ml-1 animate-pulse">_</span>
          </Link>

          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-16"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-center h-full gap-8">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.name.toLowerCase()
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-2"
                      >
                        <motion.div
                          className={cn(
                            "p-4 rounded-2xl flex items-center justify-center",
                            isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                          )}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            backgroundColor: isActive ? item.color : `${item.color}20`,
                            color: isActive ? "white" : item.color,
                          }}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}

                <div className="flex gap-4 mt-8">
                  <motion.button
                    onClick={toggleTheme}
                    className="p-4 rounded-2xl bg-yellow-500/20 text-yellow-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                  </motion.button>

                  <Link href="https://github.com/nesrucodex" target="_blank" rel="noopener noreferrer">
                    <motion.div
                      className="p-4 rounded-2xl bg-gray-500/20 text-gray-500 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="h-6 w-6" />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logo (Top Left) */}
      <div className="fixed top-6 left-6 z-50 hidden md:block">
        <Link href="/" className="group">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-lg bg-primary/20"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 0.95, 1],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute inset-1 rounded-lg bg-primary/30"
                animate={{
                  rotate: [0, -15, 15, 0],
                  scale: [1, 0.95, 1.05, 1],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="relative z-10 text-primary font-bold text-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                NC
              </motion.div>
            </div>

            <motion.div
              className="ml-2 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="font-bold">
                <span className="text-foreground">Nesru</span>
                <span className="text-primary">Codex</span>
              </span>
            </motion.div>
          </motion.div>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <motion.div
          className="w-[70px] h-[300px] rounded-full border border-primary/20 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </div>

      {/* Code Snippet Decoration */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xs text-muted-foreground font-mono"
        >
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-primary" />
            <span>
              with <span className="text-primary">❤️</span> by Nesru
            </span>
          </div>
        </motion.div>
      </div>
    </>
  )
}
