import {
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateSectionOrder } from "./SectionHooks";
import { useUpdateTaskOrder } from "./TaskHooks";

type SortItem = any[] &
  {
    id: string;
  }[];

const useDndContextForSorting = (
  type: "tasks" | "sections",
  items: SortItem,
  setItems: Dispatch<SetStateAction<SortItem>>
) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { mutate: updateSections } = useUpdateSectionOrder();
  const { mutate: updateTasks } = useUpdateTaskOrder();

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

  async function handleDragEnd(e: DragEndEvent) {
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
      if (type === "sections") {
        updateSections({
          sectionData: {
            one: { id: active.id as string, order: currentSectionOrder },
            two: { id: over.id as string, order: secondSectionOrder },
          },
        });
      }
      if (type === "tasks") {
        // Todo: Need to make backend endpoint to switch orders.
        updateTasks({
          taskData: {
            one: { id: active.id as string, order: currentSectionOrder },
            two: { id: over.id as string, order: secondSectionOrder },
          },
        });
      }
    }
  }

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    activeIndex,
  };
};

export default useDndContextForSorting;
