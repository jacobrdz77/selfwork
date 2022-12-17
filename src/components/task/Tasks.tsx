import { Task } from "@prisma/client";
import React, { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import NoTasks from "./NoTasks";
import OneTask from "./OneTask";

const Tasks: React.FC<{
  tasks: Task[];
  status: "error" | "success" | "loading";
}> = ({ tasks, status }) => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  return (
    <div className="">
      {status === "loading" && <LoadingSpinner />}

      {/* Succesful with no data */}
      {status === "success" && tasks.length === 0 && (
        <NoTasks setIsModalOpen={setAddTaskOpen} />
      )}

      {/* Succesful with data */}
      {status === "success" &&
        tasks.length > 0 &&
        tasks?.map((task) => <OneTask key={task.id} task={task} />)}
    </div>
  );
};

export default Tasks;
