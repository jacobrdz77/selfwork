import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string | null;
  workspaceId: string;
}

interface Action {
  setUserId: (id: UserState["userId"]) => void;
}

export const MOCK_USER = {
  id: "al814zcy86074hloymogrg1mv",
  name: "Jacob",
  email: "jacob@jacob.com",
};

export const useUserStore = create<UserState & Action>((set) => ({
  userId: MOCK_USER.id,
  workspaceId: "opdclt74u9913gpecetnyigta",
  setUserId: (id) => set(() => ({ userId: id })),
}));

type ModalStore = {
  isAddTaskOpen: boolean;
  setIsAddTaskOpen: (boolean: boolean) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isAddTaskOpen: true,
  setIsAddTaskOpen: (boolean: boolean) => set({ isAddTaskOpen: boolean }),
}));
