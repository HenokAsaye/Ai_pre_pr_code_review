import { Suspense } from "react";
import { LoginCard } from "@/components/features/landing/LoginCard";
import { GitMerge } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Sign In — ReviewAI",
  description: "Sign in with GitHub to start reviewing your code.",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-glow" />
      </div>

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,oklch(1_0_0/3%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/3%)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]"
      />

      {/* Logo */}
      <Link
        href="/"
        className="mb-10 flex items-center gap-2.5 group"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-shadow group-hover:shadow-primary/50">
          <GitMerge className="h-5 w-5" />
        </div>
        <span className="text-lg font-semibold text-foreground">ReviewAI</span>
      </Link>

      <Suspense>
        <LoginCard />
      </Suspense>
    </div>
  );
}
