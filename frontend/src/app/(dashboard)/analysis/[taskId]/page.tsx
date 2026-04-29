import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnalysisResultsDashboard } from "@/components/features/analysis/AnalysisResultsDashboard";
import { Sparkles, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AnalysisBackNavigator } from "@/components/features/analysis/AnalysisBackNavigator";

interface Props {
  params: Promise<{ taskId: string }>;
}

export default async function AnalysisPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/login");

  const { taskId } = await params;

  return (
    <main className="relative min-h-screen bg-background">
      {/* Decorative background gradients */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-1/3 h-125 w-125 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-100 w-100 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-75 w-75 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center gap-2">
          <AnalysisBackNavigator />
        </div>

        {/* Header */}
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Analysis Results
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Here's what our AI found in your code.
          </p>
        </div>

        <AnalysisResultsDashboard taskId={taskId} />
      </div>
    </main>
  );
}
