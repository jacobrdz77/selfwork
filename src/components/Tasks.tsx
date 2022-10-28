import { Task, TaskList } from "@prisma/client";
import React, { useState } from "react";
import useTasks from "../hooks/useTasks";
import OneTask from "./OneTask";

const TaskList: React.FC<{
  name: string;
  taskList: TaskList;
}> = ({ name, taskList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tasks } = useTasks();
  return (
    <div className="flex flex-col">
      {tasks?.map((task) => (
        <OneTask key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
