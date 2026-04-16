import { cn, getConfidenceColor } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number;
}

export function ConfidenceScore({ score }: ConfidenceScoreProps) {
  const color = getConfidenceColor(score);
  const label =
    score >= 80 ? "Ready to Ship" : score >= 60 ? "Needs Review" : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "text-5xl font-bold tabular-nums tracking-tight",
          color
        )}
      >
        {score}
        <span className="text-2xl">/100</span>
      </div>
      <span className={cn("text-sm font-medium", color)}>{label}</span>
    </div>
  );
}
