"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import type { GitHubRepo } from "@/types/github";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const [owner] = repo.full_name.split("/");
  return (
    <Link href={`/repo/${owner}/${repo.name}`}>
      <Card className="group h-full cursor-pointer border border-white/8 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/10 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground text-base truncate group-hover:text-primary transition-colors">
                {repo.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate mt-1">
                {owner}
              </p>
            </div>
            {repo.private && (
              <Badge variant="secondary" className="shrink-0 gap-1 text-xs font-medium">
                <Lock className="h-3 w-3" />
                Private
              </Badge>
            )}
          </div>

          {repo.description && (
            <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
              {repo.description}
            </p>
          )}

          <div className="flex flex-col gap-2 pt-4 border-t border-white/5 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{repo.private ? "Private" : "Public"}</span>
            {repo.default_branch && <span className="text-xs">Default branch: <span className="font-mono text-primary/80">{repo.default_branch}</span></span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
