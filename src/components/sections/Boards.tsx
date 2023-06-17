import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import AddSectionButton from "./AddSectionButton";
import Board from "../task/Board";
import { SectionWithTasks } from "@/types/types";

const Boards = ({
  userSections,
}: {
  userSections: SectionWithTasks[] | undefined;
}) => {
  const [boards, setBoards] = useState(userSections);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: "Board",
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // ! Finish this function
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setBoards((prevBoards) => {
      return [hoverIndex, 0, ...prevBoards];
    });

    //   update(prevCards, {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, prevCards[dragIndex] as Item],
    //     ],
    //   })
  }, []);

  return (
    <div className="boards" ref={drop}>
      {userSections?.map((section) => (
        <Board
          key={section.id}
          tasks={section.tasks}
          title={section.name}
          sectionId={section.id}
        />
      ))}
      {canDrop ? "Release here" : "Drag a box here"}
      <div className="add-btn">
        <AddSectionButton />
      </div>
    </div>
  );
};

export default Boards;
