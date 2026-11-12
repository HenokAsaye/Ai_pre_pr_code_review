"use client";

import { ConfidenceScore } from "@/components/features/analysis/ConfidenceScore";
import { FeedbackList } from "@/components/features/analysis/FeedbackList";
import { Button } from "@/components/ui/button";
import { useAnalysisPolling } from "@/hooks/use-analysis-polling";
import { getFriendlyErrorMessage, getErrorTitle } from "@/lib/error-messages";
import { verdictForScore } from "@/lib/utils";
import { useAnalysisStore } from "@/stores/analysis-store";
import { useRouter } from "next/navigation";

interface AnalysisResultsDashboardProps {
  taskId: string;
}

export function AnalysisResultsDashboard({ taskId }: AnalysisResultsDashboardProps) {
  const { data, isLoading, isError, error, refetch, isFetching } = useAnalysisPolling(taskId);
  const router = useRouter();
  const selectedRepo = useAnalysisStore((state) => state.selectedRepo);
  const baseBranch = useAnalysisStore((state) => state.baseBranch);
  const headBranch = useAnalysisStore((state) => state.headBranch);

  const meta =
    selectedRepo && baseBranch && headBranch
      ? `${selectedRepo.fullName} · ${baseBranch}…${headBranch}`
      : selectedRepo?.fullName;

  if (isLoading || data?.status === "pending" || data?.status === "processing") {
    const queued = data?.status === "pending";
    const waiting = isLoading && !data;
    return (
      <ReviewStatus
        meta={meta}
        kicker={waiting ? "Loading" : queued ? "Queued" : "In progress"}
        title={waiting ? "Opening the review" : queued ? "Waiting to start" : "Reading the diff"}
        detail={
          waiting
            ? "Fetching the latest status."
            : queued
              ? "The review is queued. This page updates on its own."
              : "This usually takes 10–30 seconds. Keep this page open."
        }
      />
    );
  }

  if (isError || !data) {
    const message = isError
      ? getFriendlyErrorMessage((error as Error | undefined)?.message)
      : "No review is available for this link yet.";
    const title = isError
      ? getErrorTitle((error as Error | undefined)?.message)
      : "Nothing here yet";

    return (
      <ReviewStatus
        meta={meta}
        kicker="Could not load"
        title={title}
        detail={message}
        alert
        action={
          <Button
            variant="outline"
            className="h-11 px-4"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Trying again…" : "Try again"}
          </Button>
        }
      />
    );
  }

  if (data.status === "failed") {
    return (
      <ReviewStatus
        meta={meta}
        kicker="Review failed"
        title={getErrorTitle(data.error_message)}
        detail={getFriendlyErrorMessage(data.error_message)}
        alert
        action={
          <Button variant="outline" className="h-11 px-4" onClick={() => router.back()}>
            Choose different branches
          </Button>
        }
      />
    );
  }

  const score = data.score ?? 0;
  const verdict = verdictForScore(score);
  const issues = data.issues ?? [];
  const summary = data.summary?.trim();

  return (
    <div>
      {meta ? <p className="truncate font-mono text-xs text-muted-foreground">{meta}</p> : null}
      <div className="mt-8 lg:grid lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:items-start lg:gap-x-12">
        <div className="border-b border-border pb-6 lg:sticky lg:top-20 lg:border-0 lg:pb-0">
          <ConfidenceScore score={score} />
        </div>
        <div className="pt-8 lg:pt-1">
          <h1
            className={
              summary
                ? "max-w-2xl font-heading text-3xl leading-snug tracking-tight break-words text-pretty text-foreground italic sm:text-4xl"
                : "max-w-2xl font-heading text-3xl leading-snug tracking-tight break-words text-pretty text-foreground sm:text-4xl"
            }
          >
            {summary || verdict.note}
          </h1>
          {summary ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {verdict.note}
            </p>
          ) : null}
          {issues.length === 0 ? (
            <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
              No issues were marked on this diff.
            </p>
          ) : (
            <FeedbackList issues={issues} />
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewStatus({
  meta,
  kicker,
  title,
  detail,
  action,
  alert = false,
}: {
  meta?: string;
  kicker: string;
  title: string;
  detail: string;
  action?: React.ReactNode;
  alert?: boolean;
}) {
  return (
    <div className="max-w-xl" role={alert ? "alert" : "status"} aria-live="polite">
      {meta ? <p className="truncate font-mono text-xs text-muted-foreground">{meta}</p> : null}
      <p className={`kicker ${meta ? "mt-6" : ""} ${alert ? "text-destructive!" : ""}`}>{kicker}</p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight text-pretty text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{detail}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
