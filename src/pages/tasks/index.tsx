import { NextPage } from "next";
import Header from "../../components/UI/Header";
import Tasks from "../../components/Tasks";
import useTasks from "../../hooks/useTasks";

const TasksPage: NextPage = () => {
  const { tasks, isLoading, status } = useTasks();
  //! Create a useTaskList hook to get all taskList based on projectId
  return (
    <div className="h-full py-5 px-7">
      <Header title="Tasks" />
      <hr className="mt-4" />
      {/* Maybe no spinner */}
      {/* Loading Spinner */}
      {/* {isLoading && (
        <div className="w-full h-full flex justify-center mt-11 items-center">
          <LoadingPage />
        </div>
      )} */}
      {status === "success" && <Tasks tasks={tasks!} />}
      {status === "error" && (
        <div className="w-full h-full flex justify-center align-middle">
          <h1 className="text-2xl">Error</h1>
          <p className="text-gray-500">
            Sorry about that. Try to refresh the page.
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
