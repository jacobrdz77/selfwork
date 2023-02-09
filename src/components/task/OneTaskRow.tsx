import React, { useState } from "react";
import { Priority, Task } from "@prisma/client";
import { format } from "date-fns";
import { TaskWithAssignee } from "@/types/types";

const formatDueDate = (taskDueDate: Date) => {
  return format(new Date(taskDueDate), "MMM dd");
};

const taskPriorityClassName = (priority: Priority) => {
  switch (priority) {
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

const OneTaskRow = ({ task }: { task: TaskWithAssignee }) => {
  // Handle the state of all of the Task data
  // onClick open task detail modal
  // PUT request to task for isComplete
  // DELETE request after making task for isComplete to true

  // Listen to column size to resize the column size of data
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div
      className={`task ${isDetailsOpen ? "task--active" : ""}`}
      onClick={() => setIsDetailsOpen(!isDetailsOpen)}
    >
      <div className="task__drag">
        <svg className="" viewBox="0 0 24 24">
          <path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z" />
        </svg>
      </div>
      <div className="task__name-container">
        <div className="task__name">{task.name}</div>
      </div>
      <div className="task__assignee">
        <span>{!task.assignee ? "-" : task.assignee.name}</span>
      </div>
      <div className="task__date">
        <span>{task.dueDate ? formatDueDate(task.dueDate) : "-"}</span>
      </div>
      <div className="task__status">
        <span>{task.status}</span>
      </div>
      <div className="task__priority">
        {/* <div> ICON HERE</div> */}

        <span className={taskPriorityClassName(task.priority)}>
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default OneTaskRow;
