import { Dispatch, SetStateAction, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SectionWithTasks } from "@/types/types";
import { useUpdateSection, useUpdateSectionOrder } from "./SectionHooks";

const useDndContextForSections = <T>(
  items: SectionWithTasks[],
  setItems: Dispatch<SetStateAction<SectionWithTasks[]>>
) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { mutate } = useUpdateSectionOrder();

  // These senors is to be able to click on the buttons without starting a drag event.
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  function handleDragStart(e: any) {
    const activeIndex = items?.findIndex((items) => items.id === e.active.id);
    setActiveIndex(activeIndex!);
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveIndex(null);
    const { active, over } = e;
    if (!over) return;
    if (active.id !== over.id) {
      setItems((item) => {
        const oldIndex = item.findIndex((item) => item.id === active.id);
        const newIndex = item.findIndex((item) => item.id === over.id);
        const newitem = arrayMove(item!, oldIndex, newIndex);
        return newitem;
      });

      // Todo: Send a request to API to update order of the two item that switched places.
      // Get both current orders to update them in the backend
      const currentSectionOrder = items.findIndex(
        (item) => item.id === active.id!
      )!;
      const secondSectionOrder = items.findIndex(
        (item) => item.id === over.id
      )!;

      console.log("curr: ", currentSectionOrder);
      console.log("second: ", secondSectionOrder);

      mutate({
        sectionData: [
          { currentSectionId: active.id as string, currentSectionOrder },
          { secondSectionId: over.id as string, secondSectionOrder },
        ],
      });
    }
  }

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    activeIndex,
  };
};

export default useDndContextForSections;
