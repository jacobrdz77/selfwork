import { useEffect, useState } from "react";
import MyTaskNav from "@/components/header/MyTaskNav";
import PageHeader from "@/components/header/PageHeader";
import Boards from "@/components/sections/Boards";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import React from "react";
import useSortedSections from "@/hooks/useSortedSections";
import { useSession } from "next-auth/react";

const MyTaskBoardPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();
  const { sortedSections, setSortedSections } = useSortedSections(
    userSections ? userSections : []
  );

  const session = useSession();
  console.log("Session: ", session);
  return (
    <>
      <PageHeader title="My Tasks">
        <MyTaskNav />
      </PageHeader>
      <div className="page tasks-page tasks-page__board">
        {status === "loading" && <div>Loading...</div>}
        {status === "success" && (
          <div className="boards-container">
            <Boards
              userAssignedSection={userAssignedTasksSection}
              sections={sortedSections}
              setSections={setSortedSections}
              isProject={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyTaskBoardPage;
