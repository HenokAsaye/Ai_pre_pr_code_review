import { GitCompare, Sparkles, CheckCircle2 } from "lucide-react";
import { GitHubIcon } from "@/components/shared/github-icon";

const steps = [
  {
    step: "01",
    icon: "github" as const,
    title: "Connect GitHub",
    description:
      "One click OAuth — we request only the repo scope to read your branches and diffs. Nothing is stored.",
    accent: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10 border-primary/25",
    iconColor: "text-primary",
  },
  {
    step: "02",
    icon: "compare" as const,
    title: "Pick Your Branches",
    description:
      "Choose a repository, set your base branch (e.g. main) and your feature branch. Takes 10 seconds.",
    accent: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/10 border-violet-500/25",
    iconColor: "text-violet-400",
  },
  {
    step: "03",
    icon: "sparkles" as const,
    title: "AI Analyzes the Diff",
    description:
      "GPT-4o fetches what changed and runs security, performance, and logic checks in the background.",
    accent: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/10 border-blue-500/25",
    iconColor: "text-blue-400",
  },
  {
    step: "04",
    icon: "check" as const,
    title: "Review & Ship Confidently",
    description:
      "Get a confidence score, inline annotations, and copy-ready fix snippets — all in under 20 seconds.",
    accent: "from-green-500/20 to-green-500/5",
    iconBg: "bg-green-500/10 border-green-500/25",
    iconColor: "text-green-400",
  },
];

function StepIcon({
  icon,
  className,
}: {
  icon: (typeof steps)[number]["icon"];
  className: string;
}) {
  if (icon === "github") return <GitHubIcon className={className} />;
  if (icon === "compare") return <GitCompare className={className} />;
  if (icon === "sparkles") return <Sparkles className={className} />;
  return <CheckCircle2 className={className} />;
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Faint separator lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 border-y border-white/5" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From push to review in 4 steps
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-white/8 bg-card/50 p-6 overflow-hidden group hover:border-white/14 transition-colors"
            >
              {/* Top gradient accent */}
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${item.accent} opacity-60`}
              />

              {/* Step number */}
              <div className="mb-5 flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.iconBg}`}
                >
                  <StepIcon icon={item.icon} className={`h-4 w-4 ${item.iconColor}`} />
                </div>
                <span className="font-mono text-3xl font-bold text-white/5 select-none">
                  {item.step}
                </span>
              </div>

              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
