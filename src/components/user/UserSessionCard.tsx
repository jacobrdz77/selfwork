/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getInitials } from "@/utils/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserSessionCard: React.FC<{ name: string; id: string }> = ({
  name,
  id,
}) => {
  const session = useSession();
  return (
    <Link href={`/profile/${id}`} className="avatar">
      {session.data?.user?.image ? (
        <img className="avatar__image" src={session.data?.user?.image!} />
      ) : (
        <div className={`avatar__icon`}>{getInitials(name)}</div>
      )}
      <span className="avatar__name">{name}</span>
    </Link>
  );
};

export default UserSessionCard;
