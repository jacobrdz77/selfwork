import SectionListView, { DraggingSectionListView } from "./SectionListView";
import AddProjectSectionButton from "./AddProjectSectionButton";
import { SectionWithTasks } from "@/types/types";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import useDndContextForSorting from "@/hooks/useDndContextForSorting";
import AddUserSectionButton from "./AddUserSectionButton";

interface Props {
  sections: SectionWithTasks[];
  setSections: React.Dispatch<React.SetStateAction<SectionWithTasks[]>>;
  projectId?: string;
}

const SectionsList = ({ sections, setSections, projectId }: Props) => {
  const { sensors, handleDragEnd, handleDragStart, activeIndex } =
    useDndContextForSorting("sections", sections!, setSections);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="list-sections">
        <SortableContext
          items={sections ? sections : []}
          strategy={verticalListSortingStrategy}
        >
          {sections?.map((section) => (
            <SectionListView key={section.id} section={section} />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeIndex ? (
            <DraggingSectionListView
              key={activeIndex}
              sectionName={sections[activeIndex].name}
            />
          ) : null}
        </DragOverlay>

        <div className="add-btn">
          {projectId ? (
            <AddProjectSectionButton
              projectId={projectId!}
              sectionsLength={sections ? sections.length : 0}
            />
          ) : (
            <AddUserSectionButton
              sectionsLength={sections ? sections.length : 0}
            />
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default SectionsList;
