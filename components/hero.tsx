"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, Github, Download } from "lucide-react";
import { PROFILE, DISCIPLINES } from "@/constants";
import Corners from "@/components/corners";

const ROLES = PROFILE.roles;

export default function Hero() {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRole((p) => (p + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className="grain relative flex min-h-screen flex-col justify-center overflow-hidden bg-blueprint pt-28 pb-12"
    >
      {/* Big ghost wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 bottom-2 select-none font-display text-[22vw] font-extrabold leading-none text-bone/[0.03] md:bottom-6"
      >
        ENGINEER
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        {/* Left, statement */}
        <div>
          <div className="animate-rise mb-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              {PROFILE.availability}
            </span>
          </div>

          <h1
            className="animate-rise display text-[clamp(2.6rem,7vw,5.5rem)] text-bone"
            style={{ animationDelay: "0.08s" }}
          >
            {PROFILE.name}
          </h1>

          {/* Cycling discipline line */}
          <div
            className="animate-rise mt-3 flex items-baseline gap-3 text-[clamp(1.5rem,4vw,2.75rem)]"
            style={{ animationDelay: "0.16s" }}
          >
            <span className="font-display font-semibold text-bone-muted">I build</span>
            <span className="relative inline-grid">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={role}
                  initial={{ y: "60%", opacity: 0, rotateX: -40 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: "-60%", opacity: 0, rotateX: 40 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-extrabold text-signal"
                >
                  {ROLES[role]}
                  <span className="text-bone">.</span>
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <p
            className="animate-rise mt-7 max-w-xl text-balance text-base leading-relaxed text-bone-muted md:text-lg"
            style={{ animationDelay: "0.24s" }}
          >
            {PROFILE.tagline}
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.32s" }}
          >
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 bg-signal px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-transform hover:-translate-y-0.5"
            >
              See the work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Link>
            <a
              href={PROFILE.resume}
              download={PROFILE.resumeFile}
              className="group inline-flex items-center gap-2 border border-border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:border-signal hover:text-signal"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Résumé
            </a>
            <Link
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:border-bone"
            >
              <Github className="h-4 w-4" /> GitHub
            </Link>
          </div>
        </div>

        {/* Right, build manifest */}
        <div className="animate-rise panel ticks p-1" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-muted">
              ~/disciplines
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-bone-dim">
              {String(DISCIPLINES.length).padStart(2, "0")}
            </span>
          </div>
          <ul>
            {DISCIPLINES.map((d) => (
              <li
                key={d.id}
                className="group flex items-center justify-between gap-4 border-b border-border/60 px-4 py-4 last:border-b-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-signal">{d.index}</span>
                  <span className="font-display text-lg font-bold text-bone">
                    {d.title}
                  </span>
                </div>
                <span className="hidden font-mono text-[11px] text-bone-dim md:block">
                  {d.stack.slice(0, 3).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
