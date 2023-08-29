import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export const getUserId = async (context: NextPageContext) => {
  const session = await getSession();
  return session?.user?.id;
};

export function getFirstLetter(name: string): string {
  if (!name) return "";

  if (name.length <= 1) {
    return `${name[0].toUpperCase()}`;
  } else {
    return "";
  }
}
export function getInitials(name: string): string {
  if (!name) return "";
  const fullName = name.split(" ");
  if (fullName.length === 0) return "";
  if (fullName.length <= 1) {
    const firstName = fullName[0];
    return `${firstName[0].toUpperCase()}`;
  }
  const firstName = fullName[0];
  const lastName = fullName[fullName.length - 1];
  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
}
