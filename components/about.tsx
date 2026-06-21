import Image from "next/image";
import { GraduationCap, MapPin, Award } from "lucide-react";
import ASSETS from "@/utils/assets";
import { PROFILE, STATS, EXPERIENCE, STACK_GROUPS } from "@/constants";
import Corners from "@/components/corners";
import Counter from "@/components/counter";

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-border px-5 py-24 md:px-10 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl">
        <Corners />
        <span className="eyebrow reveal block">03 / Profile</span>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Portrait + facts */}
          <div className="reveal">
            <div className="panel ticks relative aspect-[4/5] w-full max-w-md overflow-hidden">
              <Image
                src={ASSETS.IMAGES.MY_IMAGE}
                alt={PROFILE.name}
                fill
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                <div>
                  <p className="font-display text-xl font-bold text-bone">
                    {PROFILE.name}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint">
                    @nesrucodex
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 font-mono text-xs text-bone-muted">
                <MapPin className="h-4 w-4 text-signal" /> {PROFILE.location}
              </li>
              <li className="flex items-center gap-3 font-mono text-xs text-bone-muted">
                <GraduationCap className="h-4 w-4 text-signal" /> BSc Software
                Engineering, AASTU
              </li>
              <li className="flex items-center gap-3 font-mono text-xs text-bone-muted">
                <Award className="h-4 w-4 text-signal" /> 3.93 GPA · 89% national
                exit exam
              </li>
            </ul>
          </div>

          {/* Bio + stats */}
          <div className="reveal">
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)] text-bone">
              I turn fuzzy ideas into software that ships, and keeps working.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-bone-muted md:text-base">
              <p>
                I&apos;m a software engineer from Addis Ababa with 3+ years
                building production systems across the stack. At{" "}
                <span className="text-bone">Endubis</span> I build custodial
                Cardano &amp; TON wallets, from secure auth to on-chain
                transaction signing. At <span className="text-bone">TaptoSign</span>{" "}
                I engineered document-signing and OCR automation with Go and Redis.
              </p>
              <p>
                I led React teams as a mentor at{" "}
                <span className="text-bone">GDSC</span>, where running code reviews
                taught me to care about clarity and correctness as much as
                shipping. I like work that spans the whole picture: interface,
                API, mobile and the automation in between.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-ink p-5">
                  <Counter
                    value={s.value}
                    className="display block text-3xl text-signal md:text-4xl"
                  />
                  <p className="mt-2 text-xs font-medium text-bone">{s.label}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-bone-dim">
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-24">
          <span className="eyebrow reveal block">Experience</span>
          <div className="mt-8 border-t border-border">
            {EXPERIENCE.map((e) => (
              <div
                key={e.company}
                className="reveal group grid grid-cols-1 gap-4 border-b border-border py-7 md:grid-cols-[200px_1fr_auto]"
              >
                <div>
                  <p className="font-display text-xl font-bold text-bone">
                    {e.company}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                    {e.role}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {e.notes.map((n) => (
                    <li
                      key={n}
                      className="flex items-start gap-2.5 text-sm text-bone-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 bg-bone-dim" />
                      {n}
                    </li>
                  ))}
                </ul>
                <div className="font-mono text-[11px] text-bone-dim md:text-right">
                  <p>{e.period}</p>
                  <p>{e.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div id="stack" className="mt-24 scroll-mt-24">
          <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">04 / Stack</span>
              <h2 className="display mt-4 text-[clamp(1.8rem,4vw,3rem)] text-bone">
                Tools I reach for.
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {STACK_GROUPS.map((g, i) => (
              <div key={g.label} className="reveal bg-ink p-7">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                  <span className="text-bone-dim">{String(i + 1).padStart(2, "0")}</span>
                  {g.label}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="border border-border px-2.5 py-1 font-mono text-[11px] text-bone-muted transition-colors hover:border-bone hover:text-bone"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
