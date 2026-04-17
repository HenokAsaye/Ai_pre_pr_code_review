"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

import apiClient from "@/lib/api-client";
import { API_ROUTES } from "@/constants";

const LINKED_FLAG = "github_token_linked";

export function AuthBootstrap() {
  const { data: session, status } = useSession();

  useEffect(() => {
    async function linkGitHubToken() {
      if (status !== "authenticated") return;
      if (!session?.githubAccessToken) return;
      if (!session?.backendJwt) return;
      if (sessionStorage.getItem(LINKED_FLAG) === "1") return;
      try {
        await apiClient.post(API_ROUTES.AUTH_GITHUB_TOKEN, {
          access_token: session.githubAccessToken,
        });
        sessionStorage.setItem(LINKED_FLAG, "1");
      } catch {
        // Keep UX non-blocking; protected API calls will surface errors if linking fails.
      }
    }

    void linkGitHubToken();
  }, [session?.backendJwt, session?.githubAccessToken, status]);

  return null;
}
