import React from "react";
import { getInitials } from "@/utils/user";
import { User } from "@prisma/client";
import useMenu from "@/hooks/useMenu";
import { formatDistance } from "date-fns";
import Link from "next/link";

const SketchCard = ({
  id,
  name,
  lastModified,
}: {
  id: string;
  name: string;
  lastModified: Date | null;
}) => {
  // Todo: Create function that counts the day since the lastModifiedDate

  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  return (
    <Link href={`/sketch/${id}`}>
      <div className="sketch-card">
        <div className="name">{name}</div>
        <div className="modified">
          {formatDistance(new Date(lastModified!), new Date(), {
            addSuffix: true,
          })}
        </div>

        {/* Edit button */}
        <div className="sketch-card__edit">
          {" "}
          <div
            className={`sketch__more-btn-container  ${
              isMenuOpen ? "active" : ""
            }`}
          >
            <div
              ref={btnRef}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="menu-button"
              role="button"
            >
              <svg className="more-icon" viewBox="0 0 16 16">
                <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
              </svg>
            </div>
            <div
              className={`menu ${isMenuOpen ? "active" : ""}`}
              ref={menuRef}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <button
                className="item"
                onClick={() => {
                  console.log("DElete sketch");
                  setIsMenuOpen(false);
                }}
              >
                Delete sketch
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SketchCard;
