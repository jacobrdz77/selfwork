import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string;
  workspaceId: string;
  workspaceName: string;
}

interface Action {
  setUserId: (id: string) => void;
  setWorkspace: (id: string, name: string) => void;
}

export const MOCK_USER = {
  id: "al814zcy86074hloymogrg1mv",
  name: "Jacob",
  email: "jacob@jacob.com",
  workspaceId: "opdclt74u9913gpecetnyigta",
  workspaceName: "Jacob's Workspace",
};

// Todo: Get workspaceId from User.
// Get user from session
// Once session is fetched, the store is set and everything is updated.

export const userStore = createStore<UserState & Action>((set) => ({
  userId: "al814zcy86074hloymogrg1mv",
  workspaceId: "opdclt74u9913gpecetnyigta",
  workspaceName: "Jacob's Workspace",
  setUserId: (id: string) => set(() => ({ userId: id })),
  setWorkspace: (id, name) =>
    set(() => ({ workspaceId: id, workspaceName: name })),
}));

export const useUserStore = create<UserState & Action>((set) => ({
  userId: MOCK_USER.id,
  workspaceId: "opdclt74u9913gpecetnyigta",
  workspaceName: "Jacob's Workspace",
  setUserId: (id) => set(() => ({ userId: id })),
  setWorkspace: (id, name) =>
    set(() => ({ workspaceId: id, workspaceName: name })),
}));

type ModalStore = {
  isAddTaskOpen: boolean;
  setIsAddTaskOpen: (boolean: boolean) => void;
  isAddProjectModalOpen: boolean;
  setIsAddProjectModalOpen: (boolean: boolean) => void;
  isTaskDetailOpen: boolean;
  setIsTaskDetailOpen: (boolean: boolean) => void;
  isEditProjectModalOpen: boolean;
  setIsEditProjectModalOpen: (boolean: boolean) => void;
  isClientModalOpen: boolean;
  setIsClientModalOpen: (boolean: boolean) => void;
  isInviteMemberModalOpen: boolean;
  setIsInviteMemberModalOpen: (boolean: boolean) => void;
  taskId: string;
};

export const useModalStore = create<ModalStore>((set) => ({
  taskId: "",
  isAddTaskOpen: false,
  setIsAddTaskOpen: (boolean: boolean) => set({ isAddTaskOpen: boolean }),
  isAddProjectModalOpen: false,
  setIsAddProjectModalOpen: (boolean: boolean) =>
    set({ isAddProjectModalOpen: boolean }),
  isTaskDetailOpen: false,
  setIsTaskDetailOpen: (boolean: boolean) => set({ isTaskDetailOpen: boolean }),
  isEditProjectModalOpen: false,
  setIsEditProjectModalOpen: (boolean: boolean) =>
    set({ isEditProjectModalOpen: boolean }),
  isClientModalOpen: false,
  setIsClientModalOpen: (boolean: boolean) =>
    set({ isClientModalOpen: boolean }),
  isInviteMemberModalOpen: false,
  setIsInviteMemberModalOpen: (boolean: boolean) =>
    set({ isInviteMemberModalOpen: boolean }),
}));
