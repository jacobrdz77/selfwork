import React from "react";
import { Task } from "@prisma/client";

const OneTask = ({ task }: { task: Task }) => {
  const taskCompleteHandler = () => {};
  // Handle the state of all of the Task data
  // PUT request to task for isComplete
  //   DELETE request after making task for isComplete to true
  //   POST request to create a task
  return (
    <div className="w-full flex-full hover:bg-gray-500">
      <div>
        <button
          className="justify-center align-middle items-center"
          onClick={() => taskCompleteHandler}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[20px] h-[20px] fill-gray-500 hover:fill-black"
            viewBox="0 0 32 32"
          >
            <title>check</title>
            <path d="M16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16zM16 30c-7.72 0-14-6.28-14-14s6.28-14 14-14c7.72 0 14 6.28 14 14s-6.28 14-14 14z"></path>
            <path d="M14 19.586l-4.293-4.293-1.414 1.414 5.707 5.707 9.707-9.707-1.414-1.414-8.293 8.293z"></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap items-center border-b-[1px]border-b-[#f2f2f2] py-1 pr-[85px]">
        {/* Render all of the task data. UI is close together. Small icons. */}
        {/* Conditionally render the Add/Edit TaskForm */}
        {/* On hover, render the circle icons of priority, logTime, addTask, extra details, edit button */}
      </div>
    </div>
  );
};

export default OneTask;
