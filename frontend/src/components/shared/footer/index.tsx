import Link from "next/link";
import { Wordmark } from "@/components/shared/wordmark";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A written review of a branch diff, before the pull request exists.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          <a
            href="#features"
            className="inline-flex h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            How it works
          </a>
          <Link
            href="/login"
            className="inline-flex h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Sign in
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 font-mono text-[0.6875rem] text-muted-foreground sm:px-6">
          Diffs are processed in memory and not stored. © {new Date().getFullYear()} ReviewAI
        </p>
      </div>
    </footer>
  );
}
