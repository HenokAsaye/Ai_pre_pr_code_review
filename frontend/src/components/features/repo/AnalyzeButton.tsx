"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAnalysisStore } from "@/stores/analysis-store";
import apiClient from "@/lib/api-client";
import { API_ROUTES } from "@/constants";
import type { StartAnalysisPayload, StartAnalysisResponse } from "@/types/analysis";

interface AnalyzeButtonProps {
  owner: string;
  name: string;
}

export function AnalyzeButton({ owner, name }: AnalyzeButtonProps) {
  const router = useRouter();
  const { baseBranch, headBranch, setTaskId, setSelectedRepo } = useAnalysisStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const missing = !baseBranch || !headBranch;
  const sameBranch = Boolean(baseBranch) && baseBranch === headBranch;
  const isDisabled = missing || sameBranch;

  async function handleAnalyze() {
    setIsLoading(true);
    setError(null);
    try {
      const payload: StartAnalysisPayload = {
        owner,
        repo: name,
        base_ref: baseBranch,
        head_ref: headBranch,
      };
      const { data } = await apiClient.post<StartAnalysisResponse>(
        API_ROUTES.ANALYSIS_START,
        payload,
      );
      setTaskId(data.task_id);
      setSelectedRepo({ owner, name, fullName: `${owner}/${name}` });
      router.push(`/analysis/${data.task_id}`);
    } catch (err) {
      console.error("Analysis failed to start:", err);
      setError("The review could not be started. Try again in a moment.");
      setIsLoading(false);
    }
  }

  const showingPair = !error && !missing && !sameBranch;
  const hint = error
    ? error
    : missing
      ? "Choose a base and a head."
      : sameBranch
        ? "Base and head are the same branch."
        : `${baseBranch} … ${headBranch}`;

  return (
    <div className="mt-8 border-t border-border pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={
            error
              ? "text-sm text-destructive"
              : showingPair
                ? "min-w-0 font-mono text-sm break-all text-muted-foreground"
                : "text-sm text-muted-foreground"
          }
          role={error ? "alert" : undefined}
        >
          {hint}
        </p>
        <Button
          className="h-11 w-full px-5 sm:w-auto"
          onClick={handleAnalyze}
          disabled={isDisabled || isLoading}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
          {isLoading ? "Starting review…" : "Run review"}
        </Button>
      </div>
    </div>
  );
}
