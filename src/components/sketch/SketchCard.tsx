import React, { useState } from "react";
import useMenu from "@/hooks/useMenu";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { getInitials } from "@/utils/user";
import { useDeleteSketch } from "@/hooks/SketchHooks";
import ToDeleteSketchModal from "./ToDeleteSketchModal";
import { useRouter } from "next/router";

const SketchCard = ({
  id,
  name,
  author,
  createdAt,
  updatedAt,
}: {
  id: string;
  name: string;
  updatedAt: Date | string;
  createdAt: Date | string;
  author: {
    name: string;
    image?: string;
  };
}) => {
  const router = useRouter();
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: deleteSketch } = useDeleteSketch(id);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteSketch = async () => {
    deleteSketch();
  };

  return (
    <>
      <Link href={`/sketch/${id}`}>
        <div className="sketch-card">
          <div className="name">{name}</div>
          <div className="edited">
            {formatDistanceToNow(new Date(updatedAt))}
          </div>
          <div className="created">
            {formatDistanceToNow(new Date(createdAt), {})}
          </div>
          <div className="sketch-card__author">
            {author.image ? (
              <Image
                className="sketch-card__author-image"
                src={author.image}
                alt="User image"
              />
            ) : (
              <div className={`sketch-card__author-icon`}>
                {getInitials(author.name)}
              </div>
            )}

            <span className="sketch-card__author-name">{author.name}</span>
          </div>

          {/* Edit button */}
          <div className="sketch-card__edit">
            <div
              ref={btnRef}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              className={`sketch-card__more-btn-container  ${
                isMenuOpen ? "active" : ""
              }`}
            >
              <div className="menu-button" role="button">
                <svg className="more-icon" viewBox="0 0 16 16">
                  <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
                </svg>
              </div>
              <div
                className={`menu ${isMenuOpen ? "menu--active" : ""}`}
                ref={menuRef}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <button
                  className="item item--delete"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
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
      <ToDeleteSketchModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        deleteFunc={handleDeleteSketch}
        isDark={false}
      />
    </>
  );
};

export default SketchCard;
