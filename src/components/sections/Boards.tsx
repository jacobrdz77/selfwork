import React, { useState } from "react";
import { SectionWithTasks } from "@/types/types";
import AddProjectSectionButton from "./AddProjectSectionButton";
import AddUserSectionButton from "./AddUserSectionButton";
import { SortableContext } from "@dnd-kit/sortable";
import OneBoard, { OneBoardOverlay } from "./OneBoard";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import useDndContextForSorting from "@/hooks/useDndContextForSorting";

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
  userAssignedSection,
  isProject,
  projectId,
}: Props) => {
  const { sensors, handleDragEnd, handleDragStart, activeId } =
    useDndContextForSorting("sections", sections!, setSections);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="boards">
        <SortableContext items={sections ? sections : []}>
          {/* This is only for My Tasks page */}
          {/* {userAssignedSection && (
          <OneBoard
            isUserAssignedSection={true}
            key={userAssignedSection.id}
            tasks={userAssignedSection.tasks}
            title={userAssignedSection.name}
            section={userAssignedSection}
            // moveBoard={moveBoard}v
          />
        )} */}
          {sections?.map((section) => (
            <OneBoard key={section.id} section={section} />
          ))}

          {/* This makes it when you start dragging a Board, it creates a copy using the child */}
          <DragOverlay dropAnimation={{ duration: 0 }}>
            {activeId && sections ? (
              <OneBoardOverlay
                key={activeId}
                section={sections.find((section) => section.id === activeId)!}
              />
            ) : null}
          </DragOverlay>
        </SortableContext>
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
