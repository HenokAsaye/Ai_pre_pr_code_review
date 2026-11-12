import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BranchSelector } from "@/components/features/repo/BranchSelector";
import { AnalyzeButton } from "@/components/features/repo/AnalyzeButton";
import { BackLink } from "@/components/shared/back-link";

interface Props {
  params: Promise<{ owner: string; name: string }>;
}

export default async function RepoBranchPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/login");

  const { owner, name } = await params;

  return (
    <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <BackLink href="/dashboard">Repositories</BackLink>

      <div className="mt-8">
        <p className="font-mono text-sm text-muted-foreground">{owner}</p>
        <h1 className="mt-1 font-heading text-4xl tracking-tight break-words text-pretty text-foreground sm:text-5xl">
          {name}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          The base is where this will merge. The head is the branch with the change.
        </p>
      </div>

      <div className="mt-10 max-w-3xl">
        <BranchSelector owner={owner} name={name} />
        <AnalyzeButton owner={owner} name={name} />
      </div>
    </main>
  );
}
