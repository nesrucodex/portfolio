"use client";

import { useEffect, useRef, useState } from "react";

// Counts up the numeric part of a value (e.g. "3+", "3.93", "89%") when scrolled
// into view. Preserves any suffix and decimal precision.
export default function Counter({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    if (!match) return;
    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const suffix = match[2];

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    setDisplay(`0${decimals ? "." + "0".repeat(decimals) : ""}${suffix}`);

    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (done.current) return;
      done.current = true;
      const dur = 1100;
      let start: number | null = null;
      const step = (t: number) => {
        if (start === null) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = (target * eased).toFixed(decimals);
        setDisplay(`${cur}${suffix}`);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && run());
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {display}
    </span>
  );
}
