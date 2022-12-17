import create from "zustand";

interface UserState {
  userId: string | null;
}

export const useUserStore = create<UserState>((set) => ({
  userId: "clbolq9iv0000gpsweit67ozd",
  setUserId: (id: string) => set({ userId: id }),
}));
