import { useState, useEffect } from "react";
import { Color } from "@prisma/client";
import Link from "next/link";
import { useColor } from "@/hooks/useColor";

const SidebarProject = ({
  name,
  color,
  id,
}: {
  name: string;
  color: Color;
  id: string;
}) => {
  const projectColor = useColor(color);

  return (
    <Link href={`/projects/${id}/overview`} className="sidebar__project">
      <svg
        className={`sidebar__color-icon sidebar__color-icon--${projectColor}`}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
      </svg>
      <span className="sidebar__project-name">{name}</span>
      <div className="sidebar__tooltip">
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default SidebarProject;
