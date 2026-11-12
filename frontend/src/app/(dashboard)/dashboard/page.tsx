import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RepoList } from "@/components/features/dashboard/RepoList";

export const metadata = {
  title: "Repositories — ReviewAI",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="kicker">Index</p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight text-foreground sm:text-5xl">
        Repositories
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
        Choose one, then name the base and the feature branch.
      </p>
      <div className="mt-10">
        <RepoList />
      </div>
    </main>
  );
}
