"use client";

import { useEffect, useState } from "react";

// Live Addis Ababa time (UTC+3). Renders nothing until mounted to avoid
// hydration mismatch.
export default function LocalClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Africa/Addis_Ababa",
          }).format(new Date())
        );
      } catch {
        setTime(null);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`tabular ${className}`}>
      {time ? `ADDIS ${time}` : "ADDIS ——:——"}
    </span>
  );
}
