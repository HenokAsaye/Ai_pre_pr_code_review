"use client";

import { useAnalysisStore } from "@/stores/analysis-store";
import { BackLink } from "@/components/shared/back-link";

export function AnalysisBackNavigator() {
  const selectedRepo = useAnalysisStore((state) => state.selectedRepo);
  const href = selectedRepo ? `/repo/${selectedRepo.owner}/${selectedRepo.name}` : "/dashboard";

  return <BackLink href={href}>{selectedRepo ? "Branches" : "Repositories"}</BackLink>;
}
