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
    setBoards((prevBoards) =>
      prevBoards?.splice(hoverIndex, 1, prevBoards[dragIndex])
    );
  }, []);

  //   // The type (or types) to accept - strings or symbols
  //   accept: "Board",
  //   // Props to collect
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     handlerId: monitor.getHandlerId(),
  //     highlighted: monitor.canDrop(),
  //   }),
  //   hover(item, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;
  //     // Don't replace items with themselves
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }
  //     // Determine rectangle on screen
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     // Get vertical middle
  //     const hoverMiddleX =
  //       (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
  //     // Determine mouse position
  //     const clientOffset = monitor.getClientOffset();
  //     // Get pixels to the top
  //     const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;
  //     // Only perform the move when the mouse has crossed half of the items height
  //     // When dragging downwards, only move when the cursor is below 50%
  //     // When dragging upwards, only move when the cursor is above 50%
  //     // Dragging downwards
  //     if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
  //       return;
  //     }
  //     // Dragging upwards
  //     if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
  //       return;
  //     }
  //     // Time to actually perform the action
  //     moveCard(dragIndex, hoverIndex);
  //     // Note: we're mutating the monitor item here!
  //     // Generally it's better to avoid mutations,
  //     // but it's good here for the sake of performance
  //     // to avoid expensive index searches.
  //     item.index = hoverIndex;
  //   },
  // }));

  // const renderBoard = useCallback(
  //   (section: SectionWithTasks, index: number) => {
  //     return (
  //       <Board
  //         index={index}
  //         key={section.id}
  //         tasks={section.tasks}
  //         title={section.name}
  //         section={section}
  //         moveBoard={moveBoard}
  //       />
  //     );
  //   },
  //   []
  // );

  return (
    <div className="boards">
      {/* {userSections?.map((section, index) => renderBoard(section, index))} */}
      {userAssignedSection && (
        <Board
          isUserAssignedSection={true}
          key={userAssignedSection.id}
          tasks={userAssignedSection.tasks}
          title={userAssignedSection.name}
          section={userAssignedSection}
          moveBoard={moveBoard}
        />
      )}
      {userSections?.map((section) => (
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
