"use client";

import Link from "next/link";
import type { GitHubRepo } from "@/types/github";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const [owner] = repo.full_name.split("/");

  return (
    <Link
      href={`/repo/${owner}/${repo.name}`}
      className="group grid gap-2 border-b border-border py-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
    >
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-medium text-foreground underline-offset-4 group-hover:underline">
            {repo.name}
          </span>
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
            {repo.private ? "Private" : "Public"}
          </span>
        </span>
        <span className="mt-1 block text-sm text-muted-foreground">{owner}</span>
        {repo.description ? (
          <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted-foreground">
            {repo.description}
          </span>
        ) : null}
      </span>
      {repo.default_branch ? (
        <span className="font-mono text-xs text-muted-foreground sm:text-right">
          {repo.default_branch}
        </span>
      ) : null}
    </Link>
  );
}
