import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BranchSelector } from "@/components/features/repo/BranchSelector";
import { AnalyzeButton } from "@/components/features/repo/AnalyzeButton";
import { GitBranch, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: Promise<{ owner: string; name: string }>;
}

export default async function RepoBranchPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/login");

  const { owner, name } = await params;

  return (
    <main className="relative min-h-screen bg-background">
      {/* Decorative background gradients */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              Back to repositories
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/20">
              <GitBranch className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {owner}/{name}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Compare branches and analyze changes before merging.
          </p>
        </div>
        
        <div className="space-y-8">
          <BranchSelector owner={owner} name={name} />
          <AnalyzeButton owner={owner} name={name} />
        </div>
      </div>
    </main>
  );
}
