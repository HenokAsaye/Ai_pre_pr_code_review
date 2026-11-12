import { SEVERITY_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";
import type { AnalysisIssue } from "@/types/analysis";

interface IssueCardProps {
  issue: AnalysisIssue;
  className?: string;
}

export function IssueCard({ issue, className }: IssueCardProps) {
  const config = SEVERITY_CONFIG[issue.severity];
  const location = issue.file ? (issue.line ? `${issue.file}:${issue.line}` : issue.file) : null;

  return (
    <article className={cn("flex gap-4 border-b border-border py-5", className)}>
      <span aria-hidden="true" className={cn("w-0.5 shrink-0 self-stretch", config.bar)} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <p
            className={cn(
              "font-mono text-[0.6875rem] font-medium tracking-[0.16em] uppercase",
              config.color,
            )}
          >
            {config.label}
          </p>
          {location ? (
            <p
              className="min-w-0 truncate text-right font-mono text-xs text-muted-foreground"
              title={location}
            >
              {location}
            </p>
          ) : null}
        </div>
        <h3 className="mt-2 text-[0.9375rem] leading-snug font-medium break-words text-foreground">
          {issue.message}
        </h3>
        {issue.suggestion ? (
          <p className="mt-3 text-sm leading-relaxed break-words text-muted-foreground">
            <span className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-foreground uppercase">
              Fix{" "}
            </span>
            {issue.suggestion}
          </p>
        ) : null}
      </div>
    </article>
  );
}
