export type IssueSeverity = "critical" | "warning" | "best_practice";
export type TaskStatus = "pending" | "processing" | "completed" | "failed";
export type IssueCategory = "security" | "performance" | "logic" | "style" | "maintainability";

export interface AnalysisIssue {
  id: string;
  file: string;
  line_start: number;
  line_end: number;
  severity: IssueSeverity;
  category: IssueCategory;
  title: string;
  description: string;
  suggestion: string;
  code_snippet?: string;
  fixed_snippet?: string;
}

export interface AnalysisResult {
  task_id: string;
  repo_full_name: string;
  base_branch: string;
  head_branch: string;
  confidence_score: number;
  summary: string;
  issues: AnalysisIssue[];
  files_analyzed: number;
  total_changes: number;
  created_at: string;
  completed_at: string;
}

export interface AnalysisTask {
  task_id: string;
  status: TaskStatus;
  progress?: number;
  result?: AnalysisResult;
  error?: string;
}

export interface StartAnalysisPayload {
  repo_owner: string;
  repo_name: string;
  base_branch: string;
  head_branch: string;
}

export interface StartAnalysisResponse {
  task_id: string;
  status: TaskStatus;
  message: string;
}
