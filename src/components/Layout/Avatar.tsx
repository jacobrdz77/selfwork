import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";

const Avatar: React.FC = () => {
  const user = useUser(() => {
    setInitials(getInitials());
  });
  const name = user?.name as string;
  const [initials, setInitials] = useState("");
  const getInitials = () => {
    const fullName = name.split(" ");
    const firstName = fullName[0];
    const lastName = fullName[1];
    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <div className="flex mb-3 py-2.5 px-5 hover:bg-buttonHover rounded-[15px] bg-button">
      <Link href="/profile">
        <div className="flex space-x-3 align-middle">
          <span>{initials}</span>
          <p>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Avatar;
