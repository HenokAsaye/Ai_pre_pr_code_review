import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitMerge } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="bg-background/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <GitMerge className="h-4 w-4" />
                <div className="absolute inset-0 rounded-lg bg-primary opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
              <span className="font-semibold text-foreground tracking-tight">
                ReviewAI
              </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "#features", label: "Features" },
                { href: "#how-it-works", label: "How it works" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <Button size="sm" render={<Link href="/login" />}>
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
