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
      <svg
        stroke="currentColor"
        className="link__icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
          stroke="#1F2223"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11.0002C13.5705 10.4261 13.0226 9.95104 12.3934 9.60729C11.7642 9.26353 11.0684 9.05911 10.3533 9.00789C9.63816 8.95667 8.92037 9.05986 8.24861 9.31044C7.57685 9.56103 6.96684 9.95316 6.45996 10.4602L3.45996 13.4602C2.54917 14.4032 2.04519 15.6662 2.05659 16.9772C2.06798 18.2882 2.59382 19.5423 3.52086 20.4693C4.4479 21.3964 5.70197 21.9222 7.01295 21.9336C8.32393 21.945 9.58694 21.441 10.53 20.5302L12.24 18.8202"
          stroke="#1F2223"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
