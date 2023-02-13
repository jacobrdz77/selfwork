import { create } from "zustand";

interface TableWidthState {
  nameWidth: number;
  assigneeWidth: number;
  dueDateWidth: number;
  statusWidth: number;
  priorityWidth: number;
}

interface Action {
  actions: {
    setNameWidth: (width: number) => void;
    setAssigneeWidth: (width: number) => void;
    setDueDateWidth: (width: number) => void;
    setStatusWidth: (width: number) => void;
    setPriorityWidth: (width: number) => void;
  };
}
export const useTableWidthStore = create<TableWidthState & Action>((set) => ({
  nameWidth: 400,
  assigneeWidth: 120,
  dueDateWidth: 120,
  statusWidth: 120,
  priorityWidth: 120,
  actions: {
    setNameWidth: (width: number) => set({ nameWidth: width }),
    setAssigneeWidth: (width: number) => set({ assigneeWidth: width }),
    setDueDateWidth: (width: number) => set({ dueDateWidth: width }),
    setStatusWidth: (width: number) => set({ statusWidth: width }),
    setPriorityWidth: (width: number) => set({ priorityWidth: width }),
  },
}));
