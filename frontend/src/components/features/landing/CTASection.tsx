import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/github-icon";

export function CTASection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between lg:py-24">
        <div className="max-w-xl">
          <h2 className="font-heading text-4xl tracking-tight text-pretty text-foreground sm:text-5xl">
            Open a branch. Read the note.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            GitHub is the only sign-in. No card. Public and private repositories.
          </p>
        </div>
        <Button className="h-11 w-full px-5 sm:w-auto" render={<Link href="/login" />}>
          <GitHubIcon className="size-4" />
          Continue with GitHub
        </Button>
      </div>
    </section>
  );
}
