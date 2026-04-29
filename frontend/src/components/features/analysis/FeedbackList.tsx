"use client";

import { useState } from "react";
import { IssueCard } from "./IssueCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
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
    high: issues.filter((i) => i.severity === "high").length,
    medium: issues.filter((i) => i.severity === "medium").length,
    low: issues.filter((i) => i.severity === "low").length,
  };

  const filtered =
    filter === "all" ? issues : issues.filter((i) => i.severity === filter);

  return (
    <div className="space-y-5">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="h-9 gap-2 font-medium transition-all"
        >
          All
          {issues.length > 0 && (
            <Badge variant="secondary" className="text-xs h-5 px-1.5 ml-1">
              {issues.length}
            </Badge>
          )}
        </Button>
        {(Object.keys(SEVERITY_CONFIG) as IssueSeverity[]).map((sev) => {
          const count = counts[sev];
          return (
            <Button
              key={sev}
              variant={filter === sev ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(sev)}
              className="h-9 gap-2 font-medium transition-all"
            >
              {SEVERITY_CONFIG[sev].label}
              {count > 0 && (
                <Badge variant="secondary" className="text-xs h-5 px-1.5 ml-1">
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Issues list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center rounded-lg border border-white/8 bg-white/5">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">
              {filter === "all"
                ? "No issues found"
                : `No ${SEVERITY_CONFIG[filter as IssueSeverity].label.toLowerCase()} issues`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Great job!
            </p>
          </div>
        ) : (
          filtered.map((issue) => (
            <IssueCard key={`${issue.file}:${issue.line ?? 0}:${issue.message}`} issue={issue} />
          ))
        )}
      </div>
    </div>
  );
}
