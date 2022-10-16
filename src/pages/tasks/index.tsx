import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Button from "../../components/UI/Button";
import Header from "../../components/UI/Header";
import LoadingPage from "../../components/Loading/LoadingProjectPage";
import Tasks from "../../components/Tasks";
import NoTasks from "../../components/NoTasks";
import { Task } from "@prisma/client";

const TasksPage: NextPage = () => {
  const userId = useSession().data?.user?.id as string;
  const { data: tasks, isLoading, status } = useQuery(["Tasks"], () => {});
  return (
    <div className="h-full py-5 px-7">
      <Header title="Tasks"></Header>
      <hr className="mt-4" />
      {/* Loading Spinner */}
      {isLoading && (
        <div className="w-full h-full flex justify-center mt-11 items-center">
          <LoadingPage />
        </div>
      )}
      {status === "success" && Tasks.length === 0 ? (
        <NoTasks />
      ) : (
        <Tasks tasks={tasks} />
      )}
    </div>
  );
};

export default TasksPage;
