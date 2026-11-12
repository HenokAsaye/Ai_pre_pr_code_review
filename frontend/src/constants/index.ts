export const API_ROUTES = {
  REPOS: "/api/v1/repos",
  GITHUB_BRANCHES: (owner: string, repo: string) => `/api/v1/repos/${owner}/${repo}/branches`,
  AUTH_GITHUB_TOKEN: "/api/v1/auth/github/token",
  ANALYSIS_START: "/api/v1/reviews/analyze",
  ANALYSIS_STATUS: (taskId: string) => `/api/v1/reviews/${taskId}`,
} as const;

export const QUERY_KEYS = {
  REPOS: ["repos"] as const,
  BRANCHES: (owner: string, name: string) => ["branches", owner, name] as const,
  ANALYSIS: (taskId: string) => ["analysis", taskId] as const,
} as const;

export const SEVERITY_CONFIG = {
  critical: {
    label: "Critical",
    color: "text-severity-critical",
    bar: "bg-severity-critical",
    badge: "destructive",
  },
  high: {
    label: "High",
    color: "text-severity-high",
    bar: "bg-severity-high",
    badge: "secondary",
  },
  medium: {
    label: "Medium",
    color: "text-severity-medium",
    bar: "bg-severity-medium",
    badge: "secondary",
  },
  low: {
    label: "Low",
    color: "text-muted-foreground",
    bar: "bg-foreground/25",
    badge: "secondary",
  },
} as const;

export const CATEGORY_LABELS = {
  security: "Security",
  performance: "Performance",
  logic: "Logic",
  style: "Style",
  maintainability: "Maintainability",
} as const;

export const ANALYSIS_POLL_INTERVAL_MS = 3_000;
export const REPO_CACHE_STALE_TIME_MS = 5 * 60 * 1_000;
export const BRANCH_CACHE_STALE_TIME_MS = 2 * 60 * 1_000;
