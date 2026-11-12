"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Wordmark } from "@/components/shared/wordmark";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  login?: string;
}

export function AppHeader({ login }: AppHeaderProps) {
  const pathname = usePathname();
  const onRepositories = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
        <nav className="flex min-w-0 items-center gap-6" aria-label="Application">
          <Wordmark href="/dashboard" />
          <Link
            href="/dashboard"
            aria-current={onRepositories ? "page" : undefined}
            className={cn(
              "hidden h-11 items-center text-sm underline-offset-4 hover:underline sm:inline-flex",
              onRepositories ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Repositories
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-4">
          {login ? (
            <span className="hidden max-w-40 truncate font-mono text-xs text-muted-foreground sm:inline">
              {login}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
