export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string | null;
  html_url: string;
  default_branch: string | null;
}

export interface GitHubBranch {
  name: string;
  sha: string;
}

export interface GitHubDiffFile {
  sha: string;
  filename: string;
  status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
}

export interface GitHubComparison {
  base_commit: { sha: string };
  merge_base_commit: { sha: string };
  status: "diverged" | "ahead" | "behind" | "identical";
  ahead_by: number;
  behind_by: number;
  total_commits: number;
  files: GitHubDiffFile[];
}
