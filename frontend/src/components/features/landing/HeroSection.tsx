import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/github-icon";
import { ConfidenceScore } from "@/components/features/analysis/ConfidenceScore";
import { IssueCard } from "@/components/features/analysis/IssueCard";

const sampleIssues = [
  {
    file: "api/auth.py",
    line: 43,
    severity: "critical" as const,
    message: "Hardcoded JWT secret. Load it from the environment before this opens.",
    suggestion: "Read the key from the environment and pass the algorithm explicitly.",
  },
  {
    file: "api/auth.py",
    line: 41,
    severity: "medium" as const,
    message: "The sign-in route has no rate limit.",
    suggestion: null,
  },
];

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-12 lg:pt-20 lg:pb-28">
      <div className="lg:col-span-7">
        <p className="kicker">Before the pull request</p>
        <h1 className="mt-4 max-w-xl font-heading text-5xl leading-[1.05] tracking-tight text-pretty text-foreground sm:text-6xl lg:text-[4.25rem]">
          Read the diff before the team does.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          Pick a base and a feature branch. ReviewAI writes a score, a short summary, and the issues
          worth fixing — security, logic, and the work that will not scale.
        </p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <Button className="h-11 w-full px-5 sm:w-auto" render={<Link href="/login" />}>
            <GitHubIcon className="size-4" />
            Continue with GitHub
          </Button>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center justify-start text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            How it works
          </a>
        </div>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          The patch is read in memory and not stored. Private repositories are included.
        </p>
      </div>

      <figure className="max-w-lg border border-border bg-card lg:col-span-5 lg:mt-3 lg:max-w-none">
        <figcaption className="flex items-baseline justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
          <span className="kicker">Sample review</span>
          <span className="truncate font-mono text-xs text-muted-foreground">main…auth-fix</span>
        </figcaption>
        <div className="grid gap-6 px-4 py-5 sm:px-5 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:items-start">
          <ConfidenceScore score={73} />
          <p className="font-heading text-xl leading-snug text-pretty text-foreground italic">
            The auth change is sound, except for a hardcoded signing secret.
          </p>
        </div>
        <div className="border-t border-border px-4 sm:px-5">
          {sampleIssues.map((issue, index) => (
            <IssueCard
              key={`${issue.file}:${issue.line}`}
              issue={issue}
              className={index === sampleIssues.length - 1 ? "border-b-0" : undefined}
            />
          ))}
        </div>
      </figure>
    </section>
  );
}
