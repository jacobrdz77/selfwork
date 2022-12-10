import { Task, TaskList } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Tasks from "./Tasks";

const OneTaskList: React.FC<{
  taskList: TaskList;
}> = ({ taskList }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { data: tasks, isLoading, status } = useQuery();
  return (
    <div>
      <div className="flex gap-3 items-baseline py-4">
        {isOpen ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              className="hover:cursor-pointer"
              viewBox="0 0 32 32"
            >
              <title>chevron-down</title>
              <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
            </svg>
          </button>
        ) : (
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              className="hover:cursor-pointer"
              viewBox="0 0 32 32"
            >
              <title>chevron-right</title>
              <path d="M21 16l-13 13v3l16-16-16-16v3l13 13z"></path>
            </svg>
          </button>
        )}

        <h2 className="text-xl">{taskList.name}</h2>
        {!isOpen && (
          <label className="text-[13px] px-1 rounded-full bg-gray-100">
            {tasks?.length}
          </label>
        )}
        <button className="text-[10px] justify-center items-center w-[20px] h-[20px] rounded-full flex bg-gray-100 p-1 tracking-tighter font-extrabold">
          ...
        </button>
        <button className="text-[10px] justify-center items-center w-[20px] h-[20px] rounded-full flex bg-gray-100 p-1 tracking-tighter font-extrabold">
          +
        </button>
      </div>
      {isOpen && <Tasks />}
    </div>
  );
};

export default OneTaskList;
