"use client";

import { useState } from "react";
import { IssueCard } from "./IssueCard";
import { SEVERITY_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";
import type { AnalysisIssue, IssueSeverity } from "@/types/analysis";

interface FeedbackListProps {
  issues: AnalysisIssue[];
}

type FilterState = IssueSeverity | "all";

export function FeedbackList({ issues }: FeedbackListProps) {
  const [filter, setFilter] = useState<FilterState>("all");

  const counts = {
    critical: issues.filter((issue) => issue.severity === "critical").length,
    high: issues.filter((issue) => issue.severity === "high").length,
    medium: issues.filter((issue) => issue.severity === "medium").length,
    low: issues.filter((issue) => issue.severity === "low").length,
  };

  const filtered = filter === "all" ? issues : issues.filter((issue) => issue.severity === filter);
  const present = (Object.keys(SEVERITY_CONFIG) as IssueSeverity[]).filter(
    (severity) => counts[severity] > 0,
  );

  return (
    <div className="mt-10">
      <div
        className="flex flex-wrap items-end gap-x-5 gap-y-1 border-b border-border"
        role="group"
        aria-label="Filter issues"
      >
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
          count={issues.length}
        >
          All
        </FilterButton>
        {present.map((severity) => (
          <FilterButton
            key={severity}
            active={filter === severity}
            onClick={() => setFilter(severity)}
            count={counts[severity]}
          >
            {SEVERITY_CONFIG[severity].label}
          </FilterButton>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-sm text-muted-foreground">
          {filter === "all"
            ? "No issues were marked on this diff."
            : `No ${SEVERITY_CONFIG[filter].label.toLowerCase()} issues.`}
        </p>
      ) : (
        filtered.map((issue) => (
          <IssueCard key={`${issue.file}:${issue.line ?? 0}:${issue.message}`} issue={issue} />
        ))
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "-mb-px inline-flex h-11 items-center gap-2 border-b-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "border-foreground text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
      <span className="font-mono text-xs tabular-nums">{count}</span>
    </button>
  );
}
