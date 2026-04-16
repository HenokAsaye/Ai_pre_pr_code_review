import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import apiClient from "@/lib/api-client";
import { QUERY_KEYS, REPO_CACHE_STALE_TIME_MS } from "@/constants";
import type { GitHubRepo } from "@/types/github";

async function fetchRepos(accessToken: string): Promise<GitHubRepo[]> {
  const response = await apiClient.get<GitHubRepo[]>("/user/repos", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { sort: "updated", per_page: 100 },
  });
  return response.data;
}

export function useRepos() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.REPOS,
    queryFn: () => fetchRepos(session!.accessToken),
    enabled: !!session?.accessToken,
    staleTime: REPO_CACHE_STALE_TIME_MS,
  });
}
