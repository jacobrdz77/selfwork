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

const useDndContextForSections = <T>(
  items: Array<T & { id: string }>,
  setItems: Dispatch<SetStateAction<Array<T & { id: string }>>>
) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

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

        // Todo: Send a request to API to update order of the two item that switched places.

        return newitem;
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
