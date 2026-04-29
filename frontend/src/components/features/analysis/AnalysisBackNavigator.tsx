"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAnalysisStore } from "@/stores/analysis-store";

export function AnalysisBackNavigator() {
  const selectedRepo = useAnalysisStore((state) => state.selectedRepo);
  
  // Navigate to the specific repo's branch selection page, or fallback to dashboard
  const href = selectedRepo 
    ? `/repo/${selectedRepo.owner}/${selectedRepo.name}` 
    : "/dashboard";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="text-sm font-medium">Back to branches</span>
    </Link>
  );
}
