import useUserColor from "@/hooks/useUserColor";
import { UserColor } from "@/types/types";
import { Color } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const getInitials = (name: string) => {
  const fullName = name.split(" ");
  if (!name) return;
  const firstName = fullName[0];
  const lastName = fullName[1];
  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
};
const UserCard: React.FC<{ name: string; id: string; color?: UserColor }> = ({
  name,
  id,
  color,
}) => {
  const iconColor = useUserColor(color!);
  return (
    <Link href={`/profile/${id}`} className="avatar">
      <div className={`avatar__icon avatar__icon--${iconColor}`}>
        {getInitials(name)}
      </div>
      <span className="avatar__name">{name}</span>
    </Link>
  );
};

export default UserCard;
