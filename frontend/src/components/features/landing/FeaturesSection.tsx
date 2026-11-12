const checks = [
  {
    label: "Security",
    detail: "Secrets, injection, and auth shortcuts in the lines that actually changed.",
  },
  {
    label: "Logic",
    detail: "Branches and edge cases the diff touches, including the ones a quick skim skips.",
  },
  {
    label: "Performance",
    detail: "Loops, queries, and work that will get expensive once this ships.",
  },
  {
    label: "Maintainability",
    detail: "Names, complexity, and duplication worth a comment — with a concrete fix.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <p className="kicker">What gets marked</p>
          <h2 className="mt-3 max-w-sm font-heading text-4xl tracking-tight text-pretty text-foreground sm:text-5xl">
            Only the diff. Only what a reviewer would stop on.
          </h2>
          <blockquote className="mt-8 border-l-2 border-severity-critical py-1 pl-4">
            <p className="font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-severity-critical uppercase">
              Critical · api/auth.py:43
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              Hardcoded JWT secret. Load it from the environment before this opens as a pull
              request.
            </p>
          </blockquote>
        </div>

        <dl className="lg:col-span-7">
          {checks.map((item) => (
            <div
              key={item.label}
              className="grid gap-2 border-t border-border py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8"
            >
              <dt className="font-mono text-xs tracking-[0.14em] text-foreground uppercase">
                {item.label}
              </dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{item.detail}</dd>
            </div>
          ))}
          <div className="border-t border-border" />
        </dl>
      </div>
    </section>
  );
}
