import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { API_ROUTES, QUERY_KEYS, REPO_CACHE_STALE_TIME_MS } from "@/constants";
import type { GitHubRepo } from "@/types/github";

async function fetchRepos(): Promise<GitHubRepo[]> {
  const response = await apiClient.get<GitHubRepo[]>(API_ROUTES.REPOS);
  return response.data;
}

export function useRepos() {
  return useQuery({
    queryKey: QUERY_KEYS.REPOS,
    queryFn: () => fetchRepos(),
    staleTime: REPO_CACHE_STALE_TIME_MS,
  });
}
