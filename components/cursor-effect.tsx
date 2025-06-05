"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [chakraMode, setChakraMode] = useState(0); // 0: normal, 1: fire, 2: lightning, 3: wind
  const [jutsuActive, setJutsuActive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Enhanced springs for ninja-like movement
  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Chakra colors and effects
  const chakraTypes = [
    {
      name: "Normal",
      color: "rgba(251, 146, 60, 0.6)", // orange
      trail: "rgba(251, 146, 60, 0.3)",
      particles: ["🔥", "⚡", "💨"],
      kanji: "忍",
    },
    {
      name: "Fire",
      color: "rgba(239, 68, 68, 0.8)", // red
      trail: "rgba(239, 68, 68, 0.4)",
      particles: ["🔥", "💥", "🌟"],
      kanji: "火",
    },
    {
      name: "Lightning",
      color: "rgba(59, 130, 246, 0.8)", // blue
      trail: "rgba(59, 130, 246, 0.4)",
      particles: ["⚡", "✨", "💫"],
      kanji: "雷",
    },
    {
      name: "Wind",
      color: "rgba(34, 197, 94, 0.8)", // green
      trail: "rgba(34, 197, 94, 0.4)",
      particles: ["💨", "🍃", "🌪️"],
      kanji: "風",
    },
  ];

  const currentChakra = chakraTypes[chakraMode];

  // Create particles on movement
  const createParticles = (x: number, y: number, count: number = 3) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 60,
        maxLife: 60,
        size: Math.random() * 8 + 4,
        color:
          currentChakra.particles[
            Math.floor(Math.random() * currentChakra.particles.length)
          ],
      });
    }
    return newParticles;
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorX.set(x);
      cursorY.set(y);
      setIsVisible(true);

      // Add to trail
      setTrail((prev) => {
        const newTrail = [
          ...prev,
          { id: Date.now(), x, y, timestamp: Date.now() },
        ];
        return newTrail.slice(-15); // Keep last 15 points
      });

      // Create particles occasionally
      if (Math.random() < 0.3) {
        setParticles((prev) => [...prev, ...createParticles(x, y, 1)]);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setJutsuActive(true);

      // Create explosion of particles
      const x = cursorX.get();
      const y = cursorY.get();
      setParticles((prev) => [...prev, ...createParticles(x, y, 8)]);

      setTimeout(() => setJutsuActive(false), 300);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Cycle through chakra types on right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setChakraMode((prev) => (prev + 1) % chakraTypes.length);

      // Create special effect
      const x = e.clientX;
      const y = e.clientY;
      setParticles((prev) => [...prev, ...createParticles(x, y, 12)]);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, chakraMode]);

  // Update particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
          }))
          .filter((particle) => particle.life > 0)
      );

      // Clean old trail points
      setTrail((prev) =>
        prev.filter((point) => Date.now() - point.timestamp < 1000)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Trail Effect */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: 1 - (index / trail.length) * 0.8,
              opacity: (1 - index / trail.length) * 0.6,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: `radial-gradient(circle, ${currentChakra.trail}, transparent)`,
                boxShadow: `0 0 10px ${currentChakra.trail}`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Cursor - Chakra Core */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 1.5 : 1,
          rotate: jutsuActive ? 360 : 0,
        }}
        transition={{
          scale: { duration: 0.1 },
          rotate: { duration: 0.3 },
        }}
      >
        <div className="relative">
          {/* Inner core */}
          <motion.div
            className="w-4 h-4 rounded-full relative"
            style={{
              background: `radial-gradient(circle, ${currentChakra.color}, transparent)`,
              boxShadow: `0 0 20px ${currentChakra.color}`,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Kanji character */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {currentChakra.kanji}
          </motion.div>
        </div>
      </motion.div>

      {/* Outer Chakra Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-45"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-opacity-30"
          style={{
            borderColor: currentChakra.color,
            background: `conic-gradient(from 0deg, ${currentChakra.color}, transparent, ${currentChakra.color})`,
          }}
          animate={{
            rotate: 360,
            scale: isClicking ? 1.8 : [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
          }}
        />
      </motion.div>

      {/* Jutsu Activation Ring */}
      <AnimatePresence>
        {jutsuActive && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-44"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-32 h-32 rounded-full border-4"
              style={{
                borderColor: currentChakra.color,
                boxShadow: `0 0 30px ${currentChakra.color}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle System */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-43 text-lg"
            style={{
              left: particle.x,
              top: particle.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              opacity: particle.life / particle.maxLife,
              rotate: Math.random() * 360,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {particle.color}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Chakra Mode Indicator */}
      <motion.div
        className="fixed top-4 right-4 z-50 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
          <div className="flex items-center gap-2 text-white text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentChakra.color }}
            />
            <span>{currentChakra.name} Chakra</span>
            <span className="text-orange-400">{currentChakra.kanji}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Right-click to change • Click for jutsu
          </div>
        </div>
      </motion.div>

      {/* Hidden elements for better interaction */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        a:hover,
        button:hover,
        [role="button"]:hover {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
