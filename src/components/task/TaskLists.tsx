import { Task, TaskList } from "@prisma/client";
import { useState } from "react";
import useTaskLists from "../../hooks/useTaskLists";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoProjects from "../project/NoProjects";
import NoTaskLists from "./NoTaskLists";
import OneTaskList from "./OneTaskList";
import Button from "../UI/Button";

const TaskLists: React.FC<{
  taskLists: TaskList[];
  isLoading: boolean;
  status: "error" | "success" | "loading";
}> = ({ taskLists, isLoading, status }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <main>
      {/* Loading */}
      {isLoading && <LoadingSpinner />}

      {/* Succesful with data */}
      {status === "success" &&
        taskLists.length > 0 &&
        taskLists?.map((taskList) => (
          <OneTaskList key={taskList.id} taskList={taskList} />
        ))}
      {/* Succesful with no data */}
      {status === "success" && taskLists.length === 0 && <NoTaskLists />}
      {status === "error" && (
        <div className="w-full h-full flex flex-col justify-center align-middle">
          <h1 className="text-2xl text-red-600">Error</h1>
          <p className="text-gray-800">
            Sorry about that. Try to refresh the page.
          </p>
          <button className="bg-blue-500 px-2 py-1 text-white ">Refresh</button>
        </div>
      )}
    </main>
  );
};

export default TaskLists;
