"use client";

import { useBranches } from "@/hooks/use-branches";
import { useAnalysisStore } from "@/stores/analysis-store";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface BranchSelectorProps {
  owner: string;
  name: string;
}

const selectClassName =
  "h-11 w-full max-w-full appearance-none border-b border-border bg-transparent pr-8 font-mono text-base text-foreground outline-none focus-visible:border-foreground sm:text-sm";

export function BranchSelector({ owner, name }: BranchSelectorProps) {
  const { data: branches, isLoading, isError, refetch, isFetching } = useBranches(owner, name);
  const { baseBranch, headBranch, setBaseBranch, setHeadBranch } = useAnalysisStore();

  if (isLoading) {
    return (
      <div role="status" className="border-t border-border py-8">
        <p className="kicker">Loading</p>
        <p className="mt-3 font-heading text-3xl tracking-tight">Fetching branches</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="border-t border-border py-8">
        <p className="kicker text-destructive!">Could not load</p>
        <h2 className="mt-3 font-heading text-3xl tracking-tight">Branches did not load</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          GitHub did not return the branch list for this repository.
        </p>
        <Button
          variant="outline"
          className="mt-6 h-11 px-4"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Trying again…" : "Try again"}
        </Button>
      </div>
    );
  }

  if (!branches?.length) {
    return (
      <p className="border-t border-border py-8 text-sm text-muted-foreground">
        This repository has no branches to compare.
      </p>
    );
  }

  return (
    <fieldset className="min-w-0 border-t border-border pt-8">
      <legend className="font-heading text-3xl tracking-tight text-foreground">Compare</legend>
      <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end sm:gap-4">
        <BranchField
          id="base-branch"
          label="Base"
          hint="Merge target"
          value={baseBranch}
          onChange={setBaseBranch}
          placeholder="Choose a base"
          branches={branches.map((branch) => branch.name)}
        />
        <span
          aria-hidden="true"
          className="hidden pb-3 text-center font-mono text-sm text-muted-foreground sm:block"
        >
          …
        </span>
        <BranchField
          id="head-branch"
          label="Head"
          hint="Feature branch"
          value={headBranch}
          onChange={setHeadBranch}
          placeholder="Choose a head"
          branches={branches.map((branch) => branch.name)}
        />
      </div>
    </fieldset>
  );
}

function BranchField({
  id,
  label,
  hint,
  value,
  onChange,
  placeholder,
  branches,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  branches: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <div className="relative mt-2">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={selectClassName}
        >
          <option value="">{placeholder}</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
