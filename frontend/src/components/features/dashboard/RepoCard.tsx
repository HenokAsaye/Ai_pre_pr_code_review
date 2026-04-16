"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Star, GitFork, Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { GitHubRepo } from "@/types/github";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Link href={`/repo/${repo.owner.login}/${repo.name}`}>
      <Card className="group h-full cursor-pointer border-border/60 bg-card/50 transition-colors hover:border-border hover:bg-card">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                {repo.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {repo.owner.login}
              </p>
            </div>
            {repo.private && (
              <Badge variant="secondary" className="shrink-0 gap-1 text-xs">
                <Lock className="h-2.5 w-2.5" />
                Private
              </Badge>
            )}
          </div>

          {repo.description && (
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {repo.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {repo.language && (
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary/60" />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              {repo.forks_count}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(repo.updated_at)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
