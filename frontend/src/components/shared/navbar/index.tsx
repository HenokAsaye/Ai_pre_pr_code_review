import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/shared/wordmark";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark />
        <nav className="flex items-center gap-5" aria-label="Primary">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hidden h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
            >
              {label}
            </a>
          ))}
          <Button className="h-11 px-4" render={<Link href="/login" />}>
            Sign in
          </Button>
        </nav>
      </div>
    </header>
  );
}
