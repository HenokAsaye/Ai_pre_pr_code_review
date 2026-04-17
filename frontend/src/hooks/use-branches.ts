import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { API_ROUTES, QUERY_KEYS, BRANCH_CACHE_STALE_TIME_MS } from "@/constants";
import type { GitHubBranch } from "@/types/github";

async function fetchBranches(
  owner: string,
  name: string,
): Promise<GitHubBranch[]> {
  const response = await apiClient.get<GitHubBranch[]>(
    API_ROUTES.GITHUB_BRANCHES(owner, name),
  );
  return response.data;
}

export function useBranches(owner: string, name: string) {
  return useQuery({
    queryKey: QUERY_KEYS.BRANCHES(owner, name),
    queryFn: () => fetchBranches(owner, name),
    enabled: !!owner && !!name,
    staleTime: BRANCH_CACHE_STALE_TIME_MS,
  });
}
