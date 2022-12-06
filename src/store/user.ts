import create from "zustand";

interface UserState {
  userId: string | null;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id: string) => set({ userId: id }),
}));
