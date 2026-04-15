"use client";

import { useState } from "react";
import { IssueCard } from "./IssueCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEVERITY_CONFIG } from "@/constants";
import type { AnalysisIssue, IssueSeverity } from "@/types/analysis";

interface FeedbackListProps {
  issues: AnalysisIssue[];
}

type FilterState = IssueSeverity | "all";

export function FeedbackList({ issues }: FeedbackListProps) {
  const [filter, setFilter] = useState<FilterState>("all");

  const counts = {
    critical: issues.filter((i) => i.severity === "critical").length,
    warning: issues.filter((i) => i.severity === "warning").length,
    best_practice: issues.filter((i) => i.severity === "best_practice").length,
  };

  const filtered =
    filter === "all" ? issues : issues.filter((i) => i.severity === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="h-8 gap-1.5"
        >
          All
          <Badge variant="secondary" className="text-xs h-4 px-1">
            {issues.length}
          </Badge>
        </Button>
        {(Object.keys(SEVERITY_CONFIG) as IssueSeverity[]).map((sev) => (
          <Button
            key={sev}
            variant={filter === sev ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(sev)}
            className="h-8 gap-1.5"
          >
            {SEVERITY_CONFIG[sev].label}
            <Badge variant="secondary" className="text-xs h-4 px-1">
              {counts[sev]}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No {filter === "all" ? "" : SEVERITY_CONFIG[filter as IssueSeverity].label.toLowerCase()}{" "}
            issues found.
          </p>
        ) : (
          filtered.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        )}
      </div>
    </div>
  );
}
