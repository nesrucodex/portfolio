import { Code2, Server, Smartphone, Workflow, Sparkles, ArrowUpRight } from "lucide-react";
import { DISCIPLINES } from "@/constants";
import Corners from "@/components/corners";

const ICONS: Record<string, React.ElementType> = {
  frontend: Code2,
  backend: Server,
  mobile: Smartphone,
  automation: Workflow,
  ai: Sparkles,
};

export default function Disciplines() {
  return (
    <section
      id="disciplines"
      className="relative border-t border-border px-5 py-24 md:px-10 md:py-32 scroll-mt-20"
    >
      <div className="relative mx-auto max-w-6xl">
        <Corners />
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="reveal">
            <span className="eyebrow">02 / Disciplines</span>
            <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] text-bone">
              One engineer, <span className="text-signal">five</span> ways to ship.
            </h2>
          </div>
          <p className="reveal max-w-sm text-sm leading-relaxed text-bone-muted">
            Most projects need more than a single specialist. I move across the
            whole stack, so an idea goes from interface to API to mobile to the
            automation that keeps it running, without handoffs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {DISCIPLINES.map((d) => {
            const Icon = ICONS[d.id] ?? Code2;
            const wide = d.id === "ai";
            return (
              <article
                key={d.id}
                className={`reveal group relative flex flex-col bg-ink p-8 transition-colors duration-300 hover:bg-ink-100 md:p-10 ${
                  wide ? "md:col-span-2" : ""
                }`}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center border border-border text-bone transition-colors duration-300 group-hover:border-signal group-hover:text-signal">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-sm text-bone-dim">{d.index}</span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-bone-dim transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
                </div>

                <h3 className="display text-3xl text-bone md:text-4xl">{d.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-muted">
                  {d.blurb}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {d.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-border px-2.5 py-1 font-mono text-[11px] text-bone-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="mt-7 flex items-center gap-2 border-t border-border/60 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-mint">
                  <span className="text-bone-dim">proof</span>
                  <span className="text-signal">/</span>
                  {d.proof}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
