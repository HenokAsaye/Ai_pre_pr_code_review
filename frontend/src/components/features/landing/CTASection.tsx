import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { GitHubIcon } from "@/components/shared/github-icon";

export function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/12 via-card/80 to-violet-900/20 px-8 py-20 text-center">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-primary/15 blur-[100px]" />
          </div>

          {/* Top border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 mb-8 text-xs font-medium text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            End-to-end private · No code stored
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Stop guessing.
            <br />
            <span className="animate-gradient bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Start shipping confidently.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            ReviewAI is your private senior developer — available 24/7, brutally
            honest, and done in under 20 seconds.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-12 gap-2.5 px-8 text-[15px] font-semibold"
              render={<Link href="/login" />}
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
              Get Started — it&apos;s free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground/60">
            No credit card. No setup fee. Works with any public or private GitHub repo.
          </p>
        </div>
      </div>
    </section>
  );
}
