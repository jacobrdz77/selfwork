import useUserColor from "@/hooks/useUserColor";
import { UserColor } from "@/types/types";
import React from "react";
import { getInitials } from "./UserCard";

const UserSidebarCard = ({
  name,
  workspaceName,
  iconColor,
}: {
  name: string;
  workspaceName: string;
  iconColor: UserColor;
}) => {
  const color = useUserColor(iconColor);
  return (
    <div className="sidebar__user-container">
      <div className="sidebar__user">
        <div className={`sidebar__user-icon sidebar__user-icon--${color}`}>
          {getInitials(name)}
        </div>
        <span className="sidebar__user-name">{name}</span>
        <div className="sidebar__tooltip">
          <span>{name}</span>
          <span>{workspaceName}</span>
        </div>
      </div>
    </div>
  );
};

export default UserSidebarCard;
