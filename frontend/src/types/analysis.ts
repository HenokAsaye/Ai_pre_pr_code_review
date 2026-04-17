export type IssueSeverity = "low" | "medium" | "high" | "critical";
export type TaskStatus = "pending" | "processing" | "completed" | "failed";

export interface AnalysisIssue {
  file: string;
  line: number | null;
  severity: IssueSeverity;
  message: string;
  suggestion: string | null;
}

export interface AnalysisTask {
  score: number | null;
  status: TaskStatus;
  summary: string | null;
  issues: AnalysisIssue[];
  error_message?: string | null;
}

export interface StartAnalysisPayload {
  owner: string;
  repo: string;
  base_ref: string;
  head_ref: string;
}

export interface StartAnalysisResponse {
  task_id: string;
  status: TaskStatus;
}
