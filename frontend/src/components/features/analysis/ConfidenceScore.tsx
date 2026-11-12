import { verdictForScore } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number;
}

export function ConfidenceScore({ score }: ConfidenceScoreProps) {
  const verdict = verdictForScore(score);

  return (
    <div>
      <p className="font-heading text-6xl leading-none tracking-tight text-foreground tabular-nums">
        {score}
      </p>
      <p className="mt-2 font-mono text-[0.6875rem] leading-relaxed font-medium tracking-[0.14em] text-muted-foreground uppercase">
        {verdict.label}
      </p>
    </div>
  );
}
