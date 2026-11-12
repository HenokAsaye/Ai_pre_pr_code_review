"use client";

import { useState } from "react";
import { useRepos } from "@/hooks/use-repos";
import { RepoCard } from "./RepoCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RepoList() {
  const [query, setQuery] = useState("");
  const { data: repos, isLoading, isError, refetch, isFetching } = useRepos();

  const filtered = repos?.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.full_name.toLowerCase().includes(query.toLowerCase()) ||
      r.description?.toLowerCase().includes(query.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div role="status" className="border-t border-border py-10">
        <p className="kicker">Loading</p>
        <p className="mt-3 font-heading text-3xl tracking-tight text-foreground">
          Fetching repositories
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="border-t border-border py-10">
        <p className="kicker text-destructive!">Could not load</p>
        <h2 className="mt-3 font-heading text-3xl tracking-tight text-foreground">
          Repositories did not load
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          The request to GitHub failed. Check the connection, then try again.
        </p>
        <Button
          variant="outline"
          className="mt-6 h-11 px-4"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Trying again…" : "Try again"}
        </Button>
      </div>
    );
  }

  const total = repos?.length ?? 0;
  const shown = filtered?.length ?? 0;

  return (
    <div>
      <label className="block">
        <span className="sr-only">Search repositories</span>
        <span className="relative block">
          <Search
            className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Search by name or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 rounded-none border-0 border-b border-border bg-transparent pr-0 pl-7 shadow-none focus-visible:border-foreground focus-visible:ring-0"
          />
        </span>
      </label>

      <p className="mt-4 font-mono text-xs text-muted-foreground">
        {query ? `${shown} of ${total}` : `${total} ${total === 1 ? "repository" : "repositories"}`}
      </p>

      {shown === 0 ? (
        <p className="border-t border-border py-10 text-sm text-muted-foreground">
          {query
            ? `Nothing matches “${query}”.`
            : "This account has no repositories the review can read."}
        </p>
      ) : (
        <ul className="mt-2 border-t border-border">
          {filtered?.map((repo) => (
            <li key={repo.id}>
              <RepoCard repo={repo} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
