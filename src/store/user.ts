import create from "zustand";

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
  workspaceId: "clde1v92g0003gpx0p79c6mig",
  setUserId: (id) => set(() => ({ userId: id })),
}));
