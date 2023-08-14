import { useSession } from "next-auth/react";
import { useUserStore } from "store/user";

export const useUserState = () => {
  const userSession = useSession();
  const workspaceId = useUserStore.subscribe((state) => state.workspaceId);
};
