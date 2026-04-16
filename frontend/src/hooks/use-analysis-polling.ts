import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import apiClient from "@/lib/api-client";
import { API_ROUTES, QUERY_KEYS, ANALYSIS_POLL_INTERVAL_MS } from "@/constants";
import type { AnalysisTask } from "@/types/analysis";

async function fetchAnalysisStatus(
  taskId: string,
  accessToken: string
): Promise<AnalysisTask> {
  const response = await apiClient.get<AnalysisTask>(
    API_ROUTES.ANALYSIS_STATUS(taskId),
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
}

export function useAnalysisPolling(taskId: string | null) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.ANALYSIS(taskId ?? ""),
    queryFn: () => fetchAnalysisStatus(taskId!, session!.accessToken),
    enabled: !!taskId && !!session?.accessToken,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "completed" || status === "failed") return false;
      return ANALYSIS_POLL_INTERVAL_MS;
    },
    staleTime: 0,
  });
}
