import { Task } from "@prisma/client";
import React, { useState } from "react";

const TaskList: React.FC<{
  name: string;
  tasks: Task[];
}> = ({ name, tasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h2>{name}</h2>
      {!isOpen && <label>{tasks.length} tasks</label>}
      <button>...</button>
      <button>+</button>
      <div>
        {/* Fetch from database using custom hooks to render all of the tasks from this TaskList id */}
      </div>
    </div>
  );
};

export default TaskList;
