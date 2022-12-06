import { Task, TaskList } from "@prisma/client";
import React, { useState } from "react";
import useTasks from "../hooks/useTasks";
import { trpc } from "../utils/trpc";
import NoTasks from "./NoTasks";
import OneTask from "./OneTask";

const Tasks: React.FC<{}> = ({}) => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const {
    data: tasks,
    isLoading,
    status,
    refetch,
  } = trpc.task.getAll.useQuery();
  return (
    <div className="flex flex-col">
      {isLoading && <p>Loading...</p>}
      {tasks?.map((task) => (
        <OneTask key={task.id} task={task} />
      ))}{" "}
      {status === "success" && tasks.length === 0 && (
        <NoTasks setIsModalOpen={setAddTaskOpen} />
      )}
      {status === "success" &&
        tasks.length > 0 &&
        tasks?.map((task) => <OneTask key={task.id} task={task} />)}
    </div>
  );
};

export default Tasks;
