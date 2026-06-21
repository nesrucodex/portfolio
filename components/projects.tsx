"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
} from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  FileText,
  Lock,
  Eye,
} from "lucide-react";
import { PROJECTS, REPOS, type Project } from "@/constants";
import Corners from "@/components/corners";

function ProjectImage({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-ink-100 bg-blueprint">
        <span className="px-4 text-center font-display text-xl font-extrabold text-bone/15 md:text-2xl">
          {project.title}
        </span>
      </div>
    );
  }
  if (project.fit === "contain") {
    return (
      <div className="absolute inset-0 bg-ink-100 bg-blueprint">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain p-3"
          sizes="360px"
        />
      </div>
    );
  }
  return (
    <Image
      src={project.image}
      alt={project.title}
      fill
      className="object-cover object-top"
      sizes="360px"
    />
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [active, setActive] = useState<Project | null>(null);

  // Cursor-following preview
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 350, damping: 32, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 350, damping: 32, mass: 0.6 });
  const vx = useVelocity(sx);
  const rotate = useTransform(vx, [-1200, 1200], [-9, 9], { clamp: true });

  return (
    <section
      id="work"
      className="relative border-t border-border px-5 py-24 md:px-10 md:py-32 scroll-mt-20"
    >
      <div className="relative mx-auto max-w-6xl">
        <Corners />

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="reveal">
            <span className="eyebrow">01 / Selected work</span>
            <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-bone">
              Things I&apos;ve shipped.
            </h2>
          </div>
          <p className="reveal max-w-sm text-sm leading-relaxed text-bone-muted">
            Production systems I designed, built and shipped. Hover a project to
            preview it, click for the full breakdown.
          </p>
        </div>

        {/* Project cards */}
        <div
          className="reveal grid gap-px border border-border bg-border md:grid-cols-2"
          onMouseMove={(e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
          }}
          onMouseLeave={() => setActive(null)}
        >
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              onMouseEnter={() => setActive(p)}
              className="group relative flex flex-col bg-ink p-7 text-left transition-colors duration-300 hover:bg-ink-100 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="display text-2xl text-bone transition-colors duration-300 group-hover:text-signal md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-signal/90">
                    {p.role} · {p.year}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-bone-dim transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-bone-muted">
                {p.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.techStack.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="border border-border px-2 py-0.5 font-mono text-[10px] text-bone-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-bone-dim"
                  >
                    #{t.toLowerCase()}
                  </span>
                ))}
                {p.note && (
                  <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-mint">
                    <Lock className="h-3 w-3" /> private
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* More on GitHub */}
        <div className="reveal mt-16">
          <div className="flex items-center justify-between">
            <span className="eyebrow">More on GitHub</span>
            <Link
              href="https://github.com/nesrucodex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-muted transition-colors hover:text-signal"
            >
              <Github className="h-3.5 w-3.5" /> @nesrucodex
            </Link>
          </div>
          <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {REPOS.map((r) => (
              <Link
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-ink p-5 transition-colors hover:bg-ink-100"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-bone transition-colors group-hover:text-signal">
                    {r.name}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-bone-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                </div>
                <span className="mt-2 text-xs leading-relaxed text-bone-muted">
                  {r.desc}
                </span>
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim">
                  {r.lang}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Cursor-following preview (desktop / hover devices only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-52 w-80 origin-center md:block"
        style={{ left: sx, top: sy, x: 28, y: -110, rotate }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative h-full w-full overflow-hidden border border-signal/40 bg-ink shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          {active && <ProjectImage project={active} />}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
            <span className="font-display text-sm font-bold text-bone">
              {active?.title}
            </span>
            <span className="inline-flex items-center gap-1 bg-signal px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink">
              <Eye className="h-3 w-3" /> view
            </span>
          </div>
        </div>
      </motion.div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        {selected && (
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-ink-100 p-0 text-bone">
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
              <ProjectImage project={selected} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-100 to-transparent" />
              {selected.note && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-mint backdrop-blur-sm">
                  <Lock className="h-3 w-3" /> {selected.note}
                </span>
              )}
            </div>
            <div className="p-7 md:p-9">
              <DialogHeader>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
                  {selected.role} · {selected.year}
                </span>
                <DialogTitle className="display mt-2 text-3xl text-bone">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-relaxed text-bone-muted">
                  {selected.longDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-7">
                <h4 className="eyebrow">Key features</h4>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {selected.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-bone-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-signal" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <h4 className="eyebrow">Stack</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.techStack.map((t) => (
                    <span
                      key={t}
                      className="border border-border px-2.5 py-1 font-mono text-[11px] text-bone-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selected.gallery && selected.gallery.length > 0 && (
                <div className="mt-7">
                  <h4 className="eyebrow">More views</h4>
                  <div className="mt-4 grid gap-3">
                    {selected.gallery.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[16/9] w-full overflow-hidden border border-border"
                      >
                        <Image
                          src={src}
                          alt={`${selected.title} view ${idx + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="768px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(selected.link || selected.docs || selected.github) && (
                <div className="mt-8 flex flex-wrap gap-4 border-t border-border pt-6">
                  {selected.link && (
                    <Link
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink"
                    >
                      <ExternalLink className="h-4 w-4" /> Live demo
                    </Link>
                  )}
                  {selected.docs && (
                    <Link
                      href={selected.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink"
                    >
                      <FileText className="h-4 w-4" /> API docs
                    </Link>
                  )}
                  {selected.github && (
                    <Link
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-bone hover:border-bone"
                    >
                      <Github className="h-4 w-4" /> Source
                    </Link>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
