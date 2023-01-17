import React, { useState } from "react";
import { Priority, Task } from "@prisma/client";
import { format } from "date-fns";

const OneTask = ({ task }: { task: Task }) => {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const taskCompleteHandler = () => {};

  // Handle the state of all of the Task data
  // PUT request to task for isComplete
  //   DELETE request after making task for isComplete to true
  //   POST request to create a task
  const formatedDueDate = format(new Date(task.dueDate!), "MMM dd");
  const priorityClassName = () => {
    switch (task.priority) {
      case "None":
        return "task__priority--none";
      case "Low":
        return "task__priority--low";
      case "Medium":
        return "task__priority--medium";
      case "High":
        return "task__priority--high";
      default:
        return "";
    }
  };

  return (
    <tr className="task">
      <td className="task__name-container">
        <div className="task__drag">
          <svg className="" viewBox="0 0 24 24">
            <path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z" />
          </svg>
        </div>
        <span className="task__name">{task.name}</span>
      </td>
      <td className="task__date">
        <span>{formatedDueDate}</span>
      </td>
      <td className="task__status">
        <span>{task.status}</span>
      </td>
      <td className="task__priority">
        <span className={priorityClassName()}>{task.priority}</span>
      </td>
    </tr>
  );
};

export default OneTask;
