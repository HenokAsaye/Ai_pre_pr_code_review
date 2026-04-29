import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RepoList } from "@/components/features/dashboard/RepoList";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Dashboard — ReviewAI",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="relative min-h-screen bg-background">
      {/* Decorative background gradients */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 left-0 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Your Repositories
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Select a repository to begin your pre-PR review. Let AI catch issues before they reach your team.
          </p>
        </div>
        
        <RepoList />
      </div>
    </main>
  );
}
