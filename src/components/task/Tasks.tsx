import { Task } from "@prisma/client";
import React, { useState } from "react";
import NoTasks from "./NoTasks";
import OneTask from "./OneTask";

const Tasks: React.FC<{
  tasks: Task[];
  status: "error" | "success" | "loading";
}> = ({ tasks, status }) => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);

  if (status === "success" && tasks.length === 0) {
    return <NoTasks setIsModalOpen={setAddTaskOpen} />;
  }

  return (
    <>
      {status === "loading" && "Loading..."}

      {/* Succesful with data */}
      {status === "success" && tasks.length > 0 && (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task name</th>
              <th>Due date</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <OneTask key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Tasks;
