import { Dispatch, SetStateAction, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { useUpdateSectionOrder } from "./SectionHooks";
import { useUpdateTaskOrder } from "./TaskHooks";
import {
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

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

      if (process.env.NODE_ENV === "development") {
        console.log("current item: ", currentSectionOrder);
        console.log("second item: ", secondSectionOrder);
      }

      if (type === "sections") {
        updateSections({
          sectionData: {
            id: active.id as string,
            currentOrder: currentSectionOrder,
            newOrder: secondSectionOrder,
          },
        });
      }
      if (type === "tasks") {
        updateTasks({
          taskData: {
            id: active.id as string,
            currentOrder: currentSectionOrder,
            newOrder: secondSectionOrder,
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
