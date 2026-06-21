"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", n: "00", label: "Intro" },
  { id: "work", n: "01", label: "Work" },
  { id: "disciplines", n: "02", label: "Disciplines" },
  { id: "stack", n: "03", label: "Stack" },
  { id: "contact", n: "04", label: "Contact" },
];

export default function SectionRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={s.id === "top" ? "#top" : `#${s.id}`}
            className="group flex items-center justify-end gap-3"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                on
                  ? "text-signal opacity-100"
                  : "text-bone-dim opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span
                className={`block transition-all duration-300 ${
                  on
                    ? "h-3 w-[2px] bg-signal"
                    : "h-[2px] w-3 bg-bone-dim group-hover:bg-bone"
                }`}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
