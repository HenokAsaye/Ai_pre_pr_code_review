import { cn, getConfidenceColor } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number;
}

export function ConfidenceScore({ score }: ConfidenceScoreProps) {
  const color = getConfidenceColor(score);
  const label =
    score >= 80 ? "Ready to Ship" : score >= 60 ? "Needs Review" : "Needs Work";

  const getStatusIcon = () => {
    if (score >= 80) return "✓";
    if (score >= 60) return "⚠";
    return "✕";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center">
        {/* Background circle */}
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-xl opacity-20 animate-pulse",
            color.includes("green") ? "bg-green-500" : color.includes("yellow") ? "bg-yellow-500" : "bg-red-500"
          )}
        />

        {/* Main score display */}
        <div className="relative text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className={cn("text-7xl font-bold tabular-nums tracking-tight", color)}>
              {score}
            </span>
            <span className={cn("text-3xl font-semibold", color)}>/ 100</span>
          </div>
        </div>
      </div>

      {/* Label and status */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className={cn("text-2xl font-bold", color)}>{getStatusIcon()}</span>
          <span className={cn("text-xl font-semibold", color)}>{label}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {score >= 80
            ? "Your code is production-ready"
            : score >= 60
            ? "Review the issues before merging"
            : "Address the critical issues first"}
        </p>
      </div>
    </div>
  );
}
