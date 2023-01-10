import create from "zustand";

interface UserState {
  userId: string | null;
}

interface Action {
  setUserId: (id: UserState["userId"]) => void;
}

export const useUserStore = create<UserState & Action>((set) => ({
  userId: "clco0iv8d0000gpq01aki4z8m",
  setUserId: (id) => set(() => ({ userId: id })),
}));
