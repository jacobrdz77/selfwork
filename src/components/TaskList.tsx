import { Task, TaskList } from "@prisma/client";
import React, { useState } from "react";
import useTasks from "../hooks/useTasks";
import Tasks from "./TaskLists";

const TaskList: React.FC<{
  name: string;
  taskList: TaskList;
}> = ({ name, taskList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tasks, isLoading, status } = useTasks();
  return (
    <div>
      <h2 className="text-3xl">{name}</h2>
      <div className="flex gap-3">
        {!isOpen && <label>{tasks?.length} taskList</label>}
        <button className="rounded-full bg-gray-500 p-1">...</button>
        <button className="rounded-full bg-gray-500 p-1">+</button>
      </div>
      {/* Conditionally render if the tasks are here or not. */}
      <Tasks isLoading={isLoading} status={status} tasks={tasks!} />
    </div>
  );
};

export default TaskList;
