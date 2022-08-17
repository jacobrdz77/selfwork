import { Project } from "@prisma/client";
import React, { Ref, useRef, useState, useEffect } from "react";
import { useOnClickOutside } from "../src/hooks/useOnClickOutside";
import EditProjectModal from "./EditProjectModal";
import ProjectEditPopup from "./ProjectEditPopup";

type ProjectCardProps = {
  projectData: ProjectForProjectCard;
};

type ProjectForProjectCard = Project & {
  client: {
    name: string;
  };
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const projectCardRef = useRef(null);
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    setIsPopupOpen(false);
  });

  return (
    <>
      <EditProjectModal
        isOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        projectData={projectData}
        closeHandler={() => {
          // dispatch(reset());
          setIsEditModalOpen(false);
        }}
      />
      <div
        ref={projectCardRef}
        className="relative flex flex-col w-[260px] h-[320px] px-[20px]
      py-[25px] rounded-lg shadow-md border-[1px]"
      >
        {/* Header */}
        <div className="flex justify-between text-lg">
          <a
            href={`/projects/${projectData.id}`}
            className="font-semibold hover:underline"
          >
            {projectData.name}
          </a>
          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className={`${
              isPopupOpen ? "hidden opacity-0 transition-opacity " : ""
            } text-[18px] select-none hover:cursor-pointer`}
          >
            ...
          </button>
          {isPopupOpen && (
            <ProjectEditPopup
              ref={modalRef}
              isPopupOpen={isPopupOpen}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          )}
        </div>

        {/* Info */}
        <div className="grow flex flex-col mt-4">
          {/* Description */}
          <div className="text-ellipsis overflow-hidden grow text-gray-700 text-[14px]">
            {projectData.description}
          </div>
          {/* Footer */}
          {/* //! Fix footer layout styling */}
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
              <a
                href={`/clients/${projectData.clientId}`}
                className="ml-2 hover:underline text-ellipsis"
              >
                {projectData.client.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
