import { NextPage } from "next";
import Header from "../../components/UI/Header";
import Tasks from "../../components/TaskLists";
import useTasks from "../../hooks/useTasks";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const TasksPage: NextPage = () => {
  const { tasks, isLoading, status } = useTasks();
  //! Create a useTaskList hook to get all taskList based on projectId
  console.log("Tasks: ", tasks);
  return (
    <div className="h-full py-5 px-7">
      <Header title="Tasks" />
      <hr className="mt-4" />
      {/* Loading Spinner */}
      {isLoading && (
        <div className="w-full h-full flex justify-center mt-11 items-center">
          <LoadingSpinner />
        </div>
      )}
      {/* Success */}
    </div>
  );
};

export default TasksPage;
