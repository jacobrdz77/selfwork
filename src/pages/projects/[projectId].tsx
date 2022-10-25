import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { getOneProject } from "../../lib/projectsFunctions";
import Header from "../../components/UI/Header";
import { Project } from "@prisma/client";
import LoadingProjectPage from "../../components/Loading/LoadingProjectPage";

const ProjectDetailPage = () => {
  const router = useRouter();
  const id = router.query.projectId as string;
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery(["oneProject", id], getOneProject(id), {});

  return (
    <div className="h-full py-5 px-7">
      <Header title={project?.name} buttonText="Edit Project" isButton={true} />
      <hr className="mt-4" />
      {/* Filter buttons */}
      <div className="mt-10"></div>
    </div>
  );
};

export default ProjectDetailPage;
