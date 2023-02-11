import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import SectionListView from "@/components/sections/SectionListView";
import { useCallback, useEffect, useRef, useState } from "react";

const MyTasksPage: NextPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();

  // Make each tables head width adjustable based on state

  return (
    <>
      <PageHeader title="Tasks" />
      <div className="page tasks-page">
        <TaskTableHead />

        {status === "success" && (
          <>
            {/* User assigned section. This cannot be deleted because this is where assigned tasks go to. */}
            <SectionListView
              isUserAssignedSection={true}
              section={userAssignedTasksSection!}
              tasks={userAssignedTasksSection?.tasks ?? []}
            />

            {/* The rest of user sections */}
            {userSections?.map((section) => (
              <SectionListView
                key={section.id}
                section={section}
                tasks={section.tasks}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default MyTasksPage;

const TaskTableHead = () => {
  const [headWidths, setHeadWidths] = useState({
    taskName: 400,
    dueDate: 0,
    status: 0,
    priority: 0,
  });

  // const [resizingInfo, setResizingInfo] = useState<{
  //   startSize: null | number;
  //   offset: null | number;
  //   isResizing: boolean;
  // }>({
  //   startSize: null,
  //   offset: null,
  //   isResizing: false,
  // });

  const { resizerRef, headerRef, isResizing, handleMouseDown } = useResizing(
    {}
  );

  return (
    <div className="tasks-header">
      <div className="tr">
        <div
          ref={headerRef}
          className="th task__name"
          style={{ width: headWidths.taskName }}
        >
          <div className="th-content">Task name</div>
          <div
            ref={resizerRef}
            className={`resizer ${isResizing ? "resizer--isResizing" : ""}`}
            onMouseDown={handleMouseDown}
          />
        </div>
      </div>
    </div>
  );
};

const Resizer = () => {
  const { resizerRef, isResizing, handleMouseDown } = useResizing({});

  return (
    <div
      ref={resizerRef}
      className={`resizer ${isResizing ? "resizer--isResizing" : ""}`}
      onMouseDown={handleMouseDown}
    />
  );
};

const useResizing = ({
  size,
  minSize,
  maxSize,
}: {
  size?: number;
  minSize?: number;
  maxSize?: number;
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const position = useRef({ x: 0 });
  const resizerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  // const [headerWidth, setHeaderWidth] = useState(size);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!resizerRef.current || !position.current) {
        return;
      }

      const pos = position.current;
      const element = resizerRef.current;

      position.current = {
        x: pos.x + event.movementX,
      };

      element.style.transform = `translateX(${pos.x}px)`;
      console.log("Position X: ", pos.x);
    };

    const handleMouseUp = () => {
      if (!headerRef.current || !resizerRef.current) return;

      let headerWidth = parseInt(headerRef.current?.style.width, 10);

      // Set the width of header
      headerRef.current.style.width = `${position.current.x + headerWidth}px`;

      // set the resizer element back to 0 so it doesn't teleport in unexpected places
      resizerRef.current.style.transform = `translateX(0px)`;

      // Reset x position to 0 when mouse is up
      position.current.x = 0;
      console.log("Header WIDTH: ", headerRef.current.style.width);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return { resizerRef, headerRef, isResizing, handleMouseDown };
};
