"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShieldCheck, Lock, GitBranch, CheckCircle2 } from "lucide-react";
import { GitHubIcon } from "@/components/shared/github-icon";

export function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  async function handleGitHubSignIn() {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl });
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
        {/* Glow top border */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-foreground">Welcome to ReviewAI</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to start your AI code review
          </p>
        </div>

        <Button
          size="lg"
          className="w-full h-12 gap-3 text-[15px] font-semibold mb-6"
          onClick={handleGitHubSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <GitHubIcon className="h-5 w-5" />
          )}
          {isLoading ? "Redirecting…" : "Continue with GitHub"}
        </Button>

        <div className="relative flex items-center gap-3 mb-6">
          <Separator className="flex-1 opacity-30" />
          <span className="text-[11px] text-muted-foreground/50 uppercase tracking-wider">
            Permissions requested
          </span>
          <Separator className="flex-1 opacity-30" />
        </div>

        <ul className="space-y-2.5">
          {[
            { icon: Lock, color: "text-green-400", label: "Read public & private repos" },
            { icon: GitBranch, color: "text-blue-400", label: "Compare branches & fetch diffs" },
            { icon: ShieldCheck, color: "text-primary", label: "Your GitHub profile & email" },
          ].map(({ icon: Icon, color, label }) => (
            <li key={label} className="flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5">
                <Icon className={`h-3 w-3 ${color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
              <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-muted-foreground/30" />
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-center text-[11px] text-muted-foreground/40 leading-relaxed px-4">
        Code is processed temporarily in memory.
        Never stored permanently without your consent.
      </p>
    </div>
  );
}
