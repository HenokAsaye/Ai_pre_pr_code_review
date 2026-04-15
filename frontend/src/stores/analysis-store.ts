import { create } from "zustand";

interface SelectedRepo {
  owner: string;
  name: string;
  fullName: string;
}

interface AnalysisState {
  selectedRepo: SelectedRepo | null;
  baseBranch: string;
  headBranch: string;
  taskId: string | null;
  setSelectedRepo: (repo: SelectedRepo) => void;
  setBaseBranch: (branch: string) => void;
  setHeadBranch: (branch: string) => void;
  setTaskId: (taskId: string) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  selectedRepo: null,
  baseBranch: "",
  headBranch: "",
  taskId: null,
  setSelectedRepo: (repo) => set({ selectedRepo: repo }),
  setBaseBranch: (branch) => set({ baseBranch: branch }),
  setHeadBranch: (branch) => set({ headBranch: branch }),
  setTaskId: (taskId) => set({ taskId }),
  reset: () =>
    set({
      selectedRepo: null,
      baseBranch: "",
      headBranch: "",
      taskId: null,
    }),
}));
