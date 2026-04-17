import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEVERITY_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";
import { FileCode } from "lucide-react";
import type { AnalysisIssue } from "@/types/analysis";

interface IssueCardProps {
  issue: AnalysisIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const config = SEVERITY_CONFIG[issue.severity];

  return (
    <Card
      className={cn(
        "border transition-colors",
        config.border,
        config.bg
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            <Badge variant={config.badge as "destructive" | "secondary"} className="text-xs">
              {config.label}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
            <FileCode className="h-3 w-3" />
            <span className="font-mono">
              {issue.file}:{issue.line ?? "?"}
            </span>
          </div>
        </div>

        <h4 className="font-semibold text-foreground text-sm mb-1.5">
          {issue.message}
        </h4>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Review suggestion:
        </p>

        <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2.5">
          <p className="text-xs font-medium text-foreground mb-1">Suggestion</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {issue.suggestion ?? "No suggestion provided."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
