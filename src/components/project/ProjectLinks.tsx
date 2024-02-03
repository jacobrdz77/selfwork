import React from "react";
import ProjectLink from "./ProjectLink";
import { InviteLink } from "@prisma/client";

const ProjectLinks = ({ links }: { links: InviteLink[] }) => {
  return (
    <div className="links">
      {links?.map((link) => (
        <ProjectLink link={link} key={link.id} />
      ))}
    </div>
  );
};

export default ProjectLinks;
