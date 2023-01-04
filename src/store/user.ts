import create from "zustand";

interface UserState {
  userId: string | null;
}

interface Action {
  setUserId: (id: UserState["userId"]) => void;
}

export const useUserStore = create<UserState & Action>((set) => ({
  userId: "clcfpjw9z0000gp7k2nldac6q",
  setUserId: (id) => set(() => ({ userId: id })),
}));
