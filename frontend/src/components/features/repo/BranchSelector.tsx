"use client";

import { useBranches } from "@/hooks/use-branches";
import { useAnalysisStore } from "@/stores/analysis-store";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { GitBranch } from "lucide-react";

interface BranchSelectorProps {
  owner: string;
  name: string;
}

export function BranchSelector({ owner, name }: BranchSelectorProps) {
  const { data: branches, isLoading } = useBranches(owner, name);
  const { baseBranch, headBranch, setBaseBranch, setHeadBranch } =
    useAnalysisStore();

  if (isLoading) {
    return <LoadingSpinner label="Loading branches..." />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Base branch
          </label>
          <select
            value={baseBranch}
            onChange={(e) => setBaseBranch(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select base branch…</option>
            {branches?.map((b) => (
              <option key={b.name} value={b.name}>
                <GitBranch className="h-3 w-3" />
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Feature branch
          </label>
          <select
            value={headBranch}
            onChange={(e) => setHeadBranch(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select feature branch…</option>
            {branches?.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
