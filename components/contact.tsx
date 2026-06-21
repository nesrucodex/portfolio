"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Github, Linkedin, Copy, Check, Download } from "lucide-react";
import { PROFILE } from "@/constants";
import Corners from "@/components/corners";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const channels = [
    { label: "GitHub", value: "@nesrucodex", href: PROFILE.github, icon: Github },
    { label: "LinkedIn", value: "Nesru Codex", href: PROFILE.linkedin, icon: Linkedin },
  ];

  return (
    <section
      id="contact"
      className="grain relative border-t border-border bg-blueprint px-5 py-24 md:px-10 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Corners />
        <span className="eyebrow">05 / Contact</span>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="reveal">
            <h2 className="display text-[clamp(2.4rem,8vw,6rem)] leading-[0.92] text-bone">
              Let&apos;s build
              <br />
              something{" "}
              <span className="text-signal">real.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-bone-muted md:text-base">
              {PROFILE.availability}. Have a product, a feature, or a system
              that needs a builder who covers the whole stack? Reach out.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="group inline-flex items-center gap-3 bg-signal px-7 py-4 font-mono text-sm uppercase tracking-[0.16em] text-ink transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                {PROFILE.email}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={PROFILE.resume}
                download={PROFILE.resumeFile}
                className="group inline-flex items-center gap-2 border border-border px-6 py-4 font-mono text-sm uppercase tracking-[0.16em] text-bone transition-colors hover:border-signal hover:text-signal"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Résumé
              </a>
            </div>

            <button
              onClick={copyEmail}
              className="ml-0 mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim transition-colors hover:text-bone md:ml-4 md:mt-0 md:inline-flex"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-mint" /> copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> copy email
                </>
              )}
            </button>
          </div>

          {/* Channels */}
          <div className="reveal border border-border bg-ink/60 backdrop-blur-sm">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-border px-6 py-6 transition-colors last:border-b-0 hover:bg-ink-100"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center border border-border text-bone transition-colors group-hover:border-signal group-hover:text-signal">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim">
                      {c.label}
                    </p>
                    <p className="font-display text-lg font-bold text-bone">
                      {c.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-bone-dim transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
              </a>
            ))}
            <div className="px-6 py-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim">
                Phone
              </p>
              <p className="font-display text-lg font-bold text-bone">
                {PROFILE.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
