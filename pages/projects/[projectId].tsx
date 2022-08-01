import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { getOneProject } from "../../src/lib/projectsFunctions";
import Header from "../../components/UI/Header";
import { Project } from "@prisma/client";
import LoadingProjectPage from "../../components/UI/Loading/LoadingProjectPage";

const ProjectDetailPage = () => {
  const router = useRouter();
  const queries = router.query;
  const id: string = queries.id as string;
  const { data, isLoading } = useQuery(
    ["getProject"],
    () => getOneProject(id),
    {
      onSuccess: (data: Project) => {
        setProject(data);
      },
    }
  );
  const [project, setProject] = useState<Project | null>(null);

  if (isLoading) {
    return (
      <>
        <LoadingProjectPage />
      </>
    );
  }

  return (
    <div className="h-full py-5 px-7">
      <header>
        <h1 className="text-3xl">{project?.name}</h1>
      </header>
      <hr className="mt-4" />
      {/* Filter buttons */}

      <div className="mt-10"></div>
    </div>
  );
};

export default ProjectDetailPage;
