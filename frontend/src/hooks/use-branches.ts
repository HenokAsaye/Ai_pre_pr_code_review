import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import apiClient from "@/lib/api-client";
import { API_ROUTES, QUERY_KEYS, BRANCH_CACHE_STALE_TIME_MS } from "@/constants";
import type { GitHubBranch } from "@/types/github";

async function fetchBranches(
  owner: string,
  name: string,
  accessToken: string
): Promise<GitHubBranch[]> {
  const response = await apiClient.get<GitHubBranch[]>(API_ROUTES.GITHUB_BRANCHES, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { repo: `${owner}/${name}` },
  });
  return response.data;
}

export function useBranches(owner: string, name: string) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.BRANCHES(owner, name),
    queryFn: () => fetchBranches(owner, name, session!.accessToken),
    enabled: !!session?.accessToken && !!owner && !!name,
    staleTime: BRANCH_CACHE_STALE_TIME_MS,
  });
}
