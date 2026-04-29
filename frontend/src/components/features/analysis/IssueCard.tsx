import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEVERITY_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import type { AnalysisIssue } from "@/types/analysis";

interface IssueCardProps {
  issue: AnalysisIssue;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "critical":
      return <AlertOctagon className="h-4 w-4" />;
    case "high":
      return <AlertTriangle className="h-4 w-4" />;
    case "medium":
      return <AlertCircle className="h-4 w-4" />;
    case "low":
    default:
      return <CheckCircle2 className="h-4 w-4" />;
  }
};

export function IssueCard({ issue }: IssueCardProps) {
  const config = SEVERITY_CONFIG[issue.severity];

  return (
    <Card
      className={cn(
        "border transition-all hover:shadow-lg",
        config.border,
        config.bg
      )}
    >
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Header with severity and location */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className={cn("mt-0.5 flex-shrink-0", config.color)}>
                {getSeverityIcon(issue.severity)}
              </div>
              <div className="min-w-0 flex-1">
                <Badge
                  variant={config.badge as "destructive" | "secondary"}
                  className="text-xs font-medium mb-1.5"
                >
                  {config.label}
                </Badge>
                <h4 className="font-semibold text-foreground text-sm leading-snug">
                  {issue.message}
                </h4>
              </div>
            </div>
            {issue.file && issue.line && (
              <div className="text-xs text-muted-foreground shrink-0 text-right">
                <div className="font-mono text-primary/70">
                  {issue.file}:{issue.line}
                </div>
              </div>
            )}
          </div>

          {/* Suggestion section */}
          {issue.suggestion && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <p className="text-xs font-semibold text-foreground">How to fix</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                {issue.suggestion}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
