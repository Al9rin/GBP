import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type UserProgress } from "@shared/schema";

// Helper to construct URL - simplistic version since we are client-side only here
// In a real app, this would match the shared/routes buildUrl exactly
const PROGRESS_URL = api.progress.get.path;

export function useProgress() {
  return useQuery({
    queryKey: [PROGRESS_URL],
    queryFn: async () => {
      const res = await fetch(PROGRESS_URL, { credentials: "include" });
      if (res.status === 401) return []; // Handle unauthorized gracefully
      if (!res.ok) throw new Error("Failed to fetch progress");
      return api.progress.get.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ stepId, status }: { stepId: number; status: "completed" | "skipped" | "pending" }) => {
      // Validate using the schema input definition if possible, 
      // but for client-side simply calling the endpoint is enough
      
      const res = await fetch(api.progress.update.path, {
        method: api.progress.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId, status }),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to update progress");
      return api.progress.update.responses[200].parse(await res.json());
    },
    // Optimistic update or invalidation
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<UserProgress[]>([PROGRESS_URL], (old) => {
        if (!old) return [updatedItem];
        const index = old.findIndex(p => p.stepId === updatedItem.stepId);
        if (index === -1) return [...old, updatedItem];
        return [...old.slice(0, index), updatedItem, ...old.slice(index + 1)];
      });
    },
  });
}
