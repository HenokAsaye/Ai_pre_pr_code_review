import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BranchSelector } from "@/components/features/repo/BranchSelector";
import { AnalyzeButton } from "@/components/features/repo/AnalyzeButton";

interface Props {
  params: Promise<{ owner: string; name: string }>;
}

export default async function RepoBranchPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/login");

  const { owner, name } = await params;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {owner}/{name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select branches to compare and analyze.
        </p>
      </div>
      <div className="space-y-6">
        <BranchSelector owner={owner} name={name} />
        <AnalyzeButton owner={owner} name={name} />
      </div>
    </main>
  );
}
