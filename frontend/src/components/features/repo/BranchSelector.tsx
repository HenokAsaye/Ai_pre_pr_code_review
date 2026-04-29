"use client";

import { useBranches } from "@/hooks/use-branches";
import { useAnalysisStore } from "@/stores/analysis-store";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    return (
      <Card className="border-white/8 bg-white/5">
        <CardContent className="py-12">
          <LoadingSpinner label="Loading branches..." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-white/8 bg-white/5 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" />
          <CardTitle>Select branches to compare</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">
              Base branch (target)
            </label>
            <select
              value={baseBranch}
              onChange={(e) => setBaseBranch(e.target.value)}
              className="w-full rounded-lg border border-primary/30 bg-linear-to-b from-white/10 to-white/5 px-4 py-2.5 text-base font-medium text-foreground placeholder:text-muted-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none backdrop-blur-sm scheme-dark [&>option]:bg-background [&>option]:text-foreground"
            >
              <option value="">Choose base branch…</option>
              {branches?.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              The branch you want to merge into
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">
              Feature branch (source)
            </label>
            <select
              value={headBranch}
              onChange={(e) => setHeadBranch(e.target.value)}
              className="w-full rounded-lg border border-primary/30 bg-linear-to-b from-white/10 to-white/5 px-4 py-2.5 text-base font-medium text-foreground placeholder:text-muted-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none backdrop-blur-sm scheme-dark [&>option]:bg-background [&>option]:text-foreground"
            >
              <option value="">Choose feature branch…</option>
              {branches?.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              The branch with your changes
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
