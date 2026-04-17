import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RepoList } from "@/components/features/dashboard/RepoList";

export const metadata = {
  title: "Dashboard — ReviewAI",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Your Repositories</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a repository to begin your pre-PR review.
        </p>
      </div>
      <RepoList />
    </main>
  );
}
