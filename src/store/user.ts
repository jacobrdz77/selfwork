import create from "zustand";

interface UserState {
  userId: string | null;
  workspaceId: string;
}

interface Action {
  setUserId: (id: UserState["userId"]) => void;
}

export const MOCK_USER = {
  id: "cldgszkdc0000gp0k9acjl0al",
  name: "Jacob",
  email: "jacob@jacob.com",
};

export const useUserStore = create<UserState & Action>((set) => ({
  userId: MOCK_USER.id,
  workspaceId: "cldgv39c90003gp7o7nzib01g",
  setUserId: (id) => set(() => ({ userId: id })),
}));
