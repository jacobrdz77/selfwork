import { useDeleteLink } from "@/hooks/LinkHook";
import useMenu from "@/hooks/useMenu";
import { Link as LinkType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

const ProjectLink = ({ link }: { link: LinkType }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: deleteLink } = useDeleteLink();

  //   const urlOfLink = new URL(link.url);

  return (
    <Link href={link.url} target="_blank" className="link">
      <svg stroke="currentColor" className="link__icon">
        <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>

      <div className="text">
        <span className="link__name">{link.name}</span>
        <span className="link__url">{link.url}</span>
      </div>

      <div className="link__button-container">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen((state) => !state);
          }}
          ref={btnRef}
          className="link__button"
        >
          <svg className="link__button-icon " viewBox="0 0 6.3499999 6.3500002">
            <g id="layer1" transform="translate(0 -290.65)">
              <path d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z"></path>
            </g>
          </svg>
        </button>
        <div
          ref={menuRef}
          className={`link__menu ${isMenuOpen ? "link__menu--active" : ""}`}
        >
          <div
            onClick={(e) => {
              e.preventDefault();

              deleteLink({ linkId: link.id, projectId: link.projectId });
              toast.success(`Deleted ${link.name}`);
            }}
            className="link__menu-item"
          >
            Delete link
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectLink;
