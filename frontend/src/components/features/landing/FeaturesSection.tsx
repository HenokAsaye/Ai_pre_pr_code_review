import {
  ShieldAlert,
  Zap,
  Code2,
  GitBranch,
  Brain,
  Clock,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            What ReviewAI checks
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything a senior dev would flag
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            The same checks your most experienced teammate runs during a review — done automatically, in seconds.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Large card — Security (spans 2 cols) */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-6 md:col-span-2 hover:border-white/14 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <ShieldAlert className="h-5 w-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Security Scanning</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Detect SQL injection, hardcoded secrets, XSS vulnerabilities, and insecure authentication patterns before they ship.
            </p>
            {/* Mini code example */}
            <div className="rounded-lg border border-white/8 bg-background/60 p-3 font-mono text-[11px] leading-5">
              <div className="flex items-center gap-2 text-red-400 line-through opacity-70">
                <span className="text-red-500/60">-</span>
                <span>token = jwt.encode(payload, <span className="text-red-300">&quot;mysecret&quot;</span>)</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <span className="text-green-500/60">+</span>
                <span>token = jwt.encode(payload, <span className="text-green-300">os.environ[&quot;JWT_KEY&quot;]</span>)</span>
              </div>
            </div>
          </div>

          {/* Speed card */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-6 hover:border-white/14 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Under 20 Seconds</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Background processing via Celery ensures you never wait. Results stream back as they complete.
            </p>
            <div className="space-y-2">
              {[
                { label: "Diff parse", pct: 100, color: "bg-primary" },
                { label: "AI analysis", pct: 85, color: "bg-purple-500" },
                { label: "Report ready", pct: 60, color: "bg-blue-500" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-[11px] text-muted-foreground/60">{label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diff-aware */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-6 hover:border-white/14 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
              <GitBranch className="h-5 w-5 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Diff-Aware</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Analyzes only what changed between your branches. No noise, no re-reviewing stable code.
            </p>
          </div>

          {/* Performance */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-6 hover:border-white/14 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Zap className="h-5 w-5 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Performance</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Catch O(n²) loops, N+1 queries, and missed caching opportunities before they hit production.
            </p>
          </div>

          {/* GPT-4o — large card (spans 1 col with emphasis) */}
          <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-primary/3 p-6 hover:border-primary/35 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/25">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">GPT-4o Powered</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              State-of-the-art LLM with few-shot prompting to minimize false positives and give actionable fixes.
            </p>
          </div>

          {/* Clean code — wide bottom card */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-6 md:col-span-3 hover:border-white/14 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              <div className="md:w-72 shrink-0">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Code2 className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Clean Code Feedback</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Actionable naming, complexity, SOLID principle, and maintainability suggestions with copy-ready fixes.
                </p>
              </div>
              <div className="mt-5 md:mt-0 flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Naming", tag: "Best Practice", color: "text-blue-400 border-blue-400/30 bg-blue-400/8" },
                  { label: "Complexity", tag: "Warning", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/8" },
                  { label: "SOLID", tag: "Best Practice", color: "text-blue-400 border-blue-400/30 bg-blue-400/8" },
                  { label: "Duplication", tag: "Warning", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/8" },
                ].map(({ label, tag, color }) => (
                  <div key={label} className="rounded-lg border border-white/8 bg-background/40 p-3">
                    <div className="text-sm font-medium text-foreground mb-1">{label}</div>
                    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${color}`}>
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
