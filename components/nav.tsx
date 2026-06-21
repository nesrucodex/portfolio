"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import { PROFILE } from "@/constants";
import LocalClock from "@/components/local-clock";

const LINKS = [
  { label: "Work", href: "#work", num: "01" },
  { label: "Disciplines", href: "#disciplines", num: "02" },
  { label: "Stack", href: "#stack", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`animate-rise fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-border bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10">
          {/* Logo */}
          <Link href="#top" className="group flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center border border-bone/40 font-mono text-sm font-bold text-bone transition-colors group-hover:border-signal group-hover:text-signal">
              NG
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-bone-muted sm:block">
              {PROFILE.handle}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <LocalClock className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim lg:inline-block" />
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group font-mono text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors hover:text-bone"
              >
                <span className="link-underline pb-0.5">{l.label}</span>
              </Link>
            ))}
            <a
              href={PROFILE.resume}
              download={PROFILE.resumeFile}
              className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors hover:text-signal"
            >
              <Download className="h-3.5 w-3.5" /> CV
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex items-center gap-1.5 border border-signal bg-signal/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-signal transition-colors hover:bg-signal hover:text-ink"
            >
              Hire me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center border border-border text-bone md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/[0.97] backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-muted">
                {PROFILE.handle}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center border border-border text-bone"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-border py-5"
                  >
                    <span className="font-mono text-sm text-signal">{l.num}</span>
                    <span className="display text-4xl text-bone">{l.label}</span>
                  </Link>
                </motion.div>
              ))}
              <a
                href={PROFILE.resume}
                download={PROFILE.resumeFile}
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex items-center justify-center gap-2 border border-border px-4 py-4 font-mono text-sm uppercase tracking-[0.18em] text-bone"
              >
                <Download className="h-4 w-4" /> Download résumé
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 border border-signal bg-signal px-4 py-4 font-mono text-sm uppercase tracking-[0.18em] text-ink"
              >
                Hire me <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
