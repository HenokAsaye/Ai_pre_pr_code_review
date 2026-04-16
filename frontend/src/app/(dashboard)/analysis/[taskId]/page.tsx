import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ taskId: string }>;
}

export default async function AnalysisPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/login");

  const { taskId } = await params;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Analysis Results</h1>
        <p className="mt-1 text-sm text-muted-foreground font-mono text-xs">
          Task: {taskId}
        </p>
      </div>
      {/* AnalysisResultsDashboard will be added in the next session */}
    </main>
  );
}
