export const API_ROUTES = {
  GITHUB_BRANCHES: "/github/branches",
  ANALYSIS_START: "/analysis/start",
  ANALYSIS_STATUS: (taskId: string) => `/analysis/status/${taskId}`,
} as const;

export const QUERY_KEYS = {
  REPOS: ["repos"] as const,
  BRANCHES: (owner: string, name: string) => ["branches", owner, name] as const,
  ANALYSIS: (taskId: string) => ["analysis", taskId] as const,
} as const;

export const SEVERITY_CONFIG = {
  critical: {
    label: "Critical",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    badge: "destructive",
  },
  warning: {
    label: "Warning",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    badge: "warning",
  },
  best_practice: {
    label: "Best Practice",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
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
