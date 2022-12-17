import { useState } from "react";
import { NextPage } from "next";
import PageHeader from "../../components/header/PageHeader";
import Tasks from "../../components/task/Tasks";
import useTasks from "../../hooks/useTasks";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import TaskLists from "../../components/task/TaskLists";
import AddTaskListModal from "../../components/task/AddTaskListModal";

const TasksPage: NextPage = () => {
  const [isTaskListModal, setIsTaskListModal] = useState(false);
  const { tasks, status } = useTasks();
  return (
    <>
      <PageHeader title="Tasks" buttonText="Add Task" isButton={true} />
      <div className="page clients-page">
        <AddTaskListModal
          isOpen={isTaskListModal}
          setIsModalOpen={setIsTaskListModal}
        />
        <Tasks status={status} tasks={tasks!} />
      </div>
    </>
  );
};

export default TasksPage;
