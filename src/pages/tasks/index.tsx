import { useState } from "react";
import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import Tasks from "@/components/task/Tasks";
import { useTasks } from "@/hooks/TaskHooks";
import { Task } from "@prisma/client";

const TasksPage: NextPage = () => {
  const [isTaskListModal, setIsTaskListModal] = useState(false);
  // const { tasks, status } = useTasks();
  const tasks: Task[] = [];
  const status: "success" | "loading" | "error" = "success";
  return (
    <>
      <PageHeader title="Tasks" buttonText="Add Task" isButton={true} />
      <div className="page clients-page">
        <Tasks status={status} tasks={tasks!} />
      </div>
    </>
  );
};

export default TasksPage;
