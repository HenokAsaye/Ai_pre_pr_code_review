"use client";

import { useState } from "react";
import { useRepos } from "@/hooks/use-repos";
import { RepoCard } from "./RepoCard";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle } from "lucide-react";

export function RepoList() {
  const [query, setQuery] = useState("");
  const { data: repos, isLoading, isError } = useRepos();

  const filtered = repos?.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.description?.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" label="Fetching your repositories..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground mb-1">
            Unable to load repositories
          </p>
          <p className="text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search repositories by name or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-11 h-11 text-base border-white/10 bg-white/5 focus:bg-white/8"
        />
      </div>

      {filtered?.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-base text-muted-foreground">
            {query ? `No repositories found matching "${query}"` : "No repositories available"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered?.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
