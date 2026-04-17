"use client";

import { AlertCircle } from "lucide-react";

import { ConfidenceScore } from "@/components/features/analysis/ConfidenceScore";
import { FeedbackList } from "@/components/features/analysis/FeedbackList";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysisPolling } from "@/hooks/use-analysis-polling";

interface AnalysisResultsDashboardProps {
  taskId: string;
}

export function AnalysisResultsDashboard({ taskId }: AnalysisResultsDashboardProps) {
  const { data, isLoading, isError, error } = useAnalysisPolling(taskId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10">
          <LoadingSpinner size="lg" label="Fetching analysis results..." />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">
              Failed to fetch analysis results. {(error as Error | undefined)?.message ?? ""}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="py-10">
          <p className="text-sm text-muted-foreground">No analysis data available yet.</p>
        </CardContent>
      </Card>
    );
  }

  if (data.status === "pending" || data.status === "processing") {
    return (
      <Card>
        <CardContent className="py-10">
          <LoadingSpinner
            size="lg"
            label={
              data.status === "pending"
                ? "Analysis queued. Waiting for worker..."
                : "Worker is analyzing your diff..."
            }
          />
        </CardContent>
      </Card>
    );
  }

  if (data.status === "failed") {
    return (
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Analysis failed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {data.error_message ?? "Unknown error while running analysis."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Confidence score</CardTitle>
        </CardHeader>
        <CardContent>
          <ConfidenceScore score={data.score ?? 0} />
          {data.summary && <p className="mt-4 text-sm text-muted-foreground">{data.summary}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <FeedbackList issues={data.issues ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
