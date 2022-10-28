import { Task } from "@prisma/client";
import { useState } from "react";
import useTaskLists from "../hooks/useTaskLists";
import TaskList from "./TaskList";
import Button from "./UI/Button";

const TaskLists: React.FC<{
  tasks: Task[];
  isLoading: boolean;
  status: "error" | "success" | "loading";
}> = ({ tasks, isLoading, status }) => {
  console.log("Tasks: ", tasks);
  const [searchValue, setSearchValue] = useState("");
  const { taskLists } = useTaskLists();
  return (
    <div>
      <header className="flex space-x-5">
        <div className={`w-3 h-3 rounded-full`}></div>
        <h1 className="text-3xl">Tasks</h1>
        <Button className="">Add Task List</Button>
      </header>
      <main>
        {taskLists?.map((taskList) => (
          <TaskList
            name={taskList.name}
            key={taskList.id}
            taskList={taskList}
          />
        ))}
      </main>
    </div>
  );
};

export default TaskLists;
