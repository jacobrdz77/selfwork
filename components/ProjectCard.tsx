import React, { Ref, useRef, useState, useEffect } from "react";
import { useOnClickOutside } from "../src/hooks/useOnClickOutside";
import ProjectEditModal from "./ProjectEditModal";

interface ProjectCardProps {
  title: string;
  description: string | null;
  projectId: string;
  clientName: string;
  clientId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  projectId,
  clientName,
  clientId,
}) => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [top, setTop] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const projectCardRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    function getCardPosition(ref: React.RefObject<HTMLDivElement>) {
      let leftOfDiv = ref.current?.getBoundingClientRect().x;
      console.log(leftOfDiv);

      let topOfDiv = ref.current?.getBoundingClientRect().y;
      const top = topOfDiv!;
      const left = leftOfDiv!;

      return {
        top,
        left,
      };
    }

    const { top, left } = getCardPosition(projectCardRef);
    setLeft(left);
    setTop(top);
    console.log(top, left);
  }, []);

  useOnClickOutside(modalRef, () => {
    setIsModelOpen(false);
  });

  return (
    <div
      ref={projectCardRef}
      className="relative flex flex-col w-[260px] h-[320px] border"
    >
      {/* Header */}
      <div className="flex justify-between p-[15px] bg-header border-b-[1px]">
        <a
          href={`/projects/${projectId}`}
          className="font-semibold hover:underline"
        >
          {title}
        </a>
        <button
          onClick={() => setIsModelOpen(!isModelOpen)}
          className={`${
            isModelOpen ? "hidden opacity-0 transition-opacity " : ""
          } text-[18px] select-none hover:cursor-pointer`}
        >
          ...
        </button>
        {isModelOpen && (
          <ProjectEditModal
            top={top!}
            left={left!}
            ref={modalRef}
            isModelOpen={isModelOpen}
          />
        )}
      </div>

      {/* Info */}
      <div className="grow p-[15px] flex flex-col">
        {/* Tags */}
        <div></div>
        {/* Description */}
        <div className="text-ellipsis overflow-hidden grow text-gray-700 text-[14px]">
          {description}
        </div>
        {/* Footer */}
        <div className="">
          <div className="flex align-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <a href={`/clients/${clientId}`} className="ml-2 hover:underline">
              {clientName}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
