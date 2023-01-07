import { Task, TaskList } from "@prisma/client";
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import OneTaskList from "./OneTaskList";

const TaskLists: React.FC<{
  taskLists: TaskList[];
  status: "error" | "success" | "loading";
}> = ({ taskLists, status }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <main>
      {/* Loading */}
      {status === "loading" && <LoadingSpinner />}

      {/* Succesful with data */}
      {status === "success" &&
        taskLists.length > 0 &&
        taskLists?.map((taskList) => (
          <OneTaskList key={taskList.id} taskList={taskList} />
        ))}

      {/* Error */}
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
