"use client";

import Link from "next/link";
import { Github, Linkedin, ArrowUp } from "lucide-react";
import { PROFILE } from "@/constants";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-border px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-bone/40 font-mono text-sm font-bold text-bone">
            NG
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim">
            © {year} {PROFILE.name} · {PROFILE.handle}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone-muted transition-colors hover:text-signal"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone-muted transition-colors hover:text-signal"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="#top"
            className="ml-2 inline-flex items-center gap-1.5 border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-muted transition-colors hover:border-bone hover:text-bone"
          >
            Top <ArrowUp className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim/60">
        Designed &amp; built by Nesredin · Next.js · Tailwind · Framer Motion
      </p>
    </footer>
  );
}
