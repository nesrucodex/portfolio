"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, ArrowUpRight } from "lucide-react";
import { GITHUB } from "@/constants";
import Corners from "@/components/corners";

const LEVEL_BG = [
  "bg-ink-300",
  "bg-signal/25",
  "bg-signal/50",
  "bg-signal/75",
  "bg-signal",
];

const LANG_BG: Record<string, string> = {
  TypeScript: "bg-signal",
  JavaScript: "bg-signal/60",
  Go: "bg-mint",
  Python: "bg-bone/50",
};

type GhData = {
  contributionsLastYear: number;
  publicRepos: number;
  memberSince: number;
  languages: { name: string; pct: number }[];
  levels: number[];
  live: boolean;
};

const FALLBACK: GhData = {
  contributionsLastYear: GITHUB.contributionsLastYear,
  publicRepos: GITHUB.publicRepos,
  memberSince: GITHUB.memberSince,
  languages: GITHUB.languages,
  levels: GITHUB.levels.split("").map((c) => parseInt(c, 10) || 0),
  live: false,
};

const CACHE_KEY = "gh-stats-v1";
const TTL = 60 * 60 * 1000; // 1 hour

export default function GithubStats() {
  const [d, setD] = useState<GhData>(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    // serve fresh cache instantly to avoid re-hitting the API on every visit
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const c = JSON.parse(raw);
        if (c && Date.now() - c.t < TTL && c.d) {
          setD({ ...c.d, live: true });
          return;
        }
      }
    } catch {
      /* ignore */
    }

    (async () => {
      try {
        const u = await fetch(
          `https://api.github.com/users/${GITHUB.username}`
        ).then((r) => r.json());

        let repos: { language: string | null; fork: boolean }[] = [];
        for (const pg of [1, 2]) {
          const r = await fetch(
            `https://api.github.com/users/${GITHUB.username}/repos?per_page=100&page=${pg}`
          ).then((r) => r.json());
          if (!Array.isArray(r) || r.length === 0) break;
          repos = repos.concat(r);
        }
        const own = repos.filter((r) => !r.fork && r.language);
        const counts: Record<string, number> = {};
        own.forEach((r) => {
          counts[r.language as string] = (counts[r.language as string] || 0) + 1;
        });
        const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
        const languages = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([name, c]) => ({ name, pct: Math.round((c / total) * 100) }));

        let contributionsLastYear = FALLBACK.contributionsLastYear;
        let levels = FALLBACK.levels;
        try {
          const c = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB.username}?y=last`
          ).then((r) => r.json());
          if (c?.total?.lastYear != null) contributionsLastYear = c.total.lastYear;
          if (Array.isArray(c?.contributions))
            levels = c.contributions.map((x: { level: number }) => x.level || 0);
        } catch {
          /* keep fallback contributions */
        }

        const next: GhData = {
          contributionsLastYear,
          publicRepos: u?.public_repos ?? FALLBACK.publicRepos,
          memberSince: u?.created_at
            ? new Date(u.created_at).getFullYear()
            : FALLBACK.memberSince,
          languages: languages.length ? languages : FALLBACK.languages,
          levels,
          live: true,
        };
        if (cancelled) return;
        setD(next);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ t: Date.now(), d: { ...next, live: false } })
          );
        } catch {
          /* ignore */
        }
      } catch {
        /* keep snapshot fallback */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="reveal relative mt-24 border border-border bg-ink-100/40 p-7 md:p-10">
      <Corners />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Headline numbers */}
        <div className="lg:w-[32%]">
          <div className="flex items-center justify-between">
            <span className="eyebrow inline-flex items-center gap-2">
              GitHub
              {d.live && (
                <span className="inline-flex items-center gap-1 text-mint">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
                  </span>
                  live
                </span>
              )}
            </span>
            <Link
              href={GITHUB.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-muted transition-colors hover:text-signal"
            >
              <Github className="h-3.5 w-3.5" /> @{GITHUB.username}
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="display mt-5 text-[clamp(2.5rem,6vw,4rem)] leading-none text-signal">
            {d.contributionsLastYear.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-bone">contributions in the last year</p>

          <div className="mt-6 flex gap-8">
            <div>
              <p className="display text-2xl text-bone">{d.publicRepos}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim">
                public repos
              </p>
            </div>
            <div>
              <p className="display text-2xl text-bone">{d.memberSince}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim">
                member since
              </p>
            </div>
          </div>

          {/* Language bar */}
          <div className="mt-8">
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-ink-300">
              {d.languages.map((l) => (
                <span
                  key={l.name}
                  className={`${LANG_BG[l.name] ?? "bg-bone/30"} h-full`}
                  style={{ width: `${l.pct}%` }}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {d.languages.map((l) => (
                <span
                  key={l.name}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-bone-muted"
                >
                  <span className={`${LANG_BG[l.name] ?? "bg-bone/30"} h-2 w-2`} />
                  {l.name} {l.pct}%
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contribution heatmap */}
        <div className="lg:w-[60%]">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">
              last 12 months
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-dim">
              less
              {LEVEL_BG.map((bg, i) => (
                <span key={i} className={`${bg} h-2.5 w-2.5`} />
              ))}
              more
            </div>
          </div>

          <div className="w-full overflow-x-auto hide-scrollbar">
            <div
              className="grid grid-flow-col gap-[3px]"
              style={{ gridTemplateRows: "repeat(7, 10px)" }}
            >
              {d.levels.map((lvl, i) => (
                <span
                  key={i}
                  className={`${LEVEL_BG[lvl] ?? "bg-ink-300"} w-[10px] rounded-[1px]`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
