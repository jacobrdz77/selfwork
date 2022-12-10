import { useState } from "react";
import { NextPage } from "next";
import PageHeader from "../../components/header/PageHeader";
import Tasks from "../../components/task/TaskLists";
import useTasks from "../../hooks/useTasks";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import TaskLists from "../../components/task/TaskLists";
import AddTaskListModal from "../../components/task/AddTaskListModal";

const TasksPage: NextPage = () => {
  const [isTaskListModal, setIsTaskListModal] = useState(false);
  // const {
  //   data: taskLists,
  //   isLoading,
  //   status,
  // } = trpc.taskList.getAll.useQuery();
  return (
    <>
      <PageHeader title="Tasks" buttonText="Add Task" isButton={true} />
      {/* <AddTaskListModal
        isOpen={isTaskListModal}
        setIsModalOpen={setIsTaskListModal}
      /> */}
      {/* <TaskLists isLoading={isLoading} status={status} taskLists={taskLists!} /> */}
    </>
  );
};

export default TasksPage;
