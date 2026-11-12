import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnalysisResultsDashboard } from "@/components/features/analysis/AnalysisResultsDashboard";
import { AnalysisBackNavigator } from "@/components/features/analysis/AnalysisBackNavigator";

interface Props {
  params: Promise<{ taskId: string }>;
}

export const metadata = {
  title: "Review — ReviewAI",
};

export default async function AnalysisPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/login");

  const { taskId } = await params;

  return (
    <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AnalysisBackNavigator />
      <div className="mt-8">
        <AnalysisResultsDashboard taskId={taskId} />
      </div>
    </main>
  );
}
