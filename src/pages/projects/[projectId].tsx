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
  const [project, setProject] = useState(null);
  useEffect(() => {
    const fetchForPage = async () => {
      const project = await getOneProject(id);
      console.log(project);
      console.log("id: ", id);
    };
  }, [id]);

  // const {
  //   data: project,
  //   isLoading,
  //   isError,
  // } = useQuery(
  //   ["oneProject", id],
  //   () => {
  //     return getOneProject(id);
  //   },
  //   {
  //     onSuccess: () => {
  //       console.log(project);
  //     },
  //   }
  // );

  return (
    <div className="h-full py-5 px-7">
      {/* <Header title={project!.name} buttonText="Edit Project" isButton={true} /> */}
      <hr className="mt-4" />
      {/* Filter buttons */}
      <div className="mt-10"></div>
    </div>
  );
};

export default ProjectDetailPage;
