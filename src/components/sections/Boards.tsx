import useDndContextForSorting from "@/hooks/useDndContextForSorting";
import { SectionWithTasks } from "@/types/types";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import React from "react";
import AddProjectSectionButton from "./AddProjectSectionButton";
import AddUserSectionButton from "./AddUserSectionButton";
import OneBoard from "./OneBoard";

interface Props {
  sections: SectionWithTasks[] | undefined;
  setSections: React.Dispatch<React.SetStateAction<SectionWithTasks[]>>;
  userAssignedSection?: SectionWithTasks | undefined;
  isProject?: boolean;
  projectId?: string;
}

const Boards = ({
  sections,
  setSections,
  // userAssignedSection,
  isProject,
  projectId,
}: Props) => {
  // const [activeId, setActiveId] = useState<number | null>(null);
  const { sensors, handleDragEnd, handleDragStart } = useDndContextForSorting(
    "sections",
    sections!,
    setSections
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="boards">
        {/* This is only for My Tasks page */}
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
        <SortableContext items={sections ? sections : []}>
          {sections?.map((section) => (
            <OneBoard
              key={section.id}
              tasks={section.tasks}
              title={section.name}
              section={section}
            />
          ))}
        </SortableContext>

        {/* This makes it when you start dragging a Board, it still stays at the same position but it creates a copy of it and you're able to move it around. */}
        {/* <DragOverlay>
          {activeId ? (
            <OneBoard
              key={activeId}
              tasks={sections[activeId].tasks}
              title={sections[activeId].name}
              section={sections[activeId]}
            />
          ) : null}
        </DragOverlay> */}

        <div className="add-btn">
          {isProject ? (
            <AddProjectSectionButton
              projectId={projectId!}
              sectionsLength={Number(sections?.length)}
            />
          ) : (
            <AddUserSectionButton
              sectionsLength={Number(sections?.length) + 1}
            />
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default Boards;
