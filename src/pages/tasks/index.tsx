import { NextPage } from "next";
import Header from "../../components/header/PageHeader";
import Tasks from "../../components/task/TaskLists";
import useTasks from "../../hooks/useTasks";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { trpc } from "../../utils/trpc";
import TaskLists from "../../components/task/TaskLists";
import { useState } from "react";
import AddTaskListModal from "../../components/task/AddTaskListModal";

const TasksPage: NextPage = () => {
  const [isTaskListModal, setIsTaskListModal] = useState(false);
  const {
    data: taskLists,
    isLoading,
    status,
  } = trpc.taskList.getAll.useQuery();
  return (
    <div className="h-full py-5 px-7">
      <Header title="Tasks" buttonText="Add a Task List" isButton={true} />
      <hr className="mt-4" />
      <AddTaskListModal
        isOpen={isTaskListModal}
        setIsModalOpen={setIsTaskListModal}
      />
      <TaskLists isLoading={isLoading} status={status} taskLists={taskLists!} />
    </div>
  );
};

export default TasksPage;
