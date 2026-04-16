import Link from "next/link";
import { GitMerge } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <GitMerge className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold text-foreground">ReviewAI</span>
          </Link>

          <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
            <a href="#features" className="hover:text-muted-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-muted-foreground transition-colors">How it works</a>
          </div>

          <p className="text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} ReviewAI &mdash; Code processed in memory only.
          </p>
        </div>
      </div>
    </footer>
  );
}
