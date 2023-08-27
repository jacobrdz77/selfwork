import { Link as LinkType } from "@prisma/client";
import ProjectLink from "./ProjectLink";

const ProjectLinks = ({ links }: { links: LinkType[] }) => {
  return (
    <div className="links">
      {links?.map((link) => (
        <ProjectLink link={link} key={link.id} />
      ))}
    </div>
  );
};

export default ProjectLinks;
