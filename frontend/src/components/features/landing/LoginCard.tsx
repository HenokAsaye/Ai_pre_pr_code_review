"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { GitHubIcon } from "@/components/shared/github-icon";

const permissions = [
  "Read public and private repositories",
  "Compare branches and fetch diffs",
  "Read your GitHub profile and email",
];

export function LoginCard({
  callbackUrl = "/dashboard",
  error,
}: {
  callbackUrl?: string;
  error?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGitHubSignIn() {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl });
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md border border-border bg-card px-5 py-6 sm:px-6 sm:py-8 lg:max-w-none">
      <p className="kicker">GitHub</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        You will leave this page to approve access, then come back to your repositories.
      </p>
      <Button className="mt-6 h-11 w-full" onClick={handleGitHubSignIn} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GitHubIcon className="size-4" />
        )}
        {isLoading ? "Redirecting…" : "Continue with GitHub"}
      </Button>
      {error ? (
        <p className="mt-3 text-sm leading-relaxed text-destructive">
          GitHub sent you back without a session. Choose Continue with GitHub again.
        </p>
      ) : null}

      <p className="kicker mt-8">Requested access</p>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {permissions.map((item) => (
          <li key={item} className="py-3 text-sm text-foreground">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        The patch is processed in memory and not stored.
      </p>
    </div>
  );
}
