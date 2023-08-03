import Link from "next/link";
import React from "react";

export const getInitials = (name: string): string => {
  const fullName = name.split(" ");
  if (fullName.length === 0) return "";
  if (fullName.length <= 1) {
    const firstName = fullName[0];
    return `${firstName[0].toUpperCase()}`;
  }
  const firstName = fullName[0];
  const lastName = fullName[fullName.length - 1];
  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
};
const UserCard: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  return (
    <Link href={`/profile/${id}`} className="avatar">
      <div className={`avatar__icon`}>{getInitials(name)}</div>
      <span className="avatar__name">{name}</span>
    </Link>
  );
};

export default UserCard;
