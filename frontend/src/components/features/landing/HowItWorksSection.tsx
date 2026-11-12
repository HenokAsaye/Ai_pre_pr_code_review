const steps = [
  {
    step: "01",
    title: "Connect GitHub",
    description:
      "One sign-in. The repo scope is what lets the review read branches and diffs. The access token is encrypted at rest.",
  },
  {
    step: "02",
    title: "Name the two branches",
    description:
      "The base is the merge target. The head is the feature branch. The review looks only at what changed between them.",
  },
  {
    step: "03",
    title: "The diff is read",
    description:
      "A filtered patch goes to Gemini. Binary, lock, and minified files are skipped. The raw diff is not stored.",
  },
  {
    step: "04",
    title: "Read the note",
    description:
      "A score, a summary in plain language, and each issue with a file, a line, and a fix when one is obvious.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <p className="kicker">How it works</p>
          <h2 className="mt-3 font-heading text-4xl tracking-tight text-pretty text-foreground sm:text-5xl">
            Four steps, then a note.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            The job usually finishes in well under a minute. Keep the page open while it runs.
          </p>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {steps.map((item) => (
            <li
              key={item.step}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-t border-border py-6 first:border-t-0 first:pt-0"
            >
              <span className="pt-1 font-mono text-xs text-muted-foreground">{item.step}</span>
              <div>
                <h3 className="font-heading text-2xl tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
