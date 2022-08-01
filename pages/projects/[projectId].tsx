import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/UI/Header";

const ProjectDetailPage = () => {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        //Fetch data from API endpoint
        // setTitle();
      } catch (error) {
        //Handle Error
      }
    }
  }, []);

  return <>{/* <Header title={} /> */}</>;
};

export default ProjectDetailPage;
