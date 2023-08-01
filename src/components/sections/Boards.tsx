import React, { useCallback, useRef, useState } from "react";
import update from "immutability-helper";
import Board from "../task/Board";
import { SectionWithTasks } from "@/types/types";
import AddProjectSectionButton from "./AddProjectSectionButton";
import AddUserSectionButton from "./AddUserSectionButton";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Boards = ({
  userSections,
  userAssignedSection,
  isProject,
  projectId,
}: {
  userSections: SectionWithTasks[] | undefined;
  userAssignedSection: SectionWithTasks | undefined;
  isProject?: boolean;
  projectId?: string;
}) => {
  const [boards, setBoards] = useState(userSections);

  const moveBoard = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log("MOOOVE");
    setBoards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <div className="boards">
      {/* {userSections?.map((section, index) => renderBoard(section, index))} */}
      {/* {userAssignedSection && (
        <Board
          isUserAssignedSection={true}
          key={userAssignedSection.id}
          tasks={userAssignedSection.tasks}
          title={userAssignedSection.name}
          section={userAssignedSection}
          moveBoard={moveBoard}
        />
      )} */}
      {boards?.map((section, i) => (
        <Board
          key={section.id}
          tasks={section.tasks}
          title={section.name}
          section={section}
          moveBoard={moveBoard}
        />
      ))}
      <div className="add-btn">
        {isProject ? (
          <AddProjectSectionButton
            projectId={projectId!}
            sectionsLength={Number(userSections?.length)}
          />
        ) : (
          <AddUserSectionButton
            sectionsLength={Number(userSections?.length) + 1}
          />
        )}
      </div>
    </div>
  );
};

export default Boards;
