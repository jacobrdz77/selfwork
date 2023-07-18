import Button from "@/components/UI/Button";
import MyTaskNav from "@/components/header/MyTaskNav";
import PageHeader from "@/components/header/PageHeader";
import Boards from "@/components/sections/Boards";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import React from "react";

const MyTaskBoardPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();
  return (
    <>
      <PageHeader title="My Tasks">
        <MyTaskNav />
      </PageHeader>
      <div className="page tasks-page tasks-page__board">
        {status === "loading" && <div>Loading...</div>}
        {status === "success" && (
          <div className="flex">
            <Boards userSections={[...userSections!]} />
          </div>
        )}
      </div>
    </>
  );
};

export default MyTaskBoardPage;
