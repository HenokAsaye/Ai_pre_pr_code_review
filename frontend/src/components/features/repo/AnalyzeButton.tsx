"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles, Zap } from "lucide-react";
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
      setSelectedRepo({ owner, name, fullName: `${owner}/${name}` });
      router.push(`/analysis/${data.task_id}`);
    } catch (error) {
      console.error("Analysis failed to start:", error);
      setIsLoading(false);
    }
  }

  return (
    <Card className={`border-white/8 bg-white/5 backdrop-blur-sm ${ isDisabled ? "opacity-60" : "" }`}>
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Ready to analyze?</p>
              <p className="text-sm text-muted-foreground mt-0.5">Get instant feedback from our AI</p>
            </div>
          </div>
          <Button
            size="lg"
            className="gap-2 px-8"
            onClick={handleAnalyze}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze Changes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
