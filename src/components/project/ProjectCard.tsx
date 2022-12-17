import { Project } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState, useEffect } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { getClients } from "../../utils/clientFunctions";
import { deleteProject } from "../../utils/projectsFunctions";
import EditProjectModal from "./EditProjectModal";
import { upperCaseName } from "../../utils/uppercaseName";
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
  // const queryClient = useQueryClient();

  // const { mutate: deleteProject } = trpc.project.deleteOne.useMutation({
  //   onSuccess: () => {
  //     queryClient.invalidateQueries();
  //   },
  // });

  // const userId = useAtomValue(userIdAtom);
  // const { data: clients } = trpc.client.getAll.useQuery();

  return (
    <>
      {/* <EditProjectModal
        clients={clients}
        isOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        projectData={projectData}
      /> */}
      <div ref={projectCardRef} className="project-card">
        {/* Header */}
        <div className="project-card__header">
          <a
            className="project-card__name"
            href={`/projects/${projectData.id}`}
          >
            {projectData.name}
          </a>
          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className={`${
              isPopupOpen ? "project-card__header-btn--on" : ""
            } project-card__header-btn`}
          >
            ...
          </button>
          {isPopupOpen && (
            <ProjectEditPopup
              deleteProjectHandler={() => {
                window.confirm("Are you sure you want to delete this project?");
                deleteProject("userId");
              }}
              ref={modalRef}
              isPopupOpen={isPopupOpen}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          )}
        </div>
        {/* Info */}
        <div className=""></div>
      </div>
    </>
  );
};

export default ProjectCard;
