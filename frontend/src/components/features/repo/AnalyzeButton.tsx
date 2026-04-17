"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
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
  const { baseBranch, headBranch, setTaskId } = useAnalysisStore();
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = !baseBranch || !headBranch || baseBranch === headBranch;

  async function handleAnalyze() {
    setIsLoading(true);
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
      router.push(`/analysis/${data.task_id}`);
    } catch (error) {
      console.error("Analysis failed to start:", error);
      setIsLoading(false);
    }
  }

  return (
    <Button
      size="lg"
      className="gap-2"
      onClick={handleAnalyze}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      {isLoading ? "Starting analysis..." : "Analyze Changes"}
    </Button>
  );
}
