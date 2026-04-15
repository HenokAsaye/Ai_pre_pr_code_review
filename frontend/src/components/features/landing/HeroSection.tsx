import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldAlert, Zap, Star } from "lucide-react";
import { GitHubIcon } from "@/components/shared/github-icon";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16">
      {/* Deep background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[700px] w-[900px] rounded-full bg-primary/8 blur-[140px] animate-glow" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-blue-500/6 blur-[100px]" />
        <div className="absolute left-0 bottom-1/3 h-[300px] w-[300px] rounded-full bg-violet-600/5 blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(1_0_0/4%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/4%)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_100%)]"
      />

      {/* Announcement pill */}
      <a
        href="#features"
        className="group mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-medium text-primary transition-all hover:border-primary/40 hover:bg-primary/15"
      >
        <Star className="h-3 w-3 fill-primary" />
        <span>Now powered by GPT-4o — see what&apos;s new</span>
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </a>

      {/* Main headline */}
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]">
          Catch bugs{" "}
          <span className="relative inline-block">
            <span className="animate-gradient bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              before the PR
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 right-0 h-px animate-gradient bg-gradient-to-r from-violet-400/0 via-purple-400/60 to-indigo-400/0"
            />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          ReviewAI acts as your senior developer — analyzing your feature branch against main,
          flagging security holes, logic bugs, and performance issues in under 20 seconds.
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="h-12 gap-2.5 px-7 text-[15px] font-semibold"
            render={<Link href="/login" />}
          >
            <GitHubIcon className="h-[18px] w-[18px]" />
            Connect GitHub — it&apos;s free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            See how it works
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground/70">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            No code stored permanently
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
            Results in &lt; 20 seconds
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Works with private repos
          </span>
        </div>
      </div>

      {/* ── Code review mockup ──────────────────────────── */}
      <div className="mt-16 mx-auto w-full max-w-3xl animate-float">
        <div className="relative rounded-2xl border border-white/8 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Glow border top */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
              <div className="ml-2 flex gap-1">
                {["api/auth.py", "models/user.py"].map((f, i) => (
                  <span
                    key={f}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-mono transition-colors ${
                      i === 0
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Confidence score pill */}
            <div className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1">
              <span className="text-[11px] font-mono font-semibold text-yellow-400">73 / 100</span>
              <div className="h-1 w-16 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[73%] rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
              </div>
            </div>
          </div>

          {/* Diff content */}
          <div className="p-4 font-mono text-[12px] leading-6">
            <div className="flex gap-0">
              {/* Line numbers */}
              <div className="select-none pr-4 text-right text-muted-foreground/30 w-10 shrink-0 border-r border-white/5">
                {[40, 41, 42, 43, 44, 45, 46].map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </div>

              {/* Code */}
              <div className="flex-1 pl-4 overflow-x-auto">
                <div className="text-muted-foreground/60">def authenticate_user(request):</div>
                <div className="text-muted-foreground/60">{"    "}username = request.POST.get(&apos;username&apos;)</div>
                <div className="text-muted-foreground/60">{"    "}password = request.POST.get(&apos;password&apos;)</div>
                <div className="flex items-center bg-red-500/12 -mx-4 px-4 rounded-sm border-l-2 border-red-500/60">
                  <span className="text-red-400 select-none mr-2">-</span>
                  <span className="text-red-300">{"    "}token = jwt.encode(&#123;&quot;user&quot;: username&#125;, &quot;secret&quot;)</span>
                  <span className="ml-auto shrink-0 rounded-sm bg-red-500/20 px-1.5 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/30">CRITICAL</span>
                </div>
                <div className="flex items-center bg-green-500/10 -mx-4 px-4 rounded-sm border-l-2 border-green-500/40">
                  <span className="text-green-400 select-none mr-2">+</span>
                  <span className="text-green-300">{"    "}secret = os.environ[&quot;JWT_SECRET_KEY&quot;]</span>
                </div>
                <div className="flex items-center bg-green-500/10 -mx-4 px-4 rounded-sm border-l-2 border-green-500/40">
                  <span className="text-green-400 select-none mr-2">+</span>
                  <span className="text-green-300">{"    "}token = jwt.encode(&#123;&quot;user&quot;: username&#125;, secret, &quot;HS256&quot;)</span>
                </div>
                <div className="text-muted-foreground/60">{"    "}return JsonResponse(&#123;&quot;token&quot;: token&#125;)</div>
              </div>
            </div>

            {/* Annotation cards */}
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-3 rounded-lg border border-red-500/25 bg-red-500/8 px-3.5 py-3">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-bold text-red-400 uppercase tracking-wide">Critical · Security</span>
                    <span className="text-[11px] text-muted-foreground/50 font-mono">line 43</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    Hardcoded JWT secret detected. Rotate immediately and load from <code className="text-primary/80">os.environ</code> instead.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/6 px-3.5 py-3">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wide">Warning · Performance</span>
                    <span className="text-[11px] text-muted-foreground/50 font-mono">line 41–42</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    Missing rate limiting on auth endpoint — consider adding <code className="text-primary/80">@ratelimit</code> decorator.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary footer */}
            <div className="mt-3 flex items-center gap-4 border-t border-white/5 pt-3 text-[11px] text-muted-foreground/60">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                2 Critical
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                1 Warning
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                4 Suggestions
              </span>
              <span className="ml-auto font-mono text-muted-foreground/40">3 files · 127 changes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
