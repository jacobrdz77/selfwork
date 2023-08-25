import { useEffect, useState } from "react";
import MyTaskNav from "@/components/header/MyTaskNav";
import PageHeader from "@/components/header/PageHeader";
import Boards from "@/components/sections/Boards";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import React from "react";
import useSortedSections from "@/hooks/useSortedSections";
import { useSession } from "next-auth/react";
import LoadingBoardViewPage from "@/components/loading/LoadingBoardViewPage";
import LoadingHeader from "@/components/loading/LoadingHeader";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";

const MyTaskBoardPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();
  const { sortedSections, setSortedSections } = useSortedSections(
    userSections ? userSections : []
  );

  if (status === "loading") {
    return (
      <>
        <LoadingHeader />
        <div className="page project-page__board project-page__board--loading">
          <div className="loading-boards">
            <div className="board">
              <LoadingSkeleton />
            </div>
            <div className="board">
              <LoadingSkeleton />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (status === "error") {
    return (
      <div>
        <h1>Error</h1>
        <p>Try to refresh the page.</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="My Tasks">
        <MyTaskNav />
      </PageHeader>
      <div className="page tasks-page tasks-page__board">
        {/* <div className="boards-container"> */}
        <Boards
          userAssignedSection={userAssignedTasksSection}
          sections={sortedSections}
          setSections={setSortedSections}
          isProject={false}
        />
        {/* </div> */}
      </div>
    </>
  );
};

export default MyTaskBoardPage;
