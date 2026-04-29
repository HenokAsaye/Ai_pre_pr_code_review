"use client";

import { AlertCircle, CheckCircle2, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { ConfidenceScore } from "@/components/features/analysis/ConfidenceScore";
import { FeedbackList } from "@/components/features/analysis/FeedbackList";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAnalysisPolling } from "@/hooks/use-analysis-polling";
import { getFriendlyErrorMessage, getErrorTitle } from "@/lib/error-messages";
import { useRouter } from "next/navigation";

interface AnalysisResultsDashboardProps {
  taskId: string;
}

export function AnalysisResultsDashboard({ taskId }: AnalysisResultsDashboardProps) {
  const { data, isLoading, isError, error, refetch } = useAnalysisPolling(taskId);
  const router = useRouter();

  if (isLoading) {
    return (
      <Card className="border-white/8 bg-white/5 backdrop-blur-sm">
        <CardContent className="py-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">Analyzing your code...</p>
              <p className="text-sm text-muted-foreground mt-2">This usually takes 10-30 seconds</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    const friendlyMessage = getFriendlyErrorMessage((error as Error | undefined)?.message);
    const title = getErrorTitle((error as Error | undefined)?.message);

    return (
      <Card className="border-destructive/30 bg-destructive/5 backdrop-blur-sm">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground max-w-sm">{friendlyMessage}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="mt-4 gap-2 border-destructive/20"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border-white/8 bg-white/5">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <Clock className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No analysis data available yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Pending or processing state
  if (data.status === "pending" || data.status === "processing") {
    return (
      <Card className="border-white/8 bg-white/5 backdrop-blur-sm">
        <CardContent className="py-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                {data.status === "pending"
                  ? "Your analysis is queued"
                  : "Analyzing your code..."}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {data.status === "pending"
                  ? "Getting ready to analyze your changes"
                  : "Our AI is reviewing your diff"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Failed state with user-friendly message
  if (data.status === "failed") {
    const friendlyMessage = getFriendlyErrorMessage(data.error_message);
    const title = getErrorTitle(data.error_message);

    return (
      <Card className="border-destructive/30 bg-destructive/5 backdrop-blur-sm">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground max-w-sm">{friendlyMessage}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mt-4 gap-2 border-destructive/20"
            >
              <RefreshCw className="h-4 w-4" />
              Try with different branches
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Completed state - show full results
  return (
    <div className="space-y-6">
      {/* Success header */}
      <Card className="border-green-500/30 bg-green-500/5 backdrop-blur-sm">
        <CardContent className="py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500/10">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="font-semibold text-green-600">Analysis complete</p>
              <p className="text-sm text-muted-foreground">Review the findings below</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confidence Score Card */}
      <Card className="border-white/8 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Code Quality Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ConfidenceScore score={data.score ?? 0} />
            {data.summary && (
              <div className="rounded-lg border border-white/8 bg-white/5 p-4">
                <p className="text-sm leading-relaxed text-foreground">{data.summary}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Issues Card */}
      {(data.issues ?? []).length > 0 && (
        <Card className="border-white/8 bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Issues Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackList issues={data.issues ?? []} />
          </CardContent>
        </Card>
      )}

      {/* Empty state for no issues */}
      {(!data.issues || data.issues.length === 0) && (
        <Card className="border-green-500/30 bg-green-500/5 backdrop-blur-sm">
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-semibold text-green-600">No issues found!</p>
                <p className="text-sm text-muted-foreground mt-1">Your code looks great</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
