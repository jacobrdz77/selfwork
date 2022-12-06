import { Project } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React, { Ref, useRef, useState, useEffect } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { getClients } from "../lib/clientFunctions";
import { deleteProject } from "../lib/projectsFunctions";
import { userIdAtom } from "../store/user";
import { trpc } from "../utils/trpc";
import EditProjectModal from "./EditProjectModal";
import { upperCaseName } from "./Layout/NavBar";
// import EditProjectModal from "./EditProjectModal";
import ProjectEditPopup from "./ProjectEditPopup";

type ProjectCardProps = {
  projectData: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const projectCardRef = useRef(null);
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    setIsPopupOpen(false);
  });
  const queryClient = useQueryClient();

  const { mutate: deleteProject } = trpc.project.deleteOne.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const userId = useAtomValue(userIdAtom);
  const { data: clients } = trpc.client.getAll.useQuery();

  return (
    <>
      {/* <EditProjectModal
        clients={clients}
        isOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        projectData={projectData}
      /> */}
      <div
        ref={projectCardRef}
        className="relative flex flex-col w-[260px] h-[320px] px-[20px]
      py-[25px] rounded-lg shadow-sm border-[1px]"
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
              deleteProjectHandler={() => {
                window.confirm("Are you sure you want to delete this project?");
                deleteProject({ projectId: projectData.id });
              }}
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
            {projectData.description?.trim().length === 0 && (
              <span className="text-gray-400">no description</span>
            )}
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
                {upperCaseName(projectData.clientName)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;