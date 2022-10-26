import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../store/user";
import { User } from "@prisma/client";

const getUser = async (userId: string) => {
  const user = await axios.get(`/api/user`, {
    data: {
      userId,
    },
  });
  return (await user.data) as User;
};
export const useUser = (onSuccess?: () => void) => {
  const userId = useAtomValue(userIdAtom);
  const { data: user } = useQuery(["user", userId], () => getUser(userId), {
    onSuccess: onSuccess,
  });
  return user;
};
