import { LoginCard } from "@/components/features/landing/LoginCard";
import { Wordmark } from "@/components/shared/wordmark";

export const metadata = {
  title: "Sign in — ReviewAI",
  description: "Sign in with GitHub to review a branch before you open a pull request.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Wordmark />
        </div>
      </header>
      <main
        id="main"
        className="mx-auto grid w-full max-w-6xl flex-1 items-start gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20"
      >
        <div className="max-w-md">
          <p className="kicker">Sign in</p>
          <h1 className="mt-3 font-heading text-4xl tracking-tight text-pretty text-foreground sm:text-5xl">
            Sign in to review a branch.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            GitHub is the only sign-in. Repo access is what lets the review read the diff. You can
            sign out from any page after that.
          </p>
        </div>
        <LoginCard callbackUrl={params.callbackUrl} error={params.error} />
      </main>
    </div>
  );
}
